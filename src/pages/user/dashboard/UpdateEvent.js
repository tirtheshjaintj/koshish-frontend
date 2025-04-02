import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axiosInstance from "../../../config/axiosConfig";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useData } from "../../../context/DataProviderContext";
const UpdateEvent = ({ event, closeModal }) => {
    const [eventData, setEventData] = useState(event);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeletingEvent, setisDeletingEvent] = useState(false);
    const toggleIsDeletingEvent = () => setisDeletingEvent(!isDeletingEvent);
    const { fetchAllEvents } = useData();
    useEffect(() => {
        const pointValues = {
            Group: [15, 10, 6],
            Solo: [10, 6, 3],
            Other: [10, 6, 3],
        };
        setEventData((prev) => ({
            ...prev,
            points: pointValues[prev.part_type] || pointValues.Other,
        }));
    }, [eventData.part_type]);
    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };
    const handleRuleChange = (index, value) => {
        const updatedRules = [...eventData.rules];
        updatedRules[index] = value;
        setEventData({ ...eventData, rules: updatedRules });
    };
    const addRule = () => {
        setEventData({ ...eventData, rules: [...eventData.rules, ""] });
    };
    const removeRule = (index) => {
        if (eventData.rules.length > 1) {
            const updatedRules = eventData.rules.filter((_, i) => i !== index);
            setEventData({ ...eventData, rules: updatedRules });
        }
    };
    const deleteEvent = async () => {
        try {
            await axiosInstance.delete(`/event/delete/${eventData._id}`);
            fetchAllEvents();
            Swal.fire("Success", "Event deleted successfully!", "success");
            closeModal();
        }
        catch (error) {
            console.error("Error deleting event:", error);
            Swal.fire("Error", "Failed to delete event", "error");
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!eventData.name || !eventData.type || !eventData.part_type || !eventData.description || !eventData.location || !eventData.maxStudents || !eventData.minStudents) {
            return Swal.fire("Error", "Please fill all required fields!", "error");
        }
        if (eventData.description.trim().length < 10) {
            return Swal.fire("Error", "Description should be more than 10 characters!", "error");
        }
        if (parseInt(eventData.maxStudents) < parseInt(eventData.minStudents)) {
            return Swal.fire("Error", "Max Students should be greater than Min!", "error");
        }
        setIsLoading(true);
        try {
            await axiosInstance.put(`/event/update/${eventData._id}`, { ...eventData, rules: eventData.rules.filter(rule => rule.trim() !== "") });
            Swal.fire("Success", "Event updated successfully!", "success");
            closeModal();
        }
        catch (error) {
            console.error("Error updating event:", error);
            Swal.fire("Error", "Failed to update event", "error");
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs(motion.div, { className: "max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg", initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: [_jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsx("input", { name: "name", placeholder: "Event Name", value: eventData.name, onChange: handleChange, className: "w-full p-3 border rounded-lg", required: true }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("select", { name: "type", value: eventData.type, onChange: handleChange, className: "w-full p-3 border rounded-lg", required: true, children: [_jsx("option", { value: "Junior", children: "Junior" }), _jsx("option", { value: "Senior", children: "Senior" })] }), _jsxs("select", { name: "part_type", value: eventData.part_type, onChange: handleChange, className: "w-full p-3 border rounded-lg", required: true, children: [_jsx("option", { value: "Group", children: "Group" }), _jsx("option", { value: "Solo", children: "Solo" })] })] }), _jsx("textarea", { name: "description", rows: 5, placeholder: "Description", value: eventData.description, onChange: handleChange, className: "w-full p-3 border rounded-lg", required: true }), _jsxs("div", { children: [_jsx("label", { className: "block font-semibold", children: "Rules:" }), eventData.rules.map((rule, index) => (_jsxs("div", { className: "flex items-center space-x-3 mt-2", children: [_jsx("input", { type: "text", value: rule, onChange: (e) => handleRuleChange(index, e.target.value), className: "w-full p-3 border rounded-lg", required: true }), _jsx("button", { type: "button", onClick: () => removeRule(index), className: "bg-red-500 h-5 text-white px-3 py-1 rounded-md flex items-center", children: _jsx(FaMinus, {}) })] }, index))), _jsxs("button", { type: "button", onClick: addRule, className: "mt-3 bg-green-500 text-white px-3 py-2 rounded-lg flex items-center", children: [_jsx(FaPlus, {}), "\u00A0Rule"] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx("input", { name: "minStudents", type: "number", min: "1", placeholder: "Min Students", value: eventData.minStudents, onChange: handleChange, className: "w-full p-3 border rounded-lg", required: true }), _jsx("input", { name: "maxStudents", type: "number", min: "1", placeholder: "Max Students", value: eventData.maxStudents, onChange: handleChange, className: "w-full p-3 border rounded-lg", required: true })] }), _jsx("input", { name: "location", placeholder: "Location", value: eventData.location, onChange: handleChange, className: "w-full p-3 border rounded-lg", required: true })] }), _jsxs("div", { className: "flex gap-4 flex-col sm:flex-row", children: [_jsx(motion.button, { onClick: closeModal, className: "w-full bg-gray-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md flex justify-center items-center", whileTap: { scale: 0.95 }, disabled: isLoading, children: "Cancel" }), _jsx(motion.button, { onClick: handleSubmit, type: "submit", className: "w-full bg-red-800 hover:bg-red-700 text-white py-3 rounded-lg text-lg font-semibold shadow-md flex justify-center items-center", whileTap: { scale: 0.95 }, disabled: isLoading, children: isLoading ? _jsx(motion.div, { className: "w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }) : "Update Event" })] }), isDeletingEvent && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg text-center", children: [_jsx("p", { className: "text-lg font-semibold mb-4", children: "Do you want to delete this event?" }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx("button", { className: "px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700", onClick: deleteEvent, children: "Delete" }), _jsx("button", { className: "px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400", onClick: toggleIsDeletingEvent, children: "Cancel" })] })] }) }))] }));
};
export default UpdateEvent;
