import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import { MdCopyright } from 'react-icons/md'
import { MdStoreMallDirectory } from 'react-icons/md'
import { AiFillDollarCircle } from 'react-icons/ai'
import CategoryGraph from '../Component/CategoryGraph'
import ProductGraph from '../Component/ProductGraph'
import SalesBuyGraph from '../Component/SalesBuyGraph'
import axios from 'axios'
import TodaySalesTable from '../Component/TodaySalesTable'

function Dashboard() {
  const [totalProduct,setTotalProduct]=useState(0)
  const [todaySale,setTodaySale]=useState(0)
  const [thisMonthSale,setThisMonthSale]=useState(0)
  const [todaySalesDetail,setTodaysalesDetail]=useState([])

  useEffect(()=>{
axios.get(`${import.meta.env.VITE_BACKEND_URL}/dashboard`).then(res=>{
  setTotalProduct(res?.data?.productCount)
  
  setTodaySale(Number(res?.data?.todaySale[0]?.totalSales || 0).toFixed(2))
  setThisMonthSale(Number(res?.data?.monthlySale[0]?.totalSales || 0).toFixed(2))
  setTodaysalesDetail(res?.data?.todaySalesDetail)
  console.log(res.data);
}).catch(err=>{
  console.log(err);
})
  },[])
  return (
    <>
      <Navbar greeting={'Welcome to Dashboard'}/>
      <div className='border-b-2 border-gray-700 mb-5'></div>
      {/* <PolarGraph/> */}
      <div className="row flex items-center justify-between relative w-full">
      <div className="items noOfProduct  h-32 shadow-sm shadow-slate-500 cursor-pointer  rounded-2xl p-3" style={{width:'32%',background:'#2B3C46'}}>
        <h1 className='text-2xl font-semibold'>Products</h1>
        <div className='mt-2 flex items-center justify-center  w-full'>
        <MdStoreMallDirectory className=' text-cyan-400 text-3xl mt-2 mr-2'/>
        <div className='text-4xl font-bold text-slate-50 '>{totalProduct} <span className=' text-sm text-gray-400'>items</span> </div>
        </div>
      </div>
      <div className="items noOfProduct  h-32 shadow-sm shadow-slate-500 cursor-pointer rounded-2xl p-3" style={{width:'32%',background:'#2B3C46'}}>
      {/* < className='text-5xl'/> */}
      <h1 className='text-2xl font-semibold'>Today Sales</h1>
        <div className='mt-4 flex justify-center  w-full'>
        <AiFillDollarCircle className=' text-red-500 text-2xl mt-2 mr-2'/>
        <div className='text-2xl font-bold text-slate-50 '>{todaySale} <span className=' text-sm text-gray-400'>today</span> </div>
        </div>
      </div>
      <div className="items noOfProduct   h-32 shadow-sm shadow-slate-500 cursor-pointer rounded-2xl p-3" style={{width:'32%',background:'#2B3C46'}}>
      {/* < className='text-5xl'/> */}
      <h1 className='text-2xl font-semibold'>Sales</h1>
        <div className='mt-4 flex  justify-center  w-full'>
        <AiFillDollarCircle className=' text-red-500 text-2xl mt-2 mr-2'/>
        <div className='text-2xl font-bold text-slate-50 '>{thisMonthSale} <span className=' text-sm text-gray-400'>this month</span> </div>
        </div>
      </div>
      
      </div>
      <div className=' w-full my-3   rounded-md overflow-auto border-2 shadow-inner border-gray-500    shadow-gray-200 py-3' style={{
            background: '#2B3C46', height: '56%'
        }}>
         <div className='flex  gap-7 justify-around px-3'>
         <div className='mt-3 ml-3  gap-3 flex flex-col items-center  h-fit pb-3 min-w-88 rounded-lg' style={{background:'#1D2932'}}>
        <CategoryGraph/>
            <h2 className='text-2xl font-bold'>Categories</h2>
          </div>
          <div className='mt-3 h-fit gap-3 flex flex-col items-center bg-black ' style={{minWidth:'35rem',width:'45rem',background:'#2B3C46'}}>
            <ProductGraph/>
            <h2 className='text-2xl font-bold'>Products</h2>
          </div>
         </div>
         <div className='min-h-96 mt-7 flex flex-col items-center m-auto ' style={{minWidth:'35rem',width:'50rem',background:'#2B3C46'}} >
          <SalesBuyGraph/>
            <h2 className='text-2xl font-bold mt-2'>SALES & BUY</h2>

         </div>
         <h1 className='mt-5 text-3xl border-y-2 font-bold border-gray-600 w-96 text-red-500 text-center py-4 m-auto'>TODAY SALES</h1>
         <TodaySalesTable salesData={todaySalesDetail}/>

      </div>
    
    <div className="row relative flex flex-row items-center justify-center rounded-md ml-2 h-10    mx-3 px-3" style={{ background: '#2B3C46' }}>
        <MdCopyright className='mr-1'/>2024 Copywrite By <a className='mx-1 text-teal-600 font-bold cursor-pointer' href='' target='_blank'> Aps Developer</a><strong>|</strong> <a className='mx-1 text-teal-600 font-bold cursor-pointer' href="https://www.linkedin.com/in/mehboob-alam-3999822b3/" target='_blank'>Mehboob Alam</a>
          </div>
    </>
  )
}

export default Dashboard