import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FaHistory } from "react-icons/fa";

import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
function ProductsDisplay({ products,category,toggleFormDisplay }) {
const [productData,setproductData]=useState([])
  useEffect(() => {
    
    let productsAccordingToCategory=[]
    if(category==''){
      setproductData(products)
      return;
    }
    setproductData([])
    products.forEach(element => {
      if(element.category === category){
        productsAccordingToCategory.push(element)
      }   
    });
    setproductData(productsAccordingToCategory)
  }, [category,products]);
    const LogButtonClick = (e) => {
        console.log(e.target.id);
    }
    return (
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
                        <th className='w-36 text-left '>Category</th>
                        <th className='w-32 text-left '>Unit Price</th>
                        <th className='w-64 text-left '>CreatedAt</th>
                        <th className='w-64 text-left '>UpdatedAt</th>
                        <th className='w-24 text-left '>Log</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {productData.length != 0 && products.map((product, index) => {
                        return (
                            <tr className='flex items-center shrink-0   px-5 py-2 font-light bg-gray-500 bg-opacity-15 hover:bg-gray-400 hover:bg-opacity-15 border-b-2 border-gray-600' key={product._id}>
                                <td className='w-40 text-left flex gap-4 justify-center'><FaHistory style={{ color: '#078D8C' }} className='w-6 cursor-pointer  text-xl rounded-full hover:text-lg' /> <FaRegEdit style={{ color: '#078D8C' }} className='w-6 cursor-pointer  text-xl  hover:text-lg' /></td>
                                <td className='w-16 text-left'> {index + 1}</td>
                                <td className='w-96 text-left '>{product.name}</td>
                                <td className='w-36 text-left '>{product.stock}</td>
                                <td className='w-36 text-left '>{product.category}</td>
                                <td className='w-32 text-left '>{product.price}</td>
                                <td className=' w-64 text-left '>{moment(product.createdAt).format('LLLL')}</td>
                                <td className='w-64 text-left '>{moment(product.updatedAt).format('LLLL')}</td>
                                <td className='w-24 text-left '><button id={product._id} onClick={LogButtonClick} style={{ background: '#078D8C' }} className=' outline-none  text-md py-0.5 px-2 rounded-md font-semibold text-white hover:-translate-y-1 hover:transition-transform hover:text-gray-400'>view Log</button></td>
                            </tr>
                        )
                    })}
                    {/* <tr className='flex items-center shrink-0   px-5 py-2 font-light bg-gray-500 bg-opacity-15 hover:bg-gray-400 hover:bg-opacity-15 border-b-2 border-gray-600' >
                                <td className='w-40 text-left flex gap-4 justify-center'><FaHistory  style={{ color: '#078D8C' }} className='w-6 cursor-pointer  text-xl rounded-full hover:text-lg'/> <FaRegEdit  style={{ color: '#078D8C' }} className='w-6 cursor-pointer  text-xl  hover:text-lg'/></td>
                                <td className='w-16 text-left'> index + 1</td>
                                <td className='w-96 text-left '>product.name</td>
                                <td className='w-36 text-left '>product.stock</td>
                                <td className='w-36 text-left '>product.category</td>
                                <td className='w-32 text-left '>product.price</td>
                                <td className=' w-64 text-left '>moment(product.createdAt).format('LLLL')</td>
                                <td className='w-64 text-left '>moment(product.updatedAt).</td>
                                <td className='w-24 text-left '><button  style={{ background: '#078D8C' }} className=' outline-none  text-md py-0.5 px-2 rounded-md font-semibold text-white hover:-translate-y-1 hover:transition-transform hover:text-gray-400'>view Log</button></td>
                            </tr> */}
                </tbody>
            </table>
        </div>
    )
}

export default ProductsDisplay