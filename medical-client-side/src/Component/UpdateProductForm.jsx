import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { MdClose } from 'react-icons/md'

function UpdateProductForm({toggleFormDisplay,toggleForm,FormData}) {
    const CategoryRef = useRef("General")
    const [productName,setProductName]=useState('')
    const [price,setPrice]=useState('')
    const [category,setCategory]=useState('General')

const cateoryChange=()=>{
    // console.log(CategoryRef.current.value);
    setCategory(CategoryRef.current.value)
}
const changeProductName=(e)=>{
    setProductName(e.target.value)
    // console.log(productName);
}
const changePrice=(e)=>{
    setPrice(Number(e.target.value))
    // console.log(price);
}
const changeStock=(e)=>{
    setStock(Number(e.target.value))
    // console.log(e.target.value);
}
useEffect(() => {
    console.log("FormData",FormData);
    setProductName(FormData.name)
    setPrice(FormData.price)
    CategoryRef.current.value=FormData.category
    setCategory(FormData.category)
    
}, []);
const UpdateProductForm=(e)=>{
    e.preventDefault()
    const payload={
            product_id:FormData._id,
            name:productName,
            category:category,
            price:price
    }
    axios.post( `${import.meta.env.VITE_BACKEND_URL}/update_product`,payload).then(res=>{
        console.log(res);
        toast.success('Update Product Successfully')
        toggleFormDisplay()

    }).catch(err=>{
        console.log(err);
        toast.error(err?.response?.data?.message)

    })
    
}
    return (
        <div className=' absolute top-0 right-0 w-screen  h-screen  bg-white  bg-opacity-10 flex justify-end items-center z-10' >
    
            <form onSubmit={UpdateProductForm} id='AddProduct' className={`productForm ${toggleForm? 'FormTransform' : '' } relative flex flex-col gap-14  rounded-l-lg px-5`} style={{ width: '450px', background: '#1D2932' }}>
                <MdClose  onClick={toggleFormDisplay} className='absolute left-0 m-3 text-2xl cursor-pointer active:text-red-700 hover:text-xl w-fit'/>
                <h1 className='text-center text-3xl mt-3 border-b-2 border-gray-500 py-4 mb-4'>Update Product</h1>

                <div className="relative z-0 w-full  group px-2 mt-10">
                    <input type="text" name="name" id="name" onChange={changeProductName} value={productName} className="ProductFormInput block h-10  py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent  border-2 rounded-md border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:border-2 focus:rounded-md focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="name" className="mx-5 px-2 peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5" style={{ background: '#1D2932' }}>Product Name</label>
                </div>
               
                <div className="relative z-0 w-full  group px-2 ">
                    <select name="category" id="category" ref={CategoryRef} onChange={cateoryChange} className="ProductFormInput block h-10 py-2.5 px-2 w-full text-sm text-gray-900  border-2 rounded-md border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-2 focus:rounded-md peer" style={{ background: '#1D2932' }}>
    
                        <option value="General">General</option>
                        <option value="Tablets">Tablets</option>
                        <option value="Capsules">Capsules</option>
                        <option value="Syrups">Syrups</option>
                        <option value="Ointments">Ointments</option>
                        <option value="Creams">Creams</option>
                        <option value="Injections">Injections</option>
                        <option value="Vaccines">Vaccines</option>
                        <option value="Surgical">Surgical</option>
                        <option value="First Aid">First Aid</option>
                        <option value="Medical_devices">Medical Devices</option>
                    </select>
                    <label htmlFor="category" className="mx-5 px-2 mb-2 peer-focus:font-medium absolute  text-md  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 " style={{ background: '#1D2932' }}>Select Category</label>
                </div>
                <div className="relative z-0 w-full group px-2 ">
                    <input type="number" name="price" id="price" onChange={changePrice} value={price}  className="ProductFormInput block h-10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-2 rounded-md border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-2 focus:rounded-md peer" placeholder="" min={1} max={100000} required />
                    <label htmlFor="price" className="mx-5 px-2 mb-2 peer-focus:font-medium absolute  text-md  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 " style={{ background: '#1D2932' }}>Unit Price</label>
                </div>
                <div className="flex flex-col items-center ">
                    <div onClick={()=> {toast.success("Cancel Successfully");toggleFormDisplay()}} className="w-full cursor-pointer text-white hover:bg-red-900  bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm  px-5 py-2.5 text-center">Cancel</div>
                    <button type="submit" className="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm \ px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Product</button>
    
                </div>
    
            </form>
        </div>
    
    )

}

export default UpdateProductForm