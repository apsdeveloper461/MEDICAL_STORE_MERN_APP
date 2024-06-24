import React from 'react'
import Navbar from '../Component/Navbar'
import { MdCopyright } from 'react-icons/md'
import CategoryGraph from '../Component/CategoryGraph'
// import PolarGraph from '../Component/PolarGraph'

function Dashboard() {
  return (
    <>
      <Navbar greeting={'Welcome to Dashboard'}/>
      {/* <PolarGraph/> */}
      <div className=' w-full my-3   rounded-md overflow-auto   shadow-sm shadow-gray-700' style={{
            background: '#2B3C46', height: '80%'
        }}>
          <div className='mt-3 ml-3 w-80 gap-3 flex flex-col items-center ' style={{background:'#2B3C46'}}>
            <h2 className='text-2xl font-bold'>Categories</h2>
        <CategoryGraph/>

          </div>

      </div>
    
    <div className="row relative flex flex-row items-center justify-center rounded-md ml-2 h-10    mx-3 px-3" style={{ background: '#2B3C46' }}>
        <MdCopyright className='mr-1'/>Copywrite By <a className='mx-1 text-teal-600 font-bold cursor-pointer' href='' target='_blank'> Aps Developer</a><strong>|</strong> <a className='mx-1 text-teal-600 font-bold cursor-pointer' href="https://www.linkedin.com/in/mehboob-alam-3999822b3/" target='_blank'>Mehboob Alam</a>
          </div>
    </>
  )
}

export default Dashboard