import { useState } from 'react'
import { FaBars } from 'react-icons/fa6'
import Sidebar from "../SideBar/Sidebar"
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Student Dashboard
export default function Dashboard() {
  const [open, setOpen] = useState(true)
  

  return (
    <div className='flex  w-full  min-h-screen bg-slate-50 max-h-screen '
      style={{ scrollbarWidth: "none" }}>
      <div
        className={`max-md:z-50 absolute min-h-full ${open ? "translate-x-0 flex-1  min-w-[270px] z-50" : "max-md:-translate-x-[130%] transition-all  w-[60px] "
          } bg-white md:sticky top-0  border border-zinc-300  border-opacity-30
           max-w-[200px] rounded-xl m-2 shadow-xl 
          py-4 px-2 transition-transform duration-300 ease-in-out`}
      >

        <Sidebar open={open} setOpen={setOpen}  />

      </div>

      {/* Dashboard Content */}
      <div className='flex-1 my-2 relative mx-2 overflow-hidden  overflow-y-auto bg-slate-50' style={{ scrollbarWidth: "none" }}>

        {/* Topbar */}
        <div className='flex sticky top-0 z-40   h-14 items-center
        shadow-xl  bg-white
        rounded-md
        px-4
          border border-zinc-300
           border-opacity-30
         justify-between'>


          <div className='flex items-center gap-3'>
            <FaBars
              onClick={() => setOpen((prev) => !prev)}
              className=' hover:text-slate-500 cursor-pointer' />
            {/* <h1 className='text-xl  font-bold'>{sideTab}</h1> */}
          </div>


        </div>


        {/* Main Area */}
        <div className='w-full min-h-full overflow-y-auto overflow-x-hidden bg-slate-50 mt-6 px-1' >

          <Outlet/>

        </div>

        <div>

        </div>

      </div>

    </div>
  )
}
