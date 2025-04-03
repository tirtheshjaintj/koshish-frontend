import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MdLocalPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
export default function FacultyCardView({ value, handleEdit }) {
    // console.log(value)
    return (_jsxs("div", { className: 'p-2 rounded-md max-auto relative w-full  shadow-lg flex items-center  flex-1 bg-white', children: [_jsx("div", { className: 'w-10 h-10 rounded-full overflow-clip', children: _jsx("img", { src: "https://cdn-icons-png.flaticon.com/512/3541/3541871.png", alt: value?.name, className: 'w-full h-full object-cover' }) }), _jsxs("div", { className: '', children: [_jsx("p", { className: 'font-semibold text-lg', children: value?.name?.slice(0, 20)
                            + (value?.name?.length > 20 ? "..." : "") }), _jsx("p", { className: 'text-xs font-semibold text-red-800', children: value?.user_type?.toUpperCase() }), _jsxs("p", { className: ' text-xs md:text-sm flex items-center gap-1 text-gray-700', children: [_jsx(MdEmail, {}), " ", value?.email] }), _jsxs("p", { className: ' text-xs md:text-sm flex items-center gap-1 text-gray-700', children: [_jsx(MdLocalPhone, {}), " ", value?.phone_number] })] }), _jsx(FaRegPenToSquare, { onClick: () => handleEdit(value), title: 'Edit', className: 'text-stone-800 absolute top-2 right-2 cursor-pointer hover:stroke-neutral-600' }), _jsx(FaCircleCheck, { title: value?.is_active ? "Active" : "Not Active", className: `${value?.is_active ? "text-green-500" : "text-red-500"} absolute right-2 bottom-2 ` })] }));
}
