import moment from 'moment'
import React, { useEffect } from 'react'

function HistroyDisplay({logData}) {
    const logs = logData.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return   dateB - dateA;
      });
      
  return (
    <>
           <div className=' w-full my-3 rounded-md overflow-x-auto   shadow-sm shadow-gray-700' style={{
            background: '#2B3C46', height: '80%'
        }}>
            <table className=' table-fixed '>
                <thead className='sticky top-0' style={{
                    background: '#2B3C46', position: ''
                }}>
                    <tr className='w-full  border-b-2 border-gray-400 flex shrink-0   px-5 py-4 '>
                        <th className='w-16 text-left'>Sr.no</th>
                        <th className='w-96 text-left '>Product Name</th>
                        <th className='w-36 text-left '>Quantity_Change</th>
                        <th className=' w-44 text-left '>Resultant_Quantity</th>
                        <th className='w-64 text-left '>operationType</th>
                        <th className='w-64 text-left '>Time</th>
                    </tr>
                </thead>
                <tbody className=''>
                   {/* {isloading && <Loading/>} */}
                    { logData.length != 0 &&  logs.map((log, index) => {
                        return (
                            <tr className='flex items-center shrink-0   px-5 py-2 font-light bg-gray-500 bg-opacity-15 hover:bg-gray-400 hover:bg-opacity-15 border-b-2 border-gray-600' key={log._id}>
                                <td className='w-16 text-left'> {index + 1}</td>
                                <td className='w-96 text-left '>{log.productId.name}</td>
                                <td className='w-36 text-left px-6 '>{log.change}</td>
                                <td className='w-44 text-left px-6 '>{log.resultingQuantity}</td>
                                <td className=' w-64 text-left '>{log.operationType}</td>
                                <td className=' w-64 text-left '>{log.createdAt}</td>
                             </tr>
                        )
                    })}
                    {
                      logData.length == 0 && 
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

export default HistroyDisplay