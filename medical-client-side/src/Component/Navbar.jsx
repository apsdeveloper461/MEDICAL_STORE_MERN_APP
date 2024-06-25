import React from 'react'
import { HiMiniUserCircle } from "react-icons/hi2";

function Navbar({greeting}) {
  return (
    <>
    <div className='flex flex-row items-center justify-between  px-4  '>
     <div className='flex flex-col items-end ml-4  cursor-pointer relative'><span className=' text-lg font-bold  text-red-700'>Medical</span><span className='relative -top-2 text-sm text-pretty font-mono'>Store</span></div>
     <div className='font-bold text-gray-500 text-xl'> {greeting}</div>
     <div></div>
     {/* <div className="profileInfo flex items-center "><HiMiniUserCircle className='text-4xl mr-3'/><span className='text-lg'>Name</span></div> */}

    </div>
                           
    </>
  )
}

export default Navbar