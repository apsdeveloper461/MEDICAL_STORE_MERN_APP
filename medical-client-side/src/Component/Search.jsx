import React, { useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";


function Search({searchData,SearchChange}) {
    // const [searchData,setSearchData]=useState('')
    // const searchDataChange=(e)=>{
    //     setSearchData(e.target.value)
    // }
    return (
        <>
            <div  id="seacrhProduct" className='relative w-9/12 flex flex-row h-10 items-center '>
                <input type="search" onChange={SearchChange} className='m-2 px-4 h-7 w-full font-light outline-none relative  rounded-full border-2-gray' style={{ background: '#1D2932' }} name="searchProduct" id="searchProduct" value={searchData} placeholder='Search product here..' />
                <div className='absolute right-3  p-1 rounded-full ' style={{ background: '#078D8C' }}><AiOutlineSearch className='' /></div>
            </div>
        </>
    )
}

export default Search