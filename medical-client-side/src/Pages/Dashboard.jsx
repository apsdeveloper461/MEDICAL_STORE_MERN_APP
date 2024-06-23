import React from 'react'
import Navbar from '../Component/Navbar'
import { MdCopyright } from 'react-icons/md'

function Dashboard() {
  return (
    <>
      <Navbar greeting={'Welcome to Dashboard'}/>
    <div className=''>
    </div>
    
    <div className="row relative flex flex-row items-center justify-center rounded-md ml-2 h-10    mx-3 px-3" style={{ background: '#2B3C46' }}>
        <MdCopyright className='mr-1'/>Copywrite By <a className='mx-1 text-teal-600 font-bold cursor-pointer' href='' target='_blank'> Aps Developer</a><strong>|</strong> <a className='mx-1 text-teal-600 font-bold cursor-pointer' href="https://www.linkedin.com/in/mehboob-alam-3999822b3/" target='_blank'>Mehboob Alam</a>
          </div>
    </>
  )
}

export default Dashboard