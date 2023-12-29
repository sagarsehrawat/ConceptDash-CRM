import React, { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableRow2 from "./TableRow2";
import SERVICES from "../../../../services/Services";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../../../../Main/Loader/Loader";
import { showErrorModal } from "../../../../redux/slices/alertSlice";

type Props = {
  setInvoiceId: Function;
};

const ProjectTable = ({ setInvoiceId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [invoiceProject, setInvoiceProject] = useState<InvoiceProject[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const res = await SERVICES.getInvoiceProjects();
        console.log(res.res);
        setInvoiceProject(res.res);
      } catch (error) {
        console.log(error);
        dispatch(showErrorModal("Something Went Wrong!"));
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <div className="table-wrapper">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <table className={`w-100`} style={{ borderCollapse: "separate" }}>
          <TableHeader />
          <tbody>
            {invoiceProject.map((invoice, index) => {
              if (index % 2 === 0) {
                return <TableRow invoiceProject={invoice} setInvoiceId={setInvoiceId} />;
              } else {
                return <TableRow2 invoiceProject={invoice} setInvoiceId={setInvoiceId} />;
              }
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProjectTable;
