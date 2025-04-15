import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useData } from "../../../context/DataProviderContext";
import { motion } from "framer-motion";
import ModalWrapper from "../../../components/common/ModalWrapper";
import { Link } from "react-router-dom";
import { FaPlus, FaSpinner } from "react-icons/fa";
import UpdateEvent from "./UpdateEvent";
import { FaEdit } from "react-icons/fa";
import axiosInstance from "../../../config/axiosConfig";
const ViewEvents = () => {
    const events = useData().allEvents;
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("");
    const [partFilterType, setPartFilterType] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [updatedEvent, setUpdatedEvent] = useState(null);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);
    const [result, setResult] = useState(null);
    const [isResultLoading, setIsResultLoading] = useState(false);
    const { allClasses, fetchAllClasses } = useData();
    const [selectedResultEvent, setselectedResultEvent] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selected, setSelected] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    console.log({ allClasses });
    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            const response = await axiosInstance.post('/result/add', { eventId: selectedResultEvent?._id, result: [selected[0]._id, selected[1]._id, selected[2]._id] });
            if (response.data) {
                closeResultModal();
            }
        }
        catch (error) {
            console.log("error : ", error);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const [formData, setFormData] = useState({
        first: null,
        second: null,
        third: null,
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const closeResultModal = () => {
        setResult(null);
        setIsResultModalOpen(false);
        setFormData({ first: null, second: null, third: null });
        setInputValue("");
        setSelected([]);
        setselectedResultEvent(null);
    };
    const handleSelect = (value) => {
        if (selected.length < 3) {
            setSelected([...selected, value]);
            setInputValue("");
        }
    };
    const handleRemove = (value) => {
        setSelected(selected.filter((item) => item !== value));
    };
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);
    useEffect(() => {
        fetchAllClasses(0, 233, debouncedQuery);
    }, [debouncedQuery, 0, 233]);
    const filteredOptions = allClasses.filter((option) => option.name.toLowerCase().includes(inputValue.toLowerCase()) && selectedResultEvent?.type === option.type);
    // Filtered events based on search and type
    const filteredEvents = events.filter((event) => event.name.toLowerCase().includes(search.toLowerCase()) &&
        (filterType === "" || event.type === filterType) &&
        (partFilterType === "" || event.part_type === partFilterType));
    const fetchResult = async (eventId) => {
        try {
            setIsResultModalOpen(true);
            const response = await axiosInstance.get(`/result/get/${eventId}`, {
                params: {
                    year: new Date().getFullYear()
                }
            });
            if (response.data) {
                console.log("response.data :", response.data);
                if (response.data?.data?.result.length !== 0) {
                    setResult(response.data.data);
                    setSelected([response.data.data.result[0], response.data.data.result[1], response.data.data.result[2]]);
                }
            }
        }
        catch (error) {
            console.log("error : ", error);
        }
        finally {
            setIsResultLoading(false);
        }
    };
    const openResultModal = async (event) => {
        try {
            setIsResultLoading(true);
            setselectedResultEvent(event);
            await fetchResult(event._id);
        }
        catch (error) {
            console.log("error : ", error);
        }
    };
    useEffect(() => {
        console.log("Hello", events);
    }, [events]);
    const closeModal = () => {
        setUpdatedEvent(null);
        setSelectedEvent(null);
    };
    useEffect(() => {
        console.log("selectedEvent : ", selectedEvent);
        setOpenModal(selectedEvent ? true : false);
    }, [selectedEvent]);
    if (!updatedEvent) {
        return (_jsx(_Fragment, { children: _jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4 mb-6", children: [_jsx("input", { type: "text", placeholder: "Search event...", className: "w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-md", value: search, onChange: (e) => setSearch(e.target.value) }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("select", { className: "px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-md", value: filterType, onChange: (e) => setFilterType(e.target.value), children: [_jsx("option", { value: "", children: "All Types" }), _jsx("option", { value: "Junior", children: "Junior" }), _jsx("option", { value: "Senior", children: "Senior" })] }), _jsxs("select", { className: "px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-md", value: partFilterType, onChange: (e) => setPartFilterType(e.target.value), children: [_jsx("option", { value: "", children: "All Part" }), _jsx("option", { value: "Group", children: "Group" }), _jsx("option", { value: "Solo", children: "Solo" })] }), _jsx(Link, { to: `/user/dashboard/addEvent`, className: "text-white bg-[#9B1C1C] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-md", children: _jsxs("span", { className: "flex justify-center items-center", children: ["Add Event ", _jsx(FaPlus, {})] }) })] })] }), _jsx(motion.div, { layout: true, initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3 }, className: "bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 sm:gap-6 lg:gap-8", children: filteredEvents.map((event) => (_jsxs(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "bg-white/30 backdrop-blur-lg flex flex-col justify-between shadow-lg rounded-xl p-6 cursor-pointer transition duration-300 hover:shadow-xl border border-white/20 relative", children: [_jsx("span", { className: "absolute top-3 right-3", onClick: () => setUpdatedEvent(event), children: _jsx(FaEdit, { size: 18 }) }), _jsx("h2", { className: "text-2xl font-semibold text-gray-800", children: event
                                        .name }), _jsxs("p", { className: "text-gray-600 mt-2", children: [_jsx("strong", { children: "Type:" }), " ", event.type] }), _jsxs("p", { className: "text-gray-500 text-sm mt-2", children: [_jsx("strong", { children: "Description:" }), " ", event.description.substring(0, 30) + "..."] }), _jsxs("p", { className: "text-gray-500 text-sm mt-2", children: [_jsx("strong", { children: "Location:" }), " ", event.location] }), _jsxs("div", { className: "mt-4 flex justify-between items-center", children: [_jsx("button", { className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition", onClick: () => setSelectedEvent(event), children: "Details" }), _jsx("button", { className: "px-4 py-2 text-white rounded-lg bg-[#9B1C1C] transition", onClick: () => openResultModal(event), children: "Result" })] })] }, event._id))) }), _jsx(ModalWrapper, { open: openModal, setOpenModal: setOpenModal, children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3 }, className: "bg-white rounded-lg shadow-lg p-8 w-full max-w-lg text-gray-800", children: selectedEvent && (_jsxs(_Fragment, { children: [_jsx("h2", { className: "text-2xl font-bold", children: selectedEvent.name }), _jsxs("p", { className: "text-gray-700 mt-4", children: [_jsx("strong", { children: "Description:" }), " ", _jsx("br", {}), selectedEvent.description] }), _jsxs("p", { className: "text-gray-700 mt-4", children: [_jsx("strong", { children: "Part Type:" }), " ", selectedEvent.part_type] }), _jsx("p", { className: "text-gray-700 mt-4", children: _jsx("strong", { children: "Rules:" }) }), _jsx("ul", { className: "list-disc pl-6 text-gray-600", children: selectedEvent.rules.map((rule, index) => (_jsx("li", { children: rule }, index))) }), _jsxs("p", { className: "text-gray-700 mt-4", children: [_jsx("strong", { children: "Points:" }), " ", selectedEvent.points.join(", ")] }), _jsxs("div", { className: "mt-6 flex justify-end gap-4", children: [_jsx("button", { className: "px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition", onClick: () => setSelectedEvent(null), children: "Close" }), _jsx(Link, { to: `/events/${selectedEvent._id}`, className: "px-4 py-2  text-white rounded-lg bg-[#9B1C1C] transition", children: "Results" })] })] })) }) }), _jsx(ModalWrapper, { open: isResultModalOpen, setOpenModal: setIsResultModalOpen, children: _jsx("div", { className: "md:w-[80%] min-w-[300px] mx-auto p-6 bg-white shadow-lg rounded-lg", children: isResultLoading ?
                                _jsx("div", { className: "flex justify-center", children: _jsx(FaSpinner, { className: "animate-spin", size: 48 }) })
                                : _jsxs(_Fragment, { children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: result === null ? "Add Result" : "Update Result" }), _jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: selected.map((value, index) => (_jsxs("div", { className: "flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg", children: [_jsxs("span", { className: "capitalize", children: [index === 0 ? "First" : index === 1 ? "Second" : "Third", ": ", value.name] }), _jsx("button", { onClick: () => handleRemove(value), className: "text-red-600 hover:text-red-800", children: "\u2716" })] }, index))) }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", value: inputValue, onChange: (e) => setInputValue(e.target.value), placeholder: "Type to search...", className: "w-full p-2 border rounded-md" }), inputValue && filteredOptions.length > 0 && (_jsx("ul", { className: "absolute z-10 w-full bg-white border mt-1 shadow-lg rounded-md", children: filteredOptions.map((option) => (_jsx("li", { onClick: () => handleSelect(option), className: "p-2 hover:bg-gray-100 cursor-pointer", children: option?.name }, option._id))) }))] }), _jsxs("div", { className: "flex gap-4 flex-col md:flex-row mt-4", children: [_jsx("button", { onClick: closeResultModal, className: "w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition", children: "Cancel" }), _jsx("button", { disabled: selected.length !== 3, className: `w-full text-white py-2 rounded-md transition ${selected.length === 3 ? "bg-red-800 hover:bg-ed-700" : "bg-gray-400 cursor-not-allowed"}`, onClick: handleSubmit, children: isSubmitting ? "Submitting..." : "Submit" })] })] }) }) })] }) }));
    }
    else {
        return (_jsx(_Fragment, { children: _jsx(UpdateEvent, { event: updatedEvent, closeModal: closeModal }) }));
    }
};
export default ViewEvents;
