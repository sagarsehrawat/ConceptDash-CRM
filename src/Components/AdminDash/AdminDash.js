import {React,useState,useEffect} from 'react'
import projectIcon from '../../Images/images.png'
import requestIcon from '../../Images/reques.jpg'
import budgetIcon from '../../Images/budget.png'
import todoIcon from '../../Images/todo-list-icon-26.jpg'
import calendarIcon from '../../Images/calendar.png'
import employeesIcon from '../../Images/black-solid-icon-employee-applicant-man-logo-symbol-146530494.jpg'
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import TestDemo from '../../Components/Calendar'
import axios from 'axios'
import { GET_ALL_EMPLOYEES, HOST } from '../Constants/Constants';
import Form from 'react-bootstrap/Form';
import LoadingSpinner from '../Loader/Loader';
function AdminDash() {
  const [show, setShow] = useState(false);
  const [tasks, settasks] = useState([])
  const [task1, settask1] = useState('')
  
  const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      setIsLoading(true);
          const call = async () => {
            await axios.get('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/tasks', {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
                settasks(res.data.res)
                setIsLoading(false);
                settask1(res.data.res[0].Title)
                
            }).catch((err) => {
              console.log(err)
            })
          }
          call()
        },[])
        const [employees, setemployees] = useState([]);
        
    useEffect(() => {
        const call = async () => {
          await axios.get(HOST + GET_ALL_EMPLOYEES, {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {

            setemployees(res.data.res)
          }).catch((err) => {
            console.log(err)
          })
        }
        call()
      },[])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  return (
    <div /* style={{'backgroundColor':'rgb(195, 193, 193)'}} */>
        <div className='row d-flex justify-content-around body-1' style={{'margin':'2vh','marginBottom':'4vh'}}>
            <h1 style={{'textAlign':'center', 'marginTop':'2vh', 'marginBottom':'2vh','fontSize':'3rem','textDecoration':'underline'}}>Admin Dashboard</h1>
            <div className='card col-3 d-flex align-items-center' style={{ "width": "12rem", "padding": "2rem",'backgroundColor':'white' }}>
            <img src={todoIcon} className='card-img' alt="New Purchases" />
      <h5 style={{'marginBottom':'2vh'}} className='card-title'>To Do</h5>
            <ListGroup as="ol" >
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{task1}</div>
        </div>
        {/* <Badge style={{'marginLeft':'2vw'}} bg="primary" pill>
          14
        </Badge> */}
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold"></div>
        </div>
        {/* <Badge bg="primary" pill>
          14
        </Badge> */}
      </ListGroup.Item>
    </ListGroup>
            {/* <p>12</p> */}

          </div>
          <div className='card col-3 d-flex align-items-center' style={{ "width": "12rem", "padding": "0.5rem",'backgroundColor':'white' }}>
          <Form.Select >
        {employees.length!==0?employees.map((options) => (
          <option value={options.Employee_ID} key={options.Employee_ID}>
            {options.First_Name + ' '+ options.Last_Name}
          </option>
        )):
        <option value=''>None</option>
        }
        </Form.Select>
            <img src={employeesIcon} className='card-img' alt="New Purchases" />
      <h5 style={{'marginBottom':'2vh'}} className='card-title'>Employees</h5>
            <ListGroup as="ol" >
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Utilization Rate  </div>
        </div>
        <Badge style={{'marginLeft':'2vw'}} bg="primary" pill>
          -
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Skills</div>
        </div>
        <Badge bg="primary" pill>
          -
        </Badge>
      </ListGroup.Item>
    </ListGroup>
            {/* <p>12</p> */}

          </div>
          <div className='card col-3 d-flex align-items-center' style={{ "width": "12rem", "padding": "2rem",'backgroundColor':'white' }}>
          {/* <select name="" id="">
              <option value="">City</option>
              <option value="">Year</option>
              <option value="">Department</option>
            </select> */}
            <img style={{'marginTop':'1vh'}} src={budgetIcon} className='card-img' alt="New Purchases" />
      <h5 style={{'marginBottom':'2vh'}} className='card-title'>Budgets</h5>
            <ListGroup as="ol" >
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">----</div>
        </div>
        {/* <Badge style={{'marginLeft':'2vw'}} bg="primary" pill>
          14
        </Badge> */}
      </ListGroup.Item>
      {/* <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Task 2</div>
        </div>
      </ListGroup.Item> */}
    </ListGroup>
            {/* <p>12</p> */}

          </div>
          <div className='card col-3 d-flex align-items-center' style={{ "width": "12rem", "padding": "2rem",'backgroundColor':'white' }}>
            <img src={projectIcon} className='card-img' alt="Submitted Purchases" />
            {/* <h5 className='card-title' style={{'marginBottom':'2vh'}} align="center">Projects</h5> */}
            <select style={{'marginBottom':'2vh', 'marginTop':'1vh'}} className='card-title' name="" id="">
              <option  value="">Project</option>
              <option  value="">Proposals</option>
              <option  value="">Bids</option>
            </select>
            <ListGroup as="ol" >
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Total</div>
        </div>
        <Badge style={{'marginLeft':'4vw'}} bg="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">In Progress</div>
        </div>
        <Badge bg="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Finished</div>
        </div>
        <Badge bg="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">New</div>
        </div>
        <Badge bg="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
    </ListGroup>
            {/* <p>12</p> */}

          </div>
          {/* <div className='card col-3 d-flex align-items-center' style={{ "width": "16rem", "padding": "2rem",'backgroundColor':'white' }}>
            <img src={approvedIcon} className='card-img' alt="Approved Purchases" />
            <h5 className='card-title'>Projects Completed</h5>
            <p>12</p>

          </div> */}
          <div className='card col-3 d-flex align-items-center' style={{ "width": "12rem", "padding": "2rem",'backgroundColor':'white' }}>
            <img src={requestIcon} className='card-img' alt="Closed Purchases" />
            <h5 style={{'marginBottom':'2vh'}} className='card-title'>Requests</h5>
            <ListGroup as="ol" >
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Pending</div>
        </div>
        <Badge style={{'marginLeft':'2vw'}} bg="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Accepted</div>
        </div>
        <Badge bg="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Declined</div>
        </div>
        <Badge bg="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Resolved</div>
        </div>
        <Badge bg="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
    </ListGroup>
            {/* <p>12</p> */}

          </div>
          <div className='card col-3 d-flex align-items-center' style={{ "width": "12rem", "padding": "2rem",'backgroundColor':'white' }}>
            <img src={calendarIcon} className='card-img' alt="New Purchases" />
      <h5 style={{'marginBottom':'2vh','marginTop':'3vh'}} className='card-title'>Calendar</h5>
            <ListGroup as="ol" >
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold"><Button onClick={handleShow} variant='primary'>Click Here</Button></div>
        </div>
      </ListGroup.Item>
    </ListGroup>
            {/* <p>12</p> */}

          </div>
        </div>
        <h1 style={{'textAlign':'center','textDecoration':'underline'}}>Requests</h1>
        <TableContainer component={Paper} className='main' style={{'backgroundColor':'rgb(195, 193, 193)'}}>
        <Table sx={{ minWidth: 150 }} aria-label="simple table">
          <TableHead>
            <TableRow className='rowWidth'>
              <TableCell align="center">Request ID</TableCell>
              <TableCell align="center">Employee ID</TableCell>
              <TableCell align="center">Request</TableCell>
              <TableCell align="center">Request Dept.</TableCell>
              <TableCell align="center">File Type</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {customers.map((row) => ( */}
              <TableRow
                // key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">1233456</TableCell>
                <TableCell align="center">1234567</TableCell>
                <TableCell align="center">Country Sales</TableCell>
                <TableCell align="center">Sales</TableCell>
                <TableCell align="center">PDF</TableCell>
                <TableCell align="center">12-3-20</TableCell>
              </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal 
            // style={{'margin':'2rem'}}
            show={show} 
            onHide={handleClose} 
            size='lg'
            dialogClassName="modal-150w" 
            aria-labelledby="example-custom-modal-styling-title"
                >
                <Modal.Header closeButton>
                <Modal.Title>Calendar</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{'marginLeft':'0.5rem'}}>{<TestDemo/>}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
    </div>
  )
}

export default AdminDash