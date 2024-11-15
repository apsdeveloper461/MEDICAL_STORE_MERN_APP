import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import Search from '../Component/Search'
import HistroyDisplay from '../Component/HistroyDisplay'
import { MdCopyright } from "react-icons/md";
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom'

function HistoryLog() {
  const navigate=useNavigate();
  const location=useLocation()
  const  LOGDATA  = location.state || null
  const [searchData,setSearchData]=useState('')
  // console.log("state",location.state);
  const [logDataFromBackend,setlogDataFromBackend]=useState([])
  const changeSeacrhData=(e)=>{
    setSearchData(e.target.value)
  }
  useEffect(() => {
    // lo
    if(LOGDATA === null){
       axios.get(`${import.meta.env.VITE_BACKEND_URL}/log`).then(res=>{
        // console.log(res?.data?.log);
        setlogDataFromBackend(res?.data?.log)
      }).catch(err=>console.log(err))
      // console.log("Null LOGDATA");
      // console.log(logDataFromBackend);
    }else{
      // console.log("LODATA IS NOT NULL");
      setlogDataFromBackend(LOGDATA)
    }
    
  }, []);
  return (
    <>
      <Navbar greeting={'Welcome to Products Log Page'}/>
          <HistroyDisplay logData={logDataFromBackend || []}/>
      <div className="row relative flex flex-row items-center justify-center rounded-md ml-2 h-10    mx-3 px-3" style={{ background: '#2B3C46' }}>
        <MdCopyright className='mr-1'/>2022 Copywrite By <a className='mx-1 text-teal-600 font-bold cursor-pointer' href='' target='_blank'> Aps Developer</a><strong>|</strong> <a className='mx-1 text-teal-600 font-bold cursor-pointer' href="https://www.linkedin.com/in/mehboob-alam-3999822b3/" target='_blank'>Mehboob Alam</a>
          </div>
    </>
  )
}

export default HistoryLog
