import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthenticationContext from '../../Context/AuthContext';
import './Login.css'
import axios from 'axios';
import { GET_EMPLOYEE_PRIVILEGES, HOST, LOGIN } from '../Constants/Constants';
import AuthContext from "../../Context/AuthContext"

const Login = () => {
  const navigate = useNavigate()
  const { privileges, setPrivileges } = useContext(AuthContext)
  useEffect(() => {
    const department = localStorage.getItem('department')
    if (department) {
      switch (department) {
        case 'Admin':
          navigate('/admin')
          break;
        case 'Engineer':
          navigate('/engineers')
          break;
        case 'Manager':
          navigate('/manager')
          break;
        default:
          break;
      }
    }


  }, [])


  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')

  const onLogin = async (e) => {
    e.preventDefault()
   handleSubmit(e);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(HOST + LOGIN, { 'username': username, 'password': password }).then((res) => {
      if (res.data.error === "Email or Password is Incorrect") {
        alert('Incorrect Username or Password');
      } else {
        if (!res.data.success)
          alert('Something Went Wrong...')
      }
      localStorage.setItem('auth', res.data.auth)
      localStorage.setItem('department', res.data.user.department)
      localStorage.setItem('emailWork', res.data.user.emailWork)
      localStorage.setItem('employeeId', res.data.user.employeeId)
      localStorage.setItem('employeeName', res.data.user.employeeName)

      axios
        .get(HOST + GET_EMPLOYEE_PRIVILEGES, {
          headers: { auth: "Rose " + localStorage.getItem("auth"), employeeid: localStorage.getItem('employeeId') },
        })
        .then((res) => {
          let arr = []
          res.data.res.map(e => {
            arr.push(e.Privilege)
          })
          setPrivileges(arr);

          switch (localStorage.getItem("department")) {
            case 'Admin':
              navigate('/admin')
              break;
            case 'Engineer':
              navigate('/engineers')
              break;
            case 'Manager':
              navigate('/manager')
              break;
            default:
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });

      
    }
    ).catch((err) => {
      console.log(err)
    })
  }
  return (
    <>
      <div className='home container d-flex justify-content-center align-items-center'>
        <div className='main-body '>
          <div className='heading d-flex flex-row mb-5'>
            <h2 align="center" style={{ color: "white" }}>Login using Your Credentials</h2>
          </div>
          <form>
            <div className=" mb-4">
              <input type="text" className="form-control shadow-none input-home" id="inputEmail3" placeholder='Username' onChange={(e) => { setusername(e.target.value) }} />
            </div>
            <div className=" mb-3">
              <input type="password" className="form-control shadow-none input-home" id="password" placeholder='Password' style={{ marginBottom: "4rem" }} onChange={(e) => { setpassword(e.target.value) }} />
            </div>
            <div className='d-flex flex-row justify-content-center my-1'>
              <button type="submit" className="btn btn-home" onClick={onLogin}>Login</button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default Login