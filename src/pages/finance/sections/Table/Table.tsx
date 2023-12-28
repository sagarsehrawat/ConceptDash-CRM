import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { useDispatch } from "react-redux";
import { showErrorModal } from "../../../../redux/slices/alertSlice";
import SERVICES from "../../../../services/Services";
import LoadingSpinner from "../../../../Main/Loader/Loader";

type Props = {
  setpage: Function;
  invoiceType: string;
};

const Table = ({ setpage, invoiceType }: Props) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const res = await SERVICES.getInvoices(invoiceType);
        setInvoices(res.res);
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
        <table className="w-100" style={{ borderCollapse: "separate" }}>
          <TableHeader />
          <tbody>
            {
              invoices.map((invoice) => (
                <TableRow invoice={invoice} setpage={setpage} />
              ))
            }
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
