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
        return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white", children: [_jsx(motion.div, { initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8 }, className: "text-4xl font-bold", children: "Loading Results..." }), _jsx(motion.div, { initial: { rotate: 0 }, animate: { rotate: 360 }, transition: { repeat: Infinity, duration: 1 }, className: "mt-5 text-yellow-500 text-6xl", children: _jsx(BiTrophy, {}) })] }));
    }
    if (error && !eventDetails) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white", children: [_jsx("h2", { className: "text-3xl font-bold text-red-500", children: "Something went wrong!" }), _jsx("p", { className: "text-gray-300 mt-2", children: "Unable to fetch results. Please try again later." })] }));
    }
    return (_jsxs("div", { className: "flex flex-col  justify-between text-center py-10 items-center min-h-screen bg-gray-900 text-white", children: [_jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, children: [_jsxs("h1", { className: "text-4xl lg:text-5xl font-bold text-yellow-400", children: [eventDetails?.name || "Unknown Event", _jsx("select", { className: "bg-transparent text-4xl lg:text-5xl  ml-2 border-none outline-none text-yellow-400", value: year, onChange: (e) => setYear(Number(e.target.value)), children: [...Array(10)].map((_, index) => {
                                    const y = new Date().getFullYear() - index;
                                    return _jsx("option", { value: y, children: y }, y);
                                }) })] }), _jsx("p", { className: "text-gray-300 text-xl font-bold mt-2", children: eventDetails && `${eventDetails.type} | ${eventDetails.location} | ${eventDetails.part_type}` })] }), _jsx(motion.h2, { className: "text-2xl font-bold text-yellow-400", initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.5, duration: 0.8 }, children: result.length > 0 ? "🎉 Results Declared! 🎉" : "Results To be Declared 🏆" }), result.length > 0 ? (_jsxs(motion.div, { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, className: "flex items-end justify-center pt-10", children: [_jsxs(motion.div, { initial: { y: 50, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.2, duration: 0.8 }, className: "flex flex-col items-center", children: [_jsx("span", { className: "text-xl lg:text-2xl font-semibold mb-2", children: result[1].name || "N/A" }), _jsx("div", { className: "w-28 h-40 lg:w-52 lg:h-60 bg-gray-400 rounded-t-lg flex items-center justify-center text-5xl lg:text-7xl font-bold shadow-lg", children: "\uD83E\uDD48" }), _jsxs("p", { className: "text-gray-300 font-bold mt-2", children: [eventDetails?.points[1] || "N/A", " Points"] })] }), _jsxs(motion.div, { initial: { y: 70, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.4, duration: 0.8 }, className: "flex flex-col items-center", children: [_jsx("span", { className: "text-xl lg:text-3xl font-semibold mb-2 text-yellow-300", children: result[0].name || "N/A" }), _jsx("div", { className: "w-32 h-52 lg:w-72 lg:h-80 bg-yellow-500 rounded-t-lg flex items-center justify-center text-6xl lg:text-8xl font-bold shadow-lg", children: "\uD83E\uDD47" }), _jsxs("p", { className: "text-gray-300 font-bold mt-2", children: [eventDetails?.points[0] || "N/A", " Points"] })] }), _jsxs(motion.div, { initial: { y: 50, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.6, duration: 0.8 }, className: "flex flex-col items-center", children: [_jsx("span", { className: "text-xl lg:text-2xl font-semibold mb-2", children: result[2].name || "N/A" }), _jsx("div", { className: "w-28 h-36 lg:w-52 lg:h-60 bg-orange-700 rounded-t-lg flex items-center justify-center text-5xl lg:text-7xl font-bold shadow-lg", children: "\uD83E\uDD49" }), _jsxs("p", { className: "text-gray-300 font-bold mt-2", children: [eventDetails?.points[2] || "N/A", " Points"] })] })] })) : (_jsx("p", { className: "text-gray-400 text-lg", children: "No results available" }))] }));
}
export default EventResult;
