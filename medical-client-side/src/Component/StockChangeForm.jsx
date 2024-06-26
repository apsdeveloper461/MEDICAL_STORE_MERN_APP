import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
// import {  } from "head";

function StockChangeForm({productId=null,quantity=0,productName='',toggleForm,stockStatus="add"}) {
    const [stockChange,setStockChange]=useState(null)
    useEffect(() => {
        

       
       
    }, []);
    const changeStockChange=(e)=>{
        setStockChange(parseInt(e.target.value))
        // console.log(e.target.value,stockChange);
    }
    const changeStockFormSubmit=(e)=>{
        e.preventDefault()  
        const payload={
            product_id:productId,
            stock:stockChange
        }
        if(stockStatus==="add"){
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/add_stock`,payload).then(res=>{
                // console.log(res.data);
                toast.success(res.data.message)
                toggleForm()
            }).catch(err=>{
                console.log(err);
                toast.error("Something went wrong")
            })
        }else if(stockStatus === 'remove'){
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/remove_stock`,payload).then(res=>{
                // console.log(res.data);
                toast.success(res.data.message)
                toggleForm()
            }).catch(err=>{
                console.log(err);
                toast.error("Something went wrong")
            })
        }
    }
  return (
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" aria-hidden="true"></div>
  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" >
            {/* <h1>hello</h1> */}
            <form action="" onSubmit={changeStockFormSubmit}>
        <div class=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4" style={{ background: '#1D2932' }}>
                <h1 className='text-2xl font-semibold text-center pb-3 border-b-2 mb-10'>{stockStatus ==='add'? 'Add Stock':"Remove Stock"} ({productName})</h1>
                <p className='my-3 flex items-center gap-3'>Available Quantity/Stock : <span className='text-red-800 font-bold text-xl'>{quantity}</span></p>
            <div className="relative z-0 w-full  group px-2  mb-10">
                <input type="number" name="stock" id="stock" value={stockChange} onChange={changeStockChange}   className="ProductFormInput block h-10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-2 rounded-md border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-2 focus:rounded-md peer" placeholder=""  min={0} max={stockStatus === 'add'? 1000 :quantity} required />
                <label htmlFor="stock" className="mx-5 px-2 peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5" style={{ background: '#1D2932' }}>Quantity Change</label>
            </div>
          
        </div>
        <div class="border-t-2 border-gray-500 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 " style={{ background: '#1D2932' }}>
          <button type="submit"  class={`inline-flex w-full justify-center rounded-md ${stockStatus==='add'? 'bg-blue-800 hover:bg-blue-600':'bg-red-600 hover:bg-red-500' }  px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto`}>{stockStatus ==='add'? 'Add Stock':"Remove Stock"}</button>
          <div type="button" onClick={()=>{toast.success("Cancel Changes Successfully");toggleForm()}} class="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</div>
        </div>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}

export default StockChangeForm