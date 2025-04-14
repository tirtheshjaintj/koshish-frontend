import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ModalWrapper from "../../../../components/common/ModalWrapper";
import axiosInstance from "../../../../config/axiosConfig.ts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AllEvents = () => {
    // const events = useData().allEvents;
    const [events, setevents] = useState([]);
    const [search, setSearch] = useState("");
    const [partFilterType, setPartFilterType] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openRegisterModal, setopenRegisterModal] = useState(false);
    const [openUpdateRegiter, setopenUpdateRegiter] = useState(false);
    const [updatingEvent, setupdatingEvent] = useState(null);
    const [registerEvent, setRegisterEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const fetchEvents = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance(`/event/`);
            if (response.data) {
                console.log("Data : ", response.data);
                setevents(response.data.events);
            }
        }
        catch (error) {
            console.log("error : ", error);
        }
        finally {
            setIsLoading(false);
        }
    };
    // Filtered events based on search and type
    const filteredEvents = events.filter((event) => event.name.toLowerCase().includes(search.toLowerCase()) &&
        // (filterType === "" || event.type === filterType) &&
        (partFilterType === "" || event.part_type === partFilterType) &&
        (typeFilter === "" ||
            (typeFilter === "Senior" && event.type === "Senior") ||
            (typeFilter === "Junior" && event.type === "Junior")));
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
        if (user) {
            fetchEvents();
        }
    }, [user]);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "flex flex-col items-center justify-between gap-4 mb-6 md:flex-row", children: [_jsx("input", { type: "text", placeholder: "Search event...", className: "w-full px-4 py-3 transition border border-gray-300 rounded-lg shadow-md md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500", value: search, onChange: (e) => setSearch(e.target.value) }), _jsxs("div", { className: "flex gap-1 flex-wrap justify-center", children: [_jsxs("select", { className: "px-4 py-3 transition border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500", value: partFilterType, onChange: (e) => setPartFilterType(e.target.value), children: [_jsx("option", { value: "", children: "All Part" }), _jsx("option", { value: "Group", children: "Group" }), _jsx("option", { value: "Solo", children: "Solo" })] }), _jsxs("select", { className: "px-4 py-3 transition border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500", value: typeFilter, onChange: (e) => setTypeFilter(e.target.value), children: [_jsx("option", { value: "", children: "All Events" }), _jsx("option", { value: "Senior", children: "Senior" }), _jsx("option", { value: "Junior", children: "Junior" })] })] })] }), isLoading ? _jsx(_Fragment, { children: _jsx("div", { className: "flex justify-center items-center h-screen", children: _jsx("div", { className: "animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900" }) }) }) : _jsx(_Fragment, { children: _jsx(motion.div, { layout: true, className: "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredEvents.map((event) => (_jsx(motion.div, { layout: true, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "relative p-4 transition flex flex-col h-full duration-300 border shadow-lg cursor-pointer bg-white/30 backdrop-blur-lg rounded-xl hover:shadow-xl border-white/20", children: _jsxs("div", { className: "bg-white shadow-lg rounded-lg p-5 w-full border border-gray-200 flex flex-col min-h-[300px] h-full", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("h2", { className: "text-lg sm:text-xl font-semibold text-gray-900", children: event.name }), _jsx("span", { className: "bg-red-800 text-white text-xs sm:text-sm px-3 py-1 rounded-md", children: event.type })] }), _jsxs("div", { className: "flex flex-wrap gap-2 mb-3", children: [_jsx("span", { className: "bg-gray-200 text-gray-900 text-xs sm:text-sm px-3 py-1 rounded-md", children: event.part_type }), _jsxs("span", { className: "bg-gray-200 text-gray-900 text-xs sm:text-sm px-3 py-1 rounded-md", children: [event.minStudents, " - ", event.maxStudents, " Students"] })] }), _jsxs("p", { className: "text-gray-900 font-medium", children: [_jsx("span", { className: "text-gray-500", children: "Location:" }), " ", event.location] }), _jsxs("p", { className: "text-gray-900 font-medium", children: [_jsx("span", { className: "text-gray-500", children: "Points:" }), " ", event.points.join(", ")] }), _jsxs("div", { className: "flex flex-wrap justify-between mt-auto gap-2", children: [_jsx("button", { className: "border border-red-800 text-red-900 px-4 py-2 rounded-md hover:bg-red-50 w-full sm:w-auto", onClick: () => setSelectedEvent(event), children: "Details" }), _jsx("button", { onClick: () => navigate(`/user/dashboard/category/${event._id}`), className: "bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full sm:w-auto", children: "Registrations" })] })] }) }, event._id))) }) }), _jsx(ModalWrapper, { open: openModal, setOpenModal: setOpenModal, children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3 }, className: "w-full max-w-lg p-8 min-w-[60%] text-gray-800 bg-white rounded-lg shadow-lg", children: selectedEvent && (_jsxs(_Fragment, { children: [_jsx("h2", { className: "text-2xl font-bold", children: selectedEvent?.name }), _jsxs("p", { className: "mt-4 text-gray-700", children: [_jsx("strong", { children: "Description:" }), " ", _jsx("br", {}), selectedEvent?.description] }), _jsxs("p", { className: "mt-4 text-gray-700", children: [_jsx("strong", { children: "Part Type:" }), " ", selectedEvent.part_type] }), _jsx("p", { className: "mt-4 text-gray-700", children: _jsx("strong", { children: "Rules:" }) }), _jsx("ul", { className: "pl-6 text-gray-600 list-disc", children: selectedEvent.rules.map((rule, index) => (_jsx("li", { children: rule }, index))) }), _jsxs("p", { className: "mt-4 text-gray-700", children: [_jsx("strong", { children: "Points:" }), " ", selectedEvent.points.join(", ")] }), _jsx("div", { className: "flex justify-end gap-4 mt-6", children: _jsx("button", { className: "px-4 py-2 text-white transition bg-gray-500 rounded-lg hover:bg-gray-600", onClick: () => setSelectedEvent(null), children: "Close" }) })] })) }) })] }) }));
};
export default AllEvents;
