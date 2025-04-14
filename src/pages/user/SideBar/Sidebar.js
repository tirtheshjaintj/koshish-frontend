import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { MdDashboard } from 'react-icons/md';
import { GrLogout } from "react-icons/gr";
import { FaBars } from "react-icons/fa";
import { PiChalkboardTeacherFill, PiStudent } from "react-icons/pi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SiGoogleclassroom } from "react-icons/si";
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../../store/userSlice';
import Cookies from "universal-cookie";
const listData = [
    {
        name: "Dashboard",
        type: ["Admin"],
        icon: _jsx(MdDashboard, { size: 20 }),
        link: "/user/dashboard",
    },
    {
        name: "Faculty",
        type: ["Admin"],
        icon: _jsx(PiChalkboardTeacherFill, { size: 20 }),
        link: "/user/dashboard/faculties",
    },
    {
        name: "Class",
        type: ["Admin"],
        icon: _jsx(SiGoogleclassroom, { size: 20 }),
        link: "/user/dashboard/class",
    },
    {
        name: "Events",
        type: ["Admin", "Convenor"],
        icon: _jsx(SiGoogleclassroom, { size: 20 }),
        link: "/user/dashboard/events",
    },
    {
        name: "Register for Event",
        type: ["Class"],
        icon: _jsx(PiStudent, { size: 20 }),
        link: "/user/dashboard/registerEvent",
    },
    {
        name: "All Registerations",
        type: ["Admin", "Convenor"], // Added possible user types here
        icon: _jsx(PiStudent, { size: 20 }),
        link: "/user/dashboard/allRegisterations",
    }
];
export default function Sidebar({ open, setOpen }) {
    const [filteredListData, setFilteredListData] = useState(listData); // state to store filtered list
    const location = useLocation();
    const dispatch = useDispatch();
    const cookie = new Cookies();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const signOut = () => {
        cookie.remove('user_token', { path: '/' });
        navigate("/user/login");
        dispatch(addUser(null));
    };
    useEffect(() => {
        if (user) {
            const filteredData = listData.filter(item => item.type.includes(user.user_type));
            setFilteredListData(filteredData);
        }
        console.log("User", user);
    }, [user]); // Only re-run the effect if the `user` changes
    return (_jsxs("div", { className: 'relative min-h-full text-stone-700', children: [_jsxs("div", { className: 'relative flex items-center gap-4 py-4 text-2xl font-bold border-b border-zinc-700 border-opacity-30', children: [_jsx(FaBars, { size: 20, onClick: () => setOpen((prev) => !prev), className: 'sticky cursor-pointer md:hidden bottom-2 hover:text-slate-500' }), _jsx("img", { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0chhs7PCMWtuhOLg8yYBynOz2qsPmX_ydmCJwci-rkpfXh47lW_2YRRgT7skeD8INGrA&usqp=CAU", alt: "pcte", className: 'object-cover w-8 h-8 rounded-' }), open && "Koshish"] }), _jsx("div", { className: 'flex flex-col gap-2 mt-5', children: filteredListData.map((item, index) => (_jsxs(Link, { to: item.link, className: ` 
                            ${item.link === location.pathname && "bg-red-800 text-white"}
                            rounded-md
                            p-2 
                            transition-all
                            cursor-pointer
                            hover:bg-gradient-to-r hover:bg-red-900
                            hover:text-white
                            font-semibold flex items-center gap-3
                            ${!open ? 'w-fit' : 'w-full'}
                        `, children: [item.icon, open && item.name] }, index))) }), _jsxs("div", { title: 'logout', onClick: () => signOut(), className: `lg:absolute lg:bottom-3 ${!open ? 'w-fit' : 'w-[80%]'} 
                    font-medium flex items-center gap-4
                    cursor-pointer
                    py-3 px-2 rounded-md 
                    hover:text-white
                    hover:bg-gradient-to-r hover:from-stone-900 hover:to-zinc-700
                `, children: [_jsx(GrLogout, { size: 20, className: 'text-red-700' }), open && "Log Out"] })] }));
}
