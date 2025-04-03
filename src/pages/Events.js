import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useData } from "../context/DataProviderContext";
import { motion } from "framer-motion";
import ModalWrapper from "../components/common/ModalWrapper";
import { Link } from "react-router-dom";
import UpcomingCard from "../components/home/Upcoming/UpcomingCard";
import Nav from "../components/home/StaticNavbar";
const Events = () => {
    const events = useData().allEvents;
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("");
    const [partFilterType, setPartFilterType] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    // Filtered events based on search and type
    const filteredEvents = events.filter((event) => event.name.toLowerCase().includes(search.toLowerCase()) &&
        (filterType === "" || event.type === filterType) &&
        (partFilterType === "" || event.part_type === partFilterType));
    useEffect(() => {
        setOpenModal(selectedEvent ? true : false);
    }, [selectedEvent]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(Nav, {}), _jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "flex flex-col justify-between md:flex-row items-center gap-4 mb-6", children: [_jsx("input", { type: "text", placeholder: "Search event...", className: "w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-md", value: search, onChange: (e) => setSearch(e.target.value) }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("select", { className: "px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-md", value: filterType, onChange: (e) => setFilterType(e.target.value), children: [_jsx("option", { value: "", children: "All Types" }), _jsx("option", { value: "Junior", children: "Junior" }), _jsx("option", { value: "Senior", children: "Senior" })] }), _jsxs("select", { className: "px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-md", value: partFilterType, onChange: (e) => setPartFilterType(e.target.value), children: [_jsx("option", { value: "", children: "All Part" }), _jsx("option", { value: "Group", children: "Group" }), _jsx("option", { value: "Solo", children: "Solo" })] })] })] }), _jsx(motion.div, { layout: true, className: "grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3", children: filteredEvents.map((event) => (_jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(UpcomingCard, { value: event, openDetailsHandler: setSelectedEvent }) }, event._id))) }), _jsx(ModalWrapper, { open: openModal, setOpenModal: setOpenModal, children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3 }, className: "bg-white rounded-lg flex flex-col min-w-[60%] shadow-lg p-8  max-w-lg text-gray-800", children: selectedEvent && (_jsxs(_Fragment, { children: [_jsx("h2", { className: "text-2xl font-bold", children: selectedEvent.name }), _jsxs("p", { className: "text-gray-700 mt-4", children: [_jsx("strong", { children: "Description:" }), " ", _jsx("br", {}), selectedEvent.description] }), _jsxs("p", { className: "text-gray-700 mt-4", children: [_jsx("strong", { children: "Part Type:" }), " ", selectedEvent.part_type] }), _jsx("p", { className: "text-gray-700 mt-4", children: _jsx("strong", { children: "Rules:" }) }), _jsx("ul", { className: "list-disc pl-6 text-gray-600", children: selectedEvent.rules.map((rule, index) => (_jsx("li", { children: rule }, index))) }), _jsxs("p", { className: "text-gray-700 mt-4", children: [_jsx("strong", { children: "Points:" }), " ", selectedEvent.points.join(", ")] }), _jsxs("div", { className: "mt-6 flex justify-end gap-4", children: [_jsx("button", { className: "px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition", onClick: () => setSelectedEvent(null), children: "Close" }), _jsx(Link, { to: `/events/${selectedEvent._id}`, className: "px-4 py-2  text-white rounded-lg bg-[#9B1C1C] transition", children: "Results" })] })] })) }) })] })] }));
};
export default Events;
