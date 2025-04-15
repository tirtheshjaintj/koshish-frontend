import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ArrowRight } from "lucide-react";
import UpcomingCard from "./UpcomingCard";
import { Link } from "react-router-dom";
import { useData } from "../../../context/DataProviderContext";
import { useEffect, useState } from "react";
import ModalWrapper from "../../common/ModalWrapper";
import { motion } from "framer-motion";
export default function Upcomings() {
    const [openModal, setOpenModal] = useState(false);
    const { allEvents } = useData();
    const [selectedEvent, setSelectedEvent] = useState(null);
    useEffect(() => {
        setOpenModal(selectedEvent ? true : false);
    }, [selectedEvent]);
    return (_jsxs("section", { className: "relative z-10 px-4 py-10 mt-15 lg:px-20", style: { scrollbarWidth: "none" }, children: [_jsxs("h2", { className: "w-full text-2xl font-bold md:text-4xl text-blue-prime font-poppins md:text-center", children: ["Upcoming", _jsx("span", { className: "text-[#9B1C1C]", children: " Special " }), "Events"] }), _jsxs("div", { className: "flex flex-wrap items-center justify-start gap-4 mt-2 text-xl text-light-gray max-sm:hidden", children: [_jsx("p", { children: "Participate in Events of Koshish, Win prizes and Extra internals" }), _jsxs(Link, { to: "/events", className: "flex items-center gap-1 font-medium text-purple-600 hover:text-pink-600", children: ["View All Events ", _jsx(ArrowRight, {})] })] }), _jsx("div", { className: "flex items-center gap-6 py-4 scrollbar-hidden max-md:flex-wrap lg:px-2 max-md:justify-center md:mt-6 md:overflow-x-auto", style: { scrollbarWidth: "none" }, children: allEvents?.slice(0, 4).map((item) => {
                    return _jsx(UpcomingCard, { value: item, openDetailsHandler: setSelectedEvent }, item._id);
                }) }), _jsxs(Link, { to: "/events", className: "flex items-center justify-center gap-1 mx-auto mt-6 font-bold text-pink-700 md:hidden", children: ["View All Events ", _jsx(ArrowRight, {})] }), _jsx(ModalWrapper, { open: openModal, setOpenModal: setOpenModal, children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3 }, className: "bg-white rounded-lg flex flex-col min-w-[60%] shadow-lg p-8  max-w-lg text-gray-800", children: selectedEvent && (_jsxs(_Fragment, { children: [_jsx("h2", { className: "text-2xl font-bold", children: selectedEvent.name }), _jsxs("p", { className: "mt-4 text-gray-700", children: [_jsx("strong", { children: "Description:" }), " ", _jsx("br", {}), selectedEvent.description] }), _jsxs("p", { className: "mt-4 text-gray-700", children: [_jsx("strong", { children: "Part Type:" }), " ", selectedEvent.part_type] }), _jsx("p", { className: "mt-4 text-gray-700", children: _jsx("strong", { children: "Rules:" }) }), _jsx("ul", { className: "pl-6 text-gray-600 list-disc", children: selectedEvent.rules.map((rule, index) => (_jsx("li", { children: rule }, index))) }), _jsxs("p", { className: "mt-4 text-gray-700", children: [_jsx("strong", { children: "Points:" }), " ", selectedEvent.points.join(", ")] }), _jsxs("div", { className: "flex justify-end gap-4 mt-6", children: [_jsx("button", { className: "px-4 py-2 text-white transition bg-gray-500 rounded-lg hover:bg-gray-600", onClick: () => setSelectedEvent(null), children: "Close" }), _jsx(Link, { to: `/events/${selectedEvent._id}`, className: "px-4 py-2  text-white rounded-lg bg-[#9B1C1C] transition", children: "Results" })] })] })) }) })] }));
}
