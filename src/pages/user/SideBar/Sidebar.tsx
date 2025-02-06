import React, { useState } from 'react'
import { MdDashboard } from 'react-icons/md'
import { MdSendTimeExtension } from "react-icons/md";
import { GrLogout, GrResources } from "react-icons/gr";
import { MdFeedback } from "react-icons/md";
import { FaBars, FaLaptopCode } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import { PiChalkboardTeacherFill, PiStudent } from "react-icons/pi";
import { MdOutlineInventory } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import DeleteConfirmation from '../../common/DeleteConfirmation';
// import ModalWrapper from '../../common/ModalWrapper';

const listData = [
    {
        name: "Dashboard",
        icon: <MdDashboard size={20} />,
        link: "/user/dashboard",
    },
 
    {
        name: "Faculty",
        icon: <PiChalkboardTeacherFill size={20} />,
        link : "/user/dashboard/faculties",
    },{
        name:"Register for Event",
        icon:<PiStudent size={20}/>,
        link : "/user/dashboard/registerEvent",
    }
];


interface SidebarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  }

export default function Sidebar({ open  , setOpen }:SidebarProps) {
    // const [open] = useRecoilState(openSideBar);

    // const [currUser, setCurrUser] = useRecoilState(userData);
    const [openModal, setOpenModal] = useState(false);
    const location = useLocation();
    
    // const navigate = useNavigate();

    // const logoutHandler = () => {
        // if (logoutUser()) {
        //     setCurrUser(null);
        //     setOpenModal(false);
        //     // console.log("first")
        // }
        // navigate("/login");
    // }


  

    return (
        <div className='relative min-h-full text-stone-700 '>
            <div className='text-2xl font-bold border-b border-zinc-700 border-opacity-30 py-4 flex relative gap-4 items-center'>
                <FaBars
                    size={20}
                    onClick={() => setOpen((prev: boolean) => !prev)}
                    className=' sticky md:hidden bottom-2 hover:text-slate-500 cursor-pointer'
                />
                <img
                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0chhs7PCMWtuhOLg8yYBynOz2qsPmX_ydmCJwci-rkpfXh47lW_2YRRgT7skeD8INGrA&usqp=CAU"}
                    alt="pcte"
                    className='w-8 h-8 rounded- object-cover'
                />
                {open && "Koshish"}
            </div>

            <div className='flex flex-col mt-5 gap-2'>
                {listData.map((item, index) => (
                    <Link
                        to={item.link}
                        key={index}
                        // onClick={() => setTab(item?.name)}
                        className={` 
                            ${item.link === location.pathname && "bg-red-800 text-white"}
                            rounded-md
                            p-2 
                            transition-all
                            cursor-pointer
                            hover:bg-gradient-to-r hover:bg-red-900
                            hover:text-white
                            font-semibold flex items-center gap-3
                            ${!open ? 'w-fit' : 'w-full'}
                        `}
                    >
                        {item.icon}
                        {open && item.name}
                    </Link>
                ))}
            </div>

            <div
                title='logout'
                onClick={() => setOpenModal(true)}
                className={`lg:absolute lg:bottom-3 ${!open ? 'w-fit' : 'w-[80%]'} 
                    font-medium flex items-center gap-4
                    cursor-pointer
                    py-3 px-2 rounded-md 
                    hover:text-white
                    hover:bg-gradient-to-r hover:from-stone-900 hover:to-zinc-700
                `}
            >
                <GrLogout size={20} className='text-red-700' />
                {open && "Log Out"}
            </div>

            {/* <ModalWrapper open={openModal} setOpen={setOpenModal}>
                <DeleteConfirmation handler={logoutHandler} setOpenModal={setOpenModal} />
            </ModalWrapper> */}
        </div>
    );
}
