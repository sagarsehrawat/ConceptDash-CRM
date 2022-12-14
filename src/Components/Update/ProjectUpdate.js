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
import { HOST, GET_PROJECTS } from "../Constants/Constants";
import LoadingSpinner from "../Loader/Loader";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ProjectForm from '../Form/ProjectForm'
import UpdateProjectForm from '../Form/UpdateProjectForm'

function ProjectUpdate() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const navigate = useNavigate();
  const [projects, setprojects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setdataSource] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const call = async () => {
      await axios
        .get(HOST + GET_PROJECTS, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setprojects(res.data.res);
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
  const [rowData, setrowData] = useState([]);
  const handleUpdate = (e)=>{
    setrowData(e);
    handleShowUpdate();
  }
  return (
    <>
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
            Projects
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
            Add a New Project
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Edit</TableCell>
                  <TableCell align="right">Project ID</TableCell>
                  <TableCell align="right">Project Name</TableCell>
                  <TableCell align="right">Date Created</TableCell>
                  <TableCell align="right">Project Due Date</TableCell>
                  <TableCell align="right">Project Category</TableCell>
                  <TableCell align="right">Project Stage</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Follow Up Notes</TableCell>
                  <TableCell align="right">Next Follow up</TableCell>
                  <TableCell align="right">Tentative Closing</TableCell>
                  <TableCell align="right">Project Manager</TableCell>
                  <TableCell align="right">Project Value</TableCell>
                  <TableCell align="right">City</TableCell>
                  <TableCell align="right">Province</TableCell>
                  <TableCell align="right">Department</TableCell>
                  <TableCell align="right">Team Members</TableCell>
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
                          <TableCell component="th" scope="row">
                            {row.Project_Id}
                          </TableCell>
                          <TableCell align="right">
                            {row.Project_Name}
                          </TableCell>
                          <TableCell align="right">
                            {row.Date_Created
                              ? row.Date_Created.substring(0, 10)
                              : ""}
                          </TableCell>
                          <TableCell align="right">
                            {row.Project_Due_Date
                              ? row.Project_Due_Date.substring(0, 10)
                              : ""}
                          </TableCell>
                          <TableCell align="right">
                            {row.Project_Category}
                          </TableCell>
                          <TableCell align="right">
                            {row.Project_Stage}
                          </TableCell>
                          <TableCell align="right">{row.Status}</TableCell>
                          <TableCell align="right">
                            {row.Follow_Up_Notes}
                          </TableCell>
                          <TableCell align="right">
                            {row.Next_Follow_Up}
                          </TableCell>
                          <TableCell align="right">
                            {row.Tentative_Closing
                              ? row.Tentative_Closing.substring(0, 10)
                              : ""}
                          </TableCell>
                          <TableCell align="right">
                            {row.Project_Manager}
                          </TableCell>
                          <TableCell align="right">
                            {row.Project_Value}
                          </TableCell>
                          <TableCell align="right">{row.City}</TableCell>
                          <TableCell align="right">{row.Province}</TableCell>
                          <TableCell align="right">{row.Department}</TableCell>
                          <TableCell align="right">
                            {row.Team_Members}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : projects.map((row) => {
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
                          <TableCell component="th" scope="row">
                            {row.Project_Id}
                          </TableCell>
                          <TableCell align="right">
                            {row.Project_Name}
                          </TableCell>
                          <TableCell align="right">
                            {row.Date_Created
                              ? row.Date_Created.substring(0, 10)
                              : ""}
                          </TableCell>
                          <TableCell align="right">
                            {row.Project_Due_Date
                              ? row.Project_Due_Date.substring(0, 10)
                              : ""}
                          </TableCell>
                          <TableCell align="right">
                            {row.Project_Category}
                          </TableCell>
                          <TableCell align="right">
                            {row.Project_Stage}
                          </TableCell>
                          <TableCell align="right">{row.Status}</TableCell>
                          <TableCell align="right">
                            {row.Follow_Up_Notes}
                          </TableCell>
                          <TableCell align="right">
                            {row.Next_Follow_Up}
                          </TableCell>
                          <TableCell align="right">
                            {row.Tentative_Closing
                              ? row.Tentative_Closing.substring(0, 10)
                              : ""}
                          </TableCell>
                          <TableCell align="right">
                            {row.Project_Manager}
                          </TableCell>
                          <TableCell align="right">
                            {row.Project_Value}
                          </TableCell>
                          <TableCell align="right">{row.City}</TableCell>
                          <TableCell align="right">{row.Province}</TableCell>
                          <TableCell align="right">{row.Department}</TableCell>
                          <TableCell align="right">
                            {row.Team_Members}
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="xl"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>{<ProjectForm />}</Modal.Body>
      </Modal>

      <Modal
        show={showUpdate}
        onHide={handleCloseUpdate}
        backdrop="static"
        size="xl"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update RFP</Modal.Title>
        </Modal.Header>
        <Modal.Body>{<UpdateProjectForm row={rowData} />}</Modal.Body>
      </Modal>
    </>
  );
}

export default ProjectUpdate;
