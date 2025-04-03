import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../config/axiosConfig";
import { useParams } from "react-router-dom";
import { BiTrophy } from "react-icons/bi";
import { useData } from "../context/DataProviderContext";
function EventResult() {
    const [eventDetails, setEventDetails] = useState(null);
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { event_id } = useParams();
    const [year, setYear] = useState(new Date().getFullYear());
    const events = useData().allEvents;
    const fetchEventResult = async (selectedYear) => {
        try {
            const response = await axiosInstance.get(`/result/get/${event_id}?year=${selectedYear}`);
            console.log(response.data);
            if (response.data?.success) {
                setEventDetails(response.data.data.eventId);
                setResult(response.data.data.result);
                document.title = `${response.data.data.eventId.name} - Results`;
            }
            else {
                setResult([]);
            }
        }
        catch (error) {
            setError(true);
            setResult([]);
            const eventFromList = events.find((event) => event._id === event_id);
            if (eventFromList) {
                setEventDetails(eventFromList);
            }
            else {
                setEventDetails(error.response.data?.event);
            }
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchEventResult(year);
    }, [year]);
    if (loading) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen text-white bg-gray-900", children: [_jsx(motion.div, { initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8 }, className: "text-4xl font-bold", children: "Loading Results..." }), _jsx(motion.div, { initial: { rotate: 0 }, animate: { rotate: 360 }, transition: { repeat: Infinity, duration: 1 }, className: "mt-5 text-6xl text-yellow-500", children: _jsx(BiTrophy, {}) })] }));
    }
    if (error && !eventDetails) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen text-white bg-gray-900", children: [_jsx("h2", { className: "text-3xl font-bold text-red-500", children: "Something went wrong!" }), _jsx("p", { className: "mt-2 text-gray-300", children: "Unable to fetch results. Please try again later." })] }));
    }
    return (_jsxs("div", { className: "flex flex-col items-center justify-between min-h-screen py-10 text-center text-white bg-gray-900", children: [_jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, children: [_jsxs("h1", { className: "text-4xl font-bold text-yellow-400 lg:text-5xl", children: [eventDetails?.name || "Unknown Event", _jsx("select", { className: "ml-2 text-4xl text-yellow-400 bg-transparent border-none outline-none lg:text-5xl", value: year, onChange: (e) => setYear(Number(e.target.value)), children: [...Array(10)].map((_, index) => {
                                    const y = new Date().getFullYear() - index;
                                    return _jsx("option", { value: y, children: y }, y);
                                }) })] }), _jsx("p", { className: "mt-2 text-xl font-bold text-gray-300", children: eventDetails && `${eventDetails.type} | ${eventDetails.location} | ${eventDetails.part_type}` })] }), _jsx(motion.h2, { className: "text-2xl font-bold text-yellow-400", initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.5, duration: 0.8 }, children: result.length > 0 ? "🎉 Results Declared! 🎉" : "Results To be Declared 🏆" }), result.length > 0 ? (_jsxs(motion.div, { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, className: "flex items-end justify-center pt-10", children: [_jsxs(motion.div, { initial: { y: 50, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.2, duration: 0.8 }, className: "flex flex-col items-center", children: [_jsx("span", { className: "mb-2 text-xl font-semibold lg:text-2xl", children: result[1].name || "N/A" }), _jsx("div", { className: "flex items-center justify-center h-40 text-5xl font-bold bg-gray-400 rounded-t-lg shadow-lg w-28 lg:w-52 lg:h-60 lg:text-7xl", children: "\uD83E\uDD48" }), _jsxs("p", { className: "mt-2 font-bold text-gray-300", children: [eventDetails?.points[1] || "N/A", " Points"] })] }), _jsxs(motion.div, { initial: { y: 70, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.4, duration: 0.8 }, className: "flex flex-col items-center", children: [_jsx("span", { className: "mb-2 text-xl font-semibold text-yellow-300 lg:text-3xl", children: result[0].name || "N/A" }), _jsx("div", { className: "flex items-center justify-center w-32 text-6xl font-bold bg-yellow-500 rounded-t-lg shadow-lg h-52 lg:w-72 lg:h-80 lg:text-8xl", children: "\uD83E\uDD47" }), _jsxs("p", { className: "mt-2 font-bold text-gray-300", children: [eventDetails?.points[0] || "N/A", " Points"] })] }), _jsxs(motion.div, { initial: { y: 50, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.6, duration: 0.8 }, className: "flex flex-col items-center", children: [_jsx("span", { className: "mb-2 text-xl font-semibold lg:text-2xl", children: result[2].name || "N/A" }), _jsx("div", { className: "flex items-center justify-center text-5xl font-bold bg-orange-700 rounded-t-lg shadow-lg w-28 h-36 lg:w-52 lg:h-60 lg:text-7xl", children: "\uD83E\uDD49" }), _jsxs("p", { className: "mt-2 font-bold text-gray-300", children: [eventDetails?.points[2] || "N/A", " Points"] })] })] })) : (_jsx("p", { className: "text-lg text-gray-400", children: "No results available" }))] }));
}
export default EventResult;
