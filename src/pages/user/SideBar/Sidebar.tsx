import React, { useState } from 'react'
import { MdDashboard } from 'react-icons/md'
import { GrLogout } from "react-icons/gr";
import { FaBars } from "react-icons/fa";
import { PiChalkboardTeacherFill, PiStudent } from "react-icons/pi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SiGoogleclassroom } from "react-icons/si";
import { useDispatch } from 'react-redux';
import { addUser } from '../../../store/userSlice';
// import DeleteConfirmation from '../../common/DeleteConfirmation';
// import ModalWrapper from '../../common/ModalWrapper';
import Cookies from "universal-cookie";

const listData = [
    {
        name: "Dashboard",
        icon: <MdDashboard size={20} />,
        link: "/user/dashboard",
    },

    {
        name: "Faculty",
        icon: <PiChalkboardTeacherFill size={20} />,
        link: "/user/dashboard/faculties",
    }, 
    {
        name: "Class",
        icon: <SiGoogleclassroom size={20} />,
        link: "/user/dashboard/class",
    }, 
    {
        name: "Events",
        icon: <SiGoogleclassroom size={20} />,
        link: "/user/dashboard/events",
    },
    {
        name: "Register for Event",
        icon: <PiStudent size={20} />,
        link: "/user/dashboard/registerEvent",
    },{
        name: "All Registerations",
        icon : <PiStudent size={20} />,
        link : "/user/dashboard/allRegisterations"
    }
];


interface SidebarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
    // const [open] = useRecoilState(openSideBar);

    // const [currUser, setCurrUser] = useRecoilState(userData);
    const [openModal, setOpenModal] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const cookie = new Cookies();
    const navigate = useNavigate();

    const signOut = () => {
        cookie.remove('user_token', { path: '/' });
        navigate("/user/login");
        dispatch(addUser(null));
    };

    return (
        <div className='relative min-h-full text-stone-700 '>
            <div className='relative flex items-center gap-4
             py-4 text-2xl font-bold border-b border-zinc-700 border-opacity-30'>
                <FaBars
                    size={20}
                    onClick={() => setOpen((prev: boolean) => !prev)}
                    className='sticky cursor-pointer md:hidden bottom-2 hover:text-slate-500'
                />
                <img
                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0chhs7PCMWtuhOLg8yYBynOz2qsPmX_ydmCJwci-rkpfXh47lW_2YRRgT7skeD8INGrA&usqp=CAU"}
                    alt="pcte"
                    className='object-cover w-8 h-8 rounded-'
                />
                {open && "Koshish"}
            </div>

            <div className='flex flex-col gap-2 mt-5'>
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
                onClick={() => signOut()}
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
