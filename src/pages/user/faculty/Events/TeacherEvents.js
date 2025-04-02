import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ModalWrapper from "../../../../components/common/ModalWrapper";
import RegisterForEvent from "../../dashboard/DashBoardComponents/RegisterForEvent.tsx";
import UpdateRegisterationForEvent from "../../dashboard/DashBoardComponents/UpdateRegisterations.tsx";
import axiosInstance from "../../../../config/axiosConfig.ts";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Events = () => {
    const [events, setevents] = useState([]);
    const [search, setSearch] = useState("");
    const [partFilterType, setPartFilterType] = useState("");
    const [registerFilter, setregisterFilter] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openRegisterModal, setopenRegisterModal] = useState(false);
    const [openUpdateRegiter, setopenUpdateRegiter] = useState(false);
    const [updatingEvent, setupdatingEvent] = useState(null);
    const [registerEvent, setRegisterEvent] = useState(null);
    const user = useSelector((state) => state.user);
    const fetchEvents = async () => {
        try {
            const response = await axiosInstance(`/event/class`);
            if (response.data) {
                setevents(response.data.result);
            }
        }
        catch (error) {
            console.log("error : ", error);
        }
    };
    // Filtered events based on search and type
    const filteredEvents = events.filter((event) => event.name.toLowerCase().includes(search.toLowerCase()) &&
        // (filterType === "" || event.type === filterType) &&
        (partFilterType === "" || event.part_type === partFilterType) &&
        (registerFilter === "" ||
            (registerFilter === "registered" && event.register !== null) ||
            (registerFilter === "unregistered" && event.register === null)));
    useEffect(() => {
        console.log("Hello", events);
    }, [events]);
    useEffect(() => {
        setOpenModal(selectedEvent ? true : false);
    }, [selectedEvent]);
    useEffect(() => {
        setopenRegisterModal(registerEvent ? true : false);
    }, [registerEvent]);
    useEffect(() => {
        setopenUpdateRegiter(updatingEvent ? true : false);
    }, [updatingEvent]);
    useEffect(() => {
        if (!user)
            return;
        fetchEvents();
    }, [user]);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "flex flex-col items-center justify-between gap-4 mb-6 md:flex-row", children: [_jsx("input", { type: "text", placeholder: "Search event...", className: "w-full px-4 py-3 transition border  border-gray-300 rounded-lg shadow-md md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500", value: search, onChange: (e) => setSearch(e.target.value) }), _jsxs("div", { className: "flex gap-1 flex-wrap justify-center", children: [_jsxs("select", { className: "px-4 py-3 transition border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500", value: partFilterType, onChange: (e) => setPartFilterType(e.target.value), children: [_jsx("option", { value: "", children: "All Part" }), _jsx("option", { value: "Group", children: "Group" }), _jsx("option", { value: "Solo", children: "Solo" })] }), _jsxs("select", { className: "px-4 py-3 transition border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500", value: registerFilter, onChange: (e) => setregisterFilter(e.target.value), children: [_jsx("option", { value: "", children: "All Events" }), _jsx("option", { value: "registered", children: "Registered" }), _jsx("option", { value: "unregistered", children: "Unregistered" })] })] })] }), _jsx(motion.div, { layout: true, className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3", children: filteredEvents.map((event) => (_jsxs(motion.div, { layout: true, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "bg-white/30 backdrop-blur-lg flex flex-col justify-between shadow-lg rounded-xl p-6 cursor-pointer transition duration-300 hover:shadow-xl border border-white/20 relative", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-800", children: event.name }), _jsxs("p", { className: "mt-2 text-gray-600", children: [_jsx("strong", { children: "Type:" }), " ", event.type] }), _jsxs("p", { className: "mt-2 text-sm text-gray-500", children: [_jsx("strong", { children: "Location:" }), " ", event.location] }), _jsxs("div", { className: "flex items-center justify-between mt-4", children: [_jsx("button", { className: "px-4 py-2 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600", onClick: () => setSelectedEvent(event), children: "Details" }), event.register !== null ? _jsx(_Fragment, { children: _jsx("button", { className: "px-4 py-2 bg-[#9B1C1C] text-white rounded-lg  transition", onClick: () => setupdatingEvent(event), children: "Update" }) }) : _jsx(_Fragment, { children: _jsx("button", { className: "px-4 py-2 bg-[#9B1C1C] text-white rounded-lg  transition", onClick: () => setRegisterEvent(event), children: "Register" }) })] })] }, event._id))) }), _jsx(ModalWrapper, { open: openModal, setOpenModal: setOpenModal, children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3 }, className: "w-full max-w-lg p-8 min-w-[60%] text-gray-800 bg-white rounded-lg shadow-lg", children: selectedEvent && (_jsxs(_Fragment, { children: [_jsx("h2", { className: "text-2xl font-bold", children: selectedEvent?.name }), _jsxs("p", { className: "mt-4 text-gray-700", children: [_jsx("strong", { children: "Description:" }), " ", _jsx("br", {}), selectedEvent?.description] }), _jsxs("p", { className: "mt-4 text-gray-700", children: [_jsx("strong", { children: "Part Type:" }), " ", selectedEvent.part_type] }), _jsx("p", { className: "mt-4 text-gray-700", children: _jsx("strong", { children: "Rules:" }) }), _jsx("ul", { className: "pl-6 text-gray-600 list-disc", children: selectedEvent.rules.map((rule, index) => (_jsx("li", { children: rule }, index))) }), _jsxs("p", { className: "mt-4 text-gray-700", children: [_jsx("strong", { children: "Points:" }), " ", selectedEvent.points.join(", ")] }), _jsxs("div", { className: "flex justify-end gap-4 mt-6", children: [_jsx("button", { className: "px-4 py-2 text-white transition bg-gray-500 rounded-lg hover:bg-gray-600", onClick: () => setSelectedEvent(null), children: "Close" }), _jsx(Link, { to: `/events/${selectedEvent._id}`, className: "px-4 py-2 text-white transition bg-green-500 rounded-lg hover:bg-green-600", children: "Results" })] })] })) }) }), _jsx(ModalWrapper, { open: openRegisterModal, setOpenModal: setopenRegisterModal, children: _jsx(RegisterForEvent, { setRegisterEvent: setRegisterEvent, event: registerEvent, fetchAllEvents: fetchEvents }) }), _jsx(ModalWrapper, { open: openUpdateRegiter, setOpenModal: setopenUpdateRegiter, children: _jsx(UpdateRegisterationForEvent, { setRegisterEvent: setupdatingEvent, event: updatingEvent, fetchAllEvents: fetchEvents }) })] }) }));
};
export default Events;
