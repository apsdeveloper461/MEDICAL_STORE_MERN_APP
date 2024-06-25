import React from 'react'

function TodaySalesTable({salesData}) {
  return (
    <>
    <div className='mx-2 w-full my-3 rounded-md    shadow-sm shadow-gray-700' style={{
     background: '#2B3C46', height: '80%'
 }}>
     <table className=' table-fixed '>
         <thead className='sticky top-0' style={{
             background: '#2B3C46', position: ''
         }}>
             <tr className='w-full  border-b-2 border-gray-400 flex shrink-0   px-5 py-4 '>
                 <th className='w-16 text-left'>Sr.no</th>
                 <th className='w-96 text-left '>Product Name</th>
                 <th className='w-36 text-left '>Sale_Quantity</th>
                 <th className='w-64 text-left '>Total Price</th>
                 <th className='w-64 text-left '>Time</th>
             </tr>
         </thead>
         <tbody className=''>
            {/* {isloading && <Loading/>} */}
             { salesData.length != 0 &&  salesData.map((item, index) => {
                 return ( item.change < 0 ? 
                     <tr className='flex items-center shrink-0   px-5 py-2 font-light bg-gray-500 bg-opacity-15 hover:bg-gray-400 hover:bg-opacity-15 border-b-2 border-gray-600' key={item._id}>
                          <td className='w-16 text-left'> {index + 1}</td>
                         <td className='w-96 text-left '>{item.product_data.name}</td>
                          <td className='w-36 text-left px-6 '>{-1*item.change}</td>
                          <td className='w-44 text-left px-6 '>{item.sales}</td>
                          <td className=' w-64 text-left '>{item.timestamp}</td>
                      </tr>
                      : ''
                 )
             })}
             {
               salesData.length == 0 && 
               <div className='relative w-screen mt-36 text-center'>
                 <span className='text-xl'>No Result Found</span>
               </div>
             }
           
         </tbody>
     </table>
 </div>
</>
  )
}

export default TodaySalesTable