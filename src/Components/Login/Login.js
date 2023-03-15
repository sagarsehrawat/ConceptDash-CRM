import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import axios from 'axios';
import { GET_EMPLOYEE_PRIVILEGES, HOST, LOGIN } from '../Constants/Constants';
import AuthContext from "../../Context/AuthContext"

const styles = {
  leftPart: {
    position: "absolute",
    width: "720px",
    height: "900px",
    left: "0px",
    top: "0px",
    background: "#F3F5F9",
    boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)"
  },
  rightPart: {
    position: "absolute",
    width: "720px",
    height: "900px",
    left: "720px",
    top: "0px",
    background: "#F8FAFB"
  },
  leftUpper: {
    position: "absolute",
    width: "624px",
    height: "624px",
    left: "-363px",
    top: "-310px",
    background: "#E0D8EC",
    transform: "rotate(-45deg)"
  },
  welcomeHeading: {
    position: "absolute",
    width: "166px",
    height: "36px",
    left: "200px",
    top: "310px",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "36px",
    color: "#0A0A0A"
  },
  welcomeText: {
    position: "absolute",
    width: "320px",
    height: "40px",
    left: "200px",
    top: "350px",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#A3A3A3"
  }
}

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
          console.log(res.data.res)
          let arr = []
          res.data.res.map(e => {
            arr.push(e.Privilege)
          })
          localStorage.setItem('privileges', JSON.stringify(arr))
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
      {/* <div className='home container d-flex justify-content-center align-items-center'>
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
      </div> */}
      <div style={styles.leftPart}>
        <div style={styles.leftUpper}></div>
      </div>
      <div style={styles.rightPart}>
        <div style={styles.welcomeHeading}>Welcome Back!</div>
        <div style={styles.welcomeText}>Welcome back to taskforce! Enter your credentials to login</div>
      </div>
    </>
  )
}

export default Login