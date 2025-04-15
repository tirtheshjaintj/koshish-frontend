import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import Sidebar from "../SideBar/Sidebar";
import { Outlet } from 'react-router-dom';
// Student Dashboard
export default function Dashboard() {
    const [open, setOpen] = useState(true);
    return (_jsxs("div", { className: 'flex  w-full  min-h-screen bg-slate-50 max-h-screen ', style: { scrollbarWidth: "none" }, children: [_jsx("div", { className: `max-md:z-50 absolute min-h-full ${open ? "translate-x-0 flex-1  min-w-[270px] z-50" : "max-md:-translate-x-[130%] transition-all  w-[60px] "} bg-white md:sticky top-0  border border-zinc-300  border-opacity-30
           max-w-[200px] rounded-xl m-2 shadow-xl 
          py-4 px-2 transition-transform duration-300 ease-in-out`, children: _jsx(Sidebar, { open: open, setOpen: setOpen }) }), _jsxs("div", { className: 'flex-1 my-2 relative mx-2 overflow-hidden  overflow-y-auto bg-slate-50', style: { scrollbarWidth: "none" }, children: [_jsx("div", { className: 'flex sticky top-0 z-40   h-14 items-center\r\n        shadow-xl  bg-white\r\n        rounded-md\r\n        px-4\r\n          border border-zinc-300\r\n           border-opacity-30\r\n         justify-between', children: _jsx("div", { className: 'flex items-center gap-3', children: _jsx(FaBars, { onClick: () => setOpen((prev) => !prev), className: ' hover:text-slate-500 cursor-pointer' }) }) }), _jsx("div", { className: 'w-full min-h-full overflow-y-auto overflow-x-hidden bg-slate-50 mt-6 px-1', children: _jsx(Outlet, {}) }), _jsx("div", {})] })] }));
}
