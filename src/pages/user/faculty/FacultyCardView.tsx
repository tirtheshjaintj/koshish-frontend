import React from 'react'
import { MdLocalPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";

export default function FacultyCardView({ value }) {
    return (
        <div
            className='p-2 rounded-md  min-w-[280px] gap-4 max-sm:max-w-[600px]  max-w-md  shadow-lg flex items-center flex-1 bg-white'>
            <div className='w-10 h-10 rounded-full overflow-clip'>
                <img src={value?.avatar || "https://cdn-icons-png.flaticon.com/512/3541/3541871.png"}
                    alt={value?.name} className='w-full h-full object-cover' />
            </div>

            <div className=''>
                <p className='font-semibold text-lg'>{value?.name}</p>
                <p className='text-xs font-semibold text-red-800'>{value?.user_type?.toUpperCase()}</p>
                <p className=' text-xs md:text-sm flex items-center gap-1 text-gray-700'><MdEmail /> {value?.email}</p>
                <p className=' text-xs md:text-sm flex items-center gap-1 text-gray-700'><MdLocalPhone /> {value?.phone_number}</p>
            </div>
        </div>
    )
}
