import { BiLogoFacebookCircle } from "react-icons/bi";
import { GrTwitter } from "react-icons/gr";
import { BsLinkedin } from "react-icons/bs";

export default function Footer() {
  return (
    <div className='bg-black06 max-sm:text-sm pt-24 px-5 md:px-32 text-gray60 links-container'>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-6  mb-10'>

        <div className='flex flex-col gap-4 '>
          <h2 className='text-white  md:text-xl text-md font-bold '>Home</h2>
          <a href='#' className=''>Categories</a>
          <a href='#' className=''>Devices</a>
          <a href='#' className=''>Pricing</a>
          <a href='#' className=''>FAQ</a>
        </div>
        <div className='flex flex-col gap-4'>
          <h2 className='text-white md:text-xl text-md font-bold'>Movies</h2>
          <a href='#' className=''>Genres</a>
          <a href='#' className=''>Trending</a>
          <a href='#' className=''>New Release</a>
          <a href='#' className=''>Popular</a>
        </div>
        <div className='flex flex-col gap-4'>
          <h2 className='text-white md:text-xl text-md font-bold'>Shows</h2>
          <a href='#' className=''>Genres</a>
          <a href='#' className=''>Trending</a>
          <a href='#' className=''>New Release</a>
          <a href='#' className=''>Popular</a>
        </div>
        <div className='flex flex-col gap-4'>
          <h2 className='text-white md:text-xl text-md font-bold'>Support</h2>
          <a href='#' className=''>Contact Us</a>
         
        </div>
        <div className='flex flex-col gap-4'>
          <h2 className='text-white md:text-xl text-md  font-bold'>Subscription</h2>
          <a href='#' className=''>Plans</a>
          <a href='#' className=''>Features</a>
           
        </div>
        <div className='flex flex-col gap-4'>
          <h2 className='text-white md:text-xl text-md font-bold'>Connect With Us</h2>
          <div className='flex items-center gap-4 text-white text-2xl'>
            <a href="#" className='bg-black10 w-10 h-10 flex items-center justify-center shadow10 rounded-md'>
              <BiLogoFacebookCircle />
            </a>
            <a href="#" className='bg-black10 w-10 h-10 flex items-center justify-center shadow10 rounded-md'>
              <GrTwitter />
            </a>
            <a href="#" className='bg-black10 w-10 h-10 flex items-center justify-center shadow10 rounded-md'>
              <BsLinkedin />
            </a>
          </div>
        </div>


      </div>

   
      <div className='flex items-center flex-wrap gap-2  border-t-[1px] border-black15 justify-between py-8'>
        <p>@2025 Cavius, All Rights Reserved</p>
        <div className='flex items-center flex-wrap max-sm:text-xs gap-2'>
          <a href='#' className='min-w-fit'>Terms of Use</a>
          <div className='w-[1px] h-5 bg-black15'></div>
          <a href='#' className='min-w-fit'>Privacy Policy</a>
          <div className='w-[1px] h-5 bg-black15'></div>
          <a href='#' className='min-w-fit'>Cookie Policy</a>
        </div>
      </div>

    </div>
  )
}