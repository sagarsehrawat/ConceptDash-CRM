import React, { useEffect } from 'react'
import SERVICES from '../../services/Services';
import { useNavigate } from 'react-router-dom';

const DownPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await SERVICES.serverStatus();
    
            if (res === "Hello World!") {
              navigate('/')
            }
          } catch (error) {
            console.log("error", error);
          }
        };
        fetchData();
      }, []);
  return (
    <div className='down-page-background d-flex jsutify-content-center align-items-center'>
        <div className='down-page-container'>
            Down Page
        </div>
    </div>
  )
}

export default DownPage