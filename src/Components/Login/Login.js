import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthenticationContext from '../../Context/AuthContext';
import './Login.css'
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(AuthenticationContext)
  const {user, setUser} = context;
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/login',{'username':username,'password':password}).then((res) => {
            localStorage.setItem('auth',res.data.auth)
            localStorage.setItem('department',res.data.user.department)
            localStorage.setItem('emailWork',res.data.user.emailWork)
            localStorage.setItem('employeeId',res.data.user.employeeId)
            switch (res.data.user.department) {
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
          }).catch((err) => {
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
              <input type="text" className="form-control shadow-none input-home" id="inputEmail3" placeholder='Username' onChange={(e)=>{setusername(e.target.value)}} />
            </div>
            <div className=" mb-3">
              <input type="password" className="form-control shadow-none input-home" id="password" placeholder='Password' style={{ marginBottom : "4rem"}} onChange={(e)=>{setpassword(e.target.value)}}/>
            </div>
            <div className='d-flex flex-row justify-content-center my-1'>
              <button type="submit" className="btn btn-home" onClick={handleSubmit}>Login</button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default Login