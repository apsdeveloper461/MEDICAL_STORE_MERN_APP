import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import Navbar from '../Component/Navbar'
import Search from '../Component/Search';
import ProductsDisplay from '../Component/ProductsDisplay';
import { IoAddCircle } from "react-icons/io5";
import { TbRefreshDot } from "react-icons/tb";
import { MdTableRows } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import ProductForm from '../Component/ProductForm';

function Store() {
  const CategoriesOptionsRef = useRef("General")
  const [isShowAddProductPage, setIsShowAddProductPage] = useState(false)
  const [isShowAddProductForm, setIsShowAddProductForm] = useState(false)
  const [productFromBackend, setproductFromBackend] = useState([])
  const [searchProduct, setsearchProduct] = useState([])
  const [category, setCategory] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchData, setSearchData] = useState('')
  const changeSeacrhData = async (e) => {

    setIsLoading(true)
    console.log(e.target.value);
    setSearchData(e.target.value)

    setsearchProduct(searchFundtionOfProduct(searchData))
    console.log("searchData", searchFundtionOfProduct(searchData));

    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }
  const searchFundtionOfProduct = (searchText) => {
    const searchedData = productFromBackend.filter((product) => {
      const productName = product.name.toLowerCase();
      const searchQuery = searchText.toLowerCase();
      return productName.includes(searchQuery);
    });
    return searchedData;
  };

  const CategoriesOptionChange = () => {
    console.log(CategoriesOptionsRef.current.value);
    setCategory(CategoriesOptionsRef.current.value)


  }
  const getDataFromBackend=()=>{
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`).then((res) => {
      setproductFromBackend(res.data.product)
      setsearchProduct(res.data.product)
      console.log(res.data.product);
    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
      getDataFromBackend()
  }, []);
  // RefreshDataHandler
  const RefreshDataHandler=()=>{
    getDataFromBackend()
  }
  // toggleAddProductForm
  const toggleAddProductForm = () => {
    if (isShowAddProductPage) {
      setIsShowAddProductForm(false)
      setTimeout(() => {
        setIsShowAddProductPage(false)

      }, 1000);


    } else {
      setIsShowAddProductPage(true)
      setTimeout(() => {
        setIsShowAddProductForm((prev) => !prev)

      }, 0);

    }
    // callback()
    // console.log(document.querySelector('#AddProduct'));

  }

  return (
    <>

<Navbar greeting={'Welcome to Product Page'}/>
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
            <option value="First Aid">First Aid</option>
            <option value="Medical_devices">Medical Devices</option>
          </select>
        </div>
      </div>
      <div className='h-6 relative w-full  mt-2 -mb-2 flex justify-end items-center'>
        <MdTableRows className='text-xl  hover:text-emerald-700 w-6 cursor-pointer hover:text-lg'/>
        <div className='mr-4'>{productFromBackend.length}</div>
        <GoDotFill className='text-sm'/>
        <div className='text-sm px-2'>Refresh        </div>
        <TbRefreshDot className='text-xl mr-3 hover:text-emerald-700 w-6 cursor-pointer hover:text-lg' onClick={RefreshDataHandler}/>

      </div>
      <ProductsDisplay products={searchProduct} selectedCategory={category} toggleFormDisplay={toggleAddProductForm} isloading={isLoading} />

      {isShowAddProductPage &&
        <ProductForm toggleFormDisplay={toggleAddProductForm} toggleForm={isShowAddProductForm} />
      }

    </>
  )
}

export default Store