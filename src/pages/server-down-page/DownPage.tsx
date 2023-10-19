import React, { useEffect } from 'react'
import SERVICES from '../../services/Services.ts';
import { useNavigate } from 'react-router-dom';
import './DownPage.css'

type Props = {}

const DownPage = (props: Props) => {
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
    <div className='down-page-background d-flex justify-content-center align-items-center'>
      <div className='top-left-bg' />
      <div className='bottom-right-bg' />
      <div className='center-bg' />
    </div>
  )
}

export default DownPage