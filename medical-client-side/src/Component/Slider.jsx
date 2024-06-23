import React, { useState } from 'react'
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlineStore } from "react-icons/md";
import { MdManageHistory } from "react-icons/md";

import { Link, useParams } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';


function Slider() {
    // const parm=useParams()
    // console.log("params",parm);
    const [isFullSlider, setIsFullSlider] = useState(false)
    const [border,setborder]=useState('rounded-full')
  
    const toggleFullSlider = () => {
        setborder(!isFullSlider? 'rounded-2xl':'rounded-full')
        setIsFullSlider((prev) => {
            return (
                !prev
            )
        })
        console.log(isFullSlider,border);
    }
    return (
        <>
            <div className={`slider shadow-sm shadow-gray-600 h-5/6 flex flex-col absolute py-7 px-2 my-16 mx-2 ${border} bg-opacity-5`} style={{
                background: '#1D2932',
            }} >
                {
                    isFullSlider ?
                        <>

                            <div className='flex flex-col items-end mr-3  p-2 border-b-2 mb-7 cursor-pointer relative'><HiMiniBars3BottomLeft className='absolute -top-3 left-0 text-xl hover:text-gray-500' onClick={toggleFullSlider} /><span className=' text-xl font-extrabold  text-red-700'>Medical</span><span className=' text-pretty font-mono'>Store</span></div>
                            <Link to='/'  className=' font-serif text-xl   cursor-pointer hover:text-gray-500 p-2 flex  items-center'><MdDashboardCustomize className=' text-amber-500 mr-2' /><span>Dashboard</span></Link>
                            <Link to='/store'  className=' font-serif text-xl   cursor-pointer hover:text-gray-500 p-2 flex  items-center'><MdOutlineStore className='text-amber-500 mr-2' /><span>Products</span></Link>
                            <Link to='/log'  className=' font-serif text-xl   cursor-pointer hover:text-gray-500 p-2 flex  items-center'><MdManageHistory className='text-amber-500 mr-2' /><span>Log</span></Link>
                        </>
                        :
                        <>
                        <HiMiniBars3CenterLeft className=' cursor-pointer text-4xl hover:bg-gray-600 mb-5 p-1 rounded-full ' onClick={toggleFullSlider} />
                            <hr className='mb-12 bg-slate-500 border-b-2'/>
                            <Link to='/'  id='DASHBOARD' className='text-amber-500 rounded-full  hover:bg-gray-600 hover:text-white mb-5 p-1'><MdDashboardCustomize className=' cursor-pointer text-4xl p-1 disabled: ' id='DASHBOARD' /></Link>
                            <Link to='store'  id='STORE'  className='text-amber-500  hover:bg-gray-600 hover:text-white mb-5 rounded-full p-1'><MdOutlineStore id='STORE' className=' cursor-pointer text-4xl p-1 ' /></Link>
                            <Link to='log'  id='LOG'  className='text-amber-500  hover:bg-gray-600 hover:text-white mb-5 rounded-full p-1'><MdManageHistory id='LOG' className=' cursor-pointer  text-4xl p-1 ' /></Link>
                            
                        </>
                }
            </div>
        </>
    )
}

export default Slider