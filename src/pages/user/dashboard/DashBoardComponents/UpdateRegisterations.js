import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../../../config/axiosConfig";
import toast from "react-hot-toast";
const UpdateRegisterationForEvent = ({ setRegisterEvent, event, fetchAllEvents }) => {
    if (!event) {
        return;
    }
    const [students, setStudents] = useState([...event?.register?.students]);
    const [newStudent, setNewStudent] = useState(""); // State for input field
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const handleAddStudent = (e) => {
        e.preventDefault();
        if (newStudent.trim() !== "" && students.length < event?.maxStudents) {
            setStudents([...students, newStudent.trim()]);
            setNewStudent(""); // Clear input field
        }
    };
    const handleRemoveStudent = (index) => {
        setStudents(students.filter((_, i) => i !== index));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const response = await axiosInstance.put(`/registrations/${event?.register?._id}`, {
                students,
                eventId: event?._id,
                classId: event?.register?.classId
            });
            if (response?.data) {
                console.log("happen");
                // setMessage(response?.data?.message);
                toast.success("Registration updated successfully");
                setRegisterEvent(null);
                fetchAllEvents();
                console.log("happen 2");
            }
        }
        catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
            toast.error("Registration updation failed");
        }
        finally {
            setLoading(false);
        }
    };
    const filledFields = students.length;
    const progressPercentage = (filledFields / event?.maxStudents) * 100;
    const progressColor = filledFields === event?.maxStudents
        ? "bg-red-500"
        : filledFields >= event?.minStudents
            ? "bg-green-500"
            : "bg-yellow-500";
    return (_jsx(AnimatePresence, { children: _jsx(motion.div, { className: "mx-auto p-6 flex-1 max-w-[600px]  bg-white shadow-lg rounded-lg border ", initial: { y: 100, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: 100, opacity: 0 }, transition: { duration: 0.5 }, children: _jsxs("div", { className: "mx-auto p-6  rounded-lg  ", children: [_jsx("h2", { className: "text-3xl text-center font-bold mb-4 text-gray-800", children: event?.name }), _jsxs("div", { className: "flex text-sm justify-between my-2", children: [_jsxs("p", { className: "mb-2 text-gray-700", children: ["Min: ", _jsx("span", { className: "font-semibold", children: event?.minStudents })] }), _jsxs("p", { className: "mb-2 text-gray-700", children: ["Max: ", _jsx("span", { className: "font-semibold", children: event?.maxStudents })] })] }), _jsxs("div", { className: "w-full my-3 bg-gray-300 rounded-full h-3 mb-4 relative shadow-inner", children: [_jsx("div", { className: `h-3 ${progressColor} rounded-full transition-all shadow-md`, style: { width: `${progressPercentage}%` } }), _jsxs("span", { className: "absolute right-0 top-[-1.5rem] text-sm text-gray-700 font-medium", children: [filledFields, " / ", event?.maxStudents, " students"] })] }), _jsxs("div", { className: "flex flex-wrap bg-gray-100 rounded-lg p-3 shadow-md gap-2", children: [students.length === 0 && (_jsx("span", { className: "text-gray-600 text-sm", children: "No students added yet" })), students.map((student, index) => (_jsxs("div", { className: "bg-white flex items-center gap-4 border px-2 py-1 rounded-lg shadow-md transition-all hover:shadow-xl hover:border-gray-300 cursor-pointer", children: [_jsx("span", { className: "text-gray-900  text-md", children: student }), _jsx("button", { type: "button", onClick: () => handleRemoveStudent(index), className: "text-red-600 font-semibold hover:text-red-700 transition-colors border border-red-600 px-1 py-1 rounded-full", children: _jsx(AiOutlineClose, { size: 10 }) })] }, index)))] }), _jsxs("form", { onSubmit: (e) => handleAddStudent(e), className: "flex items-center gap-2 mt-4", children: [_jsx("input", { type: "text", value: newStudent, onChange: (e) => setNewStudent(e.target.value), disabled: filledFields === event?.maxStudents, placeholder: "Enter student name", className: "border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" }), _jsx("button", { type: "button", onClick: handleAddStudent, disabled: filledFields === event?.maxStudents, className: "bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition", children: _jsx(TiTick, {}) })] }), filledFields === event?.maxStudents && (_jsx("p", { className: "mt-4 text-center text-xs text-red-500 font-medium", children: "Maximum number of students reached" })), _jsx("button", { type: "submit", className: `${loading || (filledFields < event?.minStudents) ? "cursor-not-allowed opacity-50" : ""} bg-red-800 text-white p-2 rounded-md w-full mt-4 hover:bg-red-700 transition `, onClick: handleSubmit, disabled: loading || (filledFields < event?.minStudents), children: loading ? "Updating..." : "Update Registration" }), _jsx("div", { className: "flex justify-center", children: _jsx("button", { onClick: () => setRegisterEvent(null), className: " px-3 py-1 bg-gray-500 hover:bg-gray-400 text-white rounded-md text-lg m-3 mx-auto", children: "close" }) }), message && _jsx("p", { className: "mt-4 text-center text-red-500 font-medium", children: message })] }) }) }));
};
export default UpdateRegisterationForEvent;
