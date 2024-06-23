import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import Navbar from '../Component/Navbar'
import Search from '../Component/Search';
import ProductsDisplay from '../Component/ProductsDisplay';
import { IoAddCircle } from "react-icons/io5";
import ProductForm from '../Component/ProductForm';

function Store() {
  const CategoriesOptionsRef = useRef("General")
  const [isShowAddProductForm, setIsShowAddProductForm] = useState(false)
  const [productFromBackend, setproductFromBackend] = useState([])
  const [category, setCategory] = useState('')
  const [searchData, setSearchData] = useState('')
  const changeSeacrhData = (e) => {
    console.log(e.target.value);
    setSearchData(e.target.value)
  }

  const CategoriesOptionChange = () => {
    console.log(CategoriesOptionsRef.current.value);
    setCategory(CategoriesOptionsRef.current.value)


  }
  useEffect(() => {

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`).then((res) => {
      setproductFromBackend(res.data.product)
      console.log(res.data.product);
    }).catch((err) => {
      console.log(err);
    })

  }, []);
  // toggleAddProductForm
  const toggleAddProductForm=()=>{
    setIsShowAddProductForm((prev)=>!prev)
    // document.getElementById('AddProduct').classList.toggle('FormTransform')

  }

  return (
    <>
      <Navbar />

      <div className="row relative flex flex-row items-center justify-between px-1 ">
        <div className="part1 w-9/12 rounded-md ml-2 h-10 flex items-center justify-between mx-3 px-3" style={{ background: '#2B3C46' }}>

          <Search searchData={searchData} SearchChange={changeSeacrhData} />
          <div className='flex items-center'><h3>Products</h3>
            <IoAddCircle style={{ color: '#078D8C' }} onClick={toggleAddProductForm} className='w-10 cursor-pointer  text-4xl rounded-full hover:text-3xl' />
          </div>
        </div>
        <div className="part2 relative w-64 flex items-center     rounded-md  px-3 p-1" style={{ background: '#2B3C46' }}>
          <h2>Categories</h2>
          <select id='Categories' ref={CategoriesOptionsRef} onChange={CategoriesOptionChange} className='cursor-pointer outline-none relative rounded-lg h-8 px-2 mx-2' style={{ background: '#1D2932' }}>
            <option value="">All Categories</option>
            <option value="General">General</option>
            <option value="Tablets">Tablets</option>
            <option value="Capsules">Capsules</option>
            <option value="Syrups">Syrups</option>
            <option value="Ointments">Ointments</option>
            <option value="Creams">Creams</option>
            <option value="Injections">Injections</option>
            <option value="Vaccines">Vaccines</option>
            <option value="Surgical">Surgical</option>
            <option value="Medical_devices">Medical Devices</option>
          </select>
        </div>
      </div>
      {isShowAddProductForm &&
      <ProductForm  toggleFormDisplay={toggleAddProductForm}/>
      }
      <ProductsDisplay products={productFromBackend} category={category} toggleFormDisplay={toggleAddProductForm}/>


    </>
  )
}

export default Store