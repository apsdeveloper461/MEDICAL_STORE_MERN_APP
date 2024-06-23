
import './App.css'
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from './Pages/Dashboard'
import Slider from './Component/Slider';


function App() {


  return (
    <>
      <Toaster />
      <div className='body flex items-center  h-screen max-h-screen w-screen max-w-screen overflow-x-hidden text-gray-300' style={{
    background:'#2B3C46'
   }}>
        <Slider />
        <main className='main ml-20    rounded-lg p-2' 
            style={{background: '#1D2932',width:'93%',height:'94%'}}>
          <Outlet />
        </main>

      </div>

    </>
  )
}

export default App
