import { MdLocalPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { Faculty } from '../../../context/DataProviderContext';


interface FacultyCardViewProps {
    value: Faculty,
    handleEdit: (value:Faculty) => void,
}
export default function FacultyCardView({ value, handleEdit }:
    FacultyCardViewProps) {

    // console.log(value)
    return (
        <div
            className='p-2 rounded-md max-auto relative w-full  shadow-lg flex items-center  flex-1 bg-white'>
            <div className='w-10 h-10 rounded-full overflow-clip'>
                <img src={"https://cdn-icons-png.flaticon.com/512/3541/3541871.png"}
                    alt={value?.name} className='w-full h-full object-cover' />
            </div>

            <div className=''>
                <p className='font-semibold text-lg'>{value?.name?.slice(0, 20)
                    + (value?.name?.length > 20 ? "..." : "")}</p>
                <p className='text-xs font-semibold text-red-800'>{value?.user_type?.toUpperCase()}</p>
                <p className=' text-xs md:text-sm flex items-center gap-1 text-gray-700'><MdEmail /> {value?.email}</p>
                <p className=' text-xs md:text-sm flex items-center gap-1 text-gray-700'><MdLocalPhone /> {value?.phone_number}</p>
            </div>

           

            <FaRegPenToSquare
                onClick={() => handleEdit(value)}
                title='Edit'
                className='text-stone-800 absolute top-2 right-2 cursor-pointer hover:stroke-neutral-600' />

            <FaCircleCheck
                title={value?.is_active? "Active" :"Not Active"}
                className={`${value?.is_active ? "text-green-500" : "text-red-500"} absolute right-2 bottom-2 `} />
        </div>
    )
}
