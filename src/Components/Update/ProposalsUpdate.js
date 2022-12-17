import { React, useEffect, useState } from "react";
import {
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import { HOST, GET_PROPOSALS, UPDATE_PROPOSAL } from "../Constants/Constants";
import LoadingSpinner from "../Loader/Loader";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import ProposalForm from "../Form/ProposalForm";
import UpdateProposal from "../Form/UpdateProposal";
import Modal from "react-bootstrap/Modal";

function ProposalsUpdate() {
  const navigate = useNavigate();
  const [rowData, setrowData] = useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [proposals, setproposals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setdataSource] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const call = async () => {
      await axios
        .get(HOST + GET_PROPOSALS, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setproposals(res.data.res);
          setdataSource(res.data.res);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    call();
  }, []);
  const [value, setValue] = useState("");
  const [tableFilter, settableFilter] = useState([]);
  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filterTable = dataSource.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      settableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
      setdataSource([...dataSource]);
    }
  };
  const handleUpdate = (e) =>{
    setrowData(e);
    handleShowUpdate();
  }
  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <h1
            style={{
              margin: "auto",
              textAlign: "center",
              textDecoration: "underline",
              marginTop: "5vh",
              marginBottom: "4vh",
            }}
          >
            Proposals
          </h1>
          <input
            style={{ marginLeft: "41vw", marginBottom: "4vh", width: "20vw" }}
            type="text"
            value={value}
            onChange={filterData}
            placeholder="Search"
          />
          <br />
          <Button
            onClick={handleShow}
            style={{ marginLeft: "45vw", marginBottom: "4vh" }}
          >
            Add Proposal
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Proposal ID</TableCell>
                  <TableCell align="right">Department</TableCell>
                  <TableCell align="right">Project Name</TableCell>
                  <TableCell align="right">Question Deadline</TableCell>
                  <TableCell align="right">Closing Deadline</TableCell>
                  <TableCell align="right">Result Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Project Manager</TableCell>
                  <TableCell align="right">Team</TableCell>
                  <TableCell align="right">Design Price</TableCell>
                  <TableCell align="right">Provisional Items</TableCell>
                  <TableCell align="right">Contract Admin Price</TableCell>
                  <TableCell align="right">Sub Consultant Price</TableCell>
                  <TableCell align="right">Total Bid</TableCell>
                  <TableCell align="right">Plan Takers</TableCell>
                  <TableCell align="right">Bidders</TableCell>
                  <TableCell align="right">Bidder Price</TableCell>
                  <TableCell align="right">Bid Status</TableCell>
                  <TableCell align="right">Winning Price</TableCell>
                  <TableCell align="right">Winning Bidder</TableCell>
                  <TableCell align="right">City</TableCell>
                  <TableCell align="right">Province</TableCell>
                  <TableCell align="right">Country</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {value.length > 0
                  ? tableFilter.map((row) => {
                      return (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="right">
                            <Button
                              onClick={()=>{handleUpdate(row)}}
                              style={{ backgroundColor: "rgb(99, 138, 235)" }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                          <TableCell align="right" component="th" scope="row">
                            {row.Proposal_ID}
                          </TableCell>
                          <TableCell align="right">{row.Department}</TableCell>
                          <TableCell align="right">
                            {row.Project_Name}
                          </TableCell>
                          <TableCell align="right">
                            {row.Question_Deadline
                              ? row.Question_Deadline.substring(0, 10)
                              : ""}
                          </TableCell>
                          <TableCell align="right">
                            {row.Closing_Deadline
                              ? row.Closing_Deadline.substring(0, 10)
                              : ""}
                          </TableCell>
                          <TableCell align="right">
                            {row.Result_Date
                              ? row.Result_Date.substring(0, 10)
                              : ""}
                          </TableCell>
                          <TableCell align="right">{row.Status}</TableCell>
                          <TableCell align="right">
                            {row.Manager_Name}
                          </TableCell>
                          <TableCell align="right">{row.Team}</TableCell>
                          <TableCell align="right">
                            {row.Design_Price}
                          </TableCell>
                          <TableCell align="right">
                            {row.Provisional_Items}
                          </TableCell>
                          <TableCell align="right">
                            {row.Contract_Admin_Price}
                          </TableCell>
                          <TableCell align="right">
                            {row.Sub_Consultant_Price}
                          </TableCell>
                          <TableCell align="right">{row.Total_Bid}</TableCell>
                          <TableCell align="right">{row.Plan_Takers}</TableCell>
                          <TableCell align="right">{row.Bidders}</TableCell>
                          <TableCell align="right">
                            {row.Bidder_Price}
                          </TableCell>
                          <TableCell align="right">{row.Bid_Status}</TableCell>
                          <TableCell align="right">
                            {row.Winning_Price}
                          </TableCell>
                          <TableCell align="right">{row.Name}</TableCell>
                          <TableCell align="right">{row.City}</TableCell>
                          <TableCell align="right">{row.Province}</TableCell>
                          <TableCell align="right">{row.Country}</TableCell>
                        </TableRow>
                      );
                    })
                  : proposals.map((row) => {
                      return (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="right">
                            <Button
                              onClick={()=>{handleUpdate(row)}}
                              style={{ backgroundColor: "rgb(99, 138, 235)" }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                          <TableCell align="right" component="th" scope="row">
                            {row.Proposal_ID}
                          </TableCell>
                          <TableCell align="right">{row.Department}</TableCell>
                          <TableCell align="right">
                            {row.Project_Name}
                          </TableCell>
                          <TableCell align="right">
                            {row.Question_Deadline
                              ? row.Question_Deadline.substring(0, 10)
                              : ""}
                          </TableCell>
                          <TableCell align="right">
                            {row.Closing_Deadline
                              ? row.Closing_Deadline.substring(0, 10)
                              : ""}
                          </TableCell>
                          <TableCell align="right">
                            {row.Result_Date
                              ? row.Result_Date.substring(0, 10)
                              : ""}
                          </TableCell>
                          <TableCell align="right">{row.Status}</TableCell>
                          <TableCell align="right">
                            {row.Manager_Name}
                          </TableCell>
                          <TableCell align="right">{row.Team}</TableCell>
                          <TableCell align="right">
                            {row.Design_Price}
                          </TableCell>
                          <TableCell align="right">
                            {row.Provisional_Items}
                          </TableCell>
                          <TableCell align="right">
                            {row.Contract_Admin_Price}
                          </TableCell>
                          <TableCell align="right">
                            {row.Sub_Consultant_Price}
                          </TableCell>
                          <TableCell align="right">{row.Total_Bid}</TableCell>
                          <TableCell align="right">{row.Plan_Takers}</TableCell>
                          <TableCell align="right">{row.Bidders}</TableCell>
                          <TableCell align="right">
                            {row.Bidder_Price}
                          </TableCell>
                          <TableCell align="right">{row.Bid_Status}</TableCell>
                          <TableCell align="right">
                            {row.Winning_Price}
                          </TableCell>
                          <TableCell align="right">{row.Name}</TableCell>
                          <TableCell align="right">{row.City}</TableCell>
                          <TableCell align="right">{row.Province}</TableCell>
                          <TableCell align="right">{row.Country}</TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {/* Add Form Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="xl"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Proposal</Modal.Title>
        </Modal.Header>
        <Modal.Body>{<ProposalForm />}</Modal.Body>
      </Modal>

      <Modal
        show={showUpdate}
        onHide={handleCloseUpdate}
        backdrop="static"
        size="xl"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Proposal</Modal.Title>
        </Modal.Header>
        <Modal.Body>{<UpdateProposal row={rowData}/>}</Modal.Body>
      </Modal>
    </div>
  );
}

export default ProposalsUpdate;
