import React, { useEffect, useState } from 'react'
import { FaHistory } from "react-icons/fa";

import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { AiOutlineMinusCircle } from "react-icons/ai";
import Loading from './Loading';
import UpdateProductForm from './UpdateProductForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StockChangeForm from './StockChangeForm';


function ProductsDisplay({ products,selectedCategory,toggleFormDisplay,isloading }) {
  const naviate=useNavigate()
const [productData,setproductData]=useState([])
const [displayUpdateProductPage,setDisplayUpdateProductPage]=useState(false)
const [displayUpdateProductForm,setDisplayUpdateProductForm]=useState(false)
const [updateFormData,setUpdateFormData]=useState(null)
const [isStockChangeFormDisplay,setIsStockChangeFormDisplay]=useState(false)
const [StockChangeFormData,setStockChangeFormData]=useState({
  productId:'',
  productName:'',
  quantity:0,
  stockStatus:''
})
  useEffect(() => {
console.log(selectedCategory);
let productsAccordingToCategory = [];

if (selectedCategory === "") {
  setproductData(products);
} else {
  productsAccordingToCategory = products.filter((f) => f.category === selectedCategory);
//   console.log("productsAccordingToCategory",productsAccordingToCategory);
  setproductData(productsAccordingToCategory);
}
// console.log("products ", productData);

  }, [selectedCategory,products]);
   

    const toggleUpdateProductForm = () => {
        if (displayUpdateProductPage) {
          setDisplayUpdateProductForm(false)
          setTimeout(() => {
            setDisplayUpdateProductPage(false)
          }, 1000);
        } else {
          setDisplayUpdateProductPage(true)
          setTimeout(() => {
            setDisplayUpdateProductForm((prev) => !prev)
          }, 0);
        }
    }
const handleUpdateProduct=(productId)=>{
    if(productId){
        console.log("id",productId);
        const UpdateFormData=productData.filter(f=>f._id === productId)
        setUpdateFormData(UpdateFormData[0])
        toggleUpdateProductForm()

    }
}
const NaviateToHistoryLog=(productId)=>{

  // const productId=e.target.value;
  console.log("productId",productId)
  if(productId){
    const payload={
      product_id:productId
    }
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/customlog`,payload).then(res=>{
        const LOGDATA=res?.data?.log
        console.log(LOGDATA);
        naviate('/log',{state:LOGDATA})
    }).catch(err=>console.log(err))
  }

}
const ChangeStockHandler=(productId,stockStatus)=>{
   console.log(productId,stockStatus);
   const productName=productData.filter(f=>f._id === productId)
   console.log(productName);
   setStockChangeFormData({
    productId:productId,
    productName:productName[0].name,
    quantity:productName[0].stock,
  stockStatus:stockStatus
   })
   togleStockChangeFormDisplay()
}
const togleStockChangeFormDisplay=()=>{
  setIsStockChangeFormDisplay((prev)=>!prev)
}
    return (
        <>
        <div className=' w-full my-3 rounded-md overflow-x-auto   shadow-sm shadow-gray-700' style={{
            background: '#2B3C46', height: '76%'
        }}>
            <table className=' table-fixed '>
                <thead className='sticky top-0' style={{
                    background: '#2B3C46', position: ''
                }}>
                    <tr className='w-full  border-b-2 border-gray-400 flex shrink-0   px-5 py-4 '>
                        <th className='w-40 text-left flex items-center gap-3'>Add Product <IoMdAddCircleOutline onClick={toggleFormDisplay} style={{ color: '#078D8C' }} className='w-6 cursor-pointer  text-2xl rounded-full hover:text-xl' /></th>
                        <th className='w-16 text-left'>Sr.no</th>
                        <th className='w-96 text-left '>Product Name</th>
                        <th className='w-36 text-left '>Quantity/Stock</th>
                        <th className='w-36 text-left '>Change Stock</th>
                        <th className='w-36 text-left '>Category</th>
                        <th className='w-32 text-left '>Unit Price</th>
                        <th className='w-64 text-left '>CreatedAt</th>
                        <th className='w-64 text-left '>UpdatedAt</th>
                        <th className='w-24 text-left '>Log</th>
                    </tr>
                </thead>
                <tbody className=''>
                   {isloading && <Loading/>}
                
                    {!isloading && productData.length != 0 && productData.map((product, index) => {
                        return (
                            <tr className='flex items-center shrink-0   px-5 py-2 font-light bg-gray-500 bg-opacity-15 hover:bg-gray-400 hover:bg-opacity-15 border-b-2 border-gray-600' key={product._id}>
                                <td className='w-40 text-left flex gap-4 justify-center'>
                                  
                                  <FaHistory onClick={()=>NaviateToHistoryLog(product._id) }  style={{ color: '#078D8C' }} className='w-6 cursor-pointer  text-xl rounded-full hover:text-lg' /> 
                                

                                <FaRegEdit  onClick={()=>handleUpdateProduct(product._id)} style={{ color: '#078D8C' }} className=' w-6 cursor-pointer  text-xl  hover:text-lg' />
                                
                                </td>
                                <td className='w-16 text-left'> {index + 1}</td>
                                <td className='w-96 text-left '>{product.name}</td>
                                <td className='w-36 text-left '>{product.stock}</td>
                                <td className='w-36 text-left flex gap-1 items-center pl-3 text-white '><MdAddCircleOutline onClick={()=>ChangeStockHandler(product._id,'add')} className='text-2xl hover:text-xl hover:text-blue-500 w-6 cursor-pointer'/><AiOutlineMinusCircle onClick={()=>ChangeStockHandler(product._id,'remove')} className='text-2xl hover:text-xl hover:text-red-600 w-6 cursor-pointer'/></td>
                                <td className='w-36 text-left '>{product.category}</td>
                                <td className='w-32 text-left '>{product.price}</td>
                                <td className=' w-64 text-left '>{product.created}</td>
                                <td className='w-64 text-left '>{product.updated}</td>
                                <td className='w-24 text-left '><button onClick={()=>NaviateToHistoryLog(product._id)} style={{ background: '#078D8C' }} className=' outline-none  text-md py-0.5 px-2 rounded-md font-semibold text-white hover:-translate-y-1 hover:transition-transform hover:text-gray-400'>view Log</button></td>
                            </tr>
                        )
                    })}
                    {
                      productData.length == 0 && 
                      <div className='relative w-screen mt-36 text-center'>
                        <span className='text-xl'>No Result Found</span>
                      </div>
                    }
                  
                </tbody>
            </table>
        </div>
        {
          isStockChangeFormDisplay &&
              <StockChangeForm productId={StockChangeFormData.productId} quantity={StockChangeFormData.quantity} productName={StockChangeFormData.productName} toggleForm={togleStockChangeFormDisplay} stockStatus={StockChangeFormData.stockStatus}/>
        }
        {displayUpdateProductPage && 
            <UpdateProductForm toggleFormDisplay={toggleUpdateProductForm} toggleForm={displayUpdateProductForm} FormData={updateFormData}/>
        }
        </>
    )

}

export default ProductsDisplay