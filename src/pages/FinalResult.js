import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import Nav from "../components/home/StaticNavbar";
const currentYear = new Date().getFullYear();
function FinalResult() {
    const [year, setYear] = useState(currentYear);
    const [type, setType] = useState("Junior");
    const [results, setResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        axiosInstance
            .get(`/result/finalResult?year=${year}&type=${type}`)
            .then((response) => {
            setResults(response.data.topClasses);
        })
            .catch((error) => console.error("Error fetching results:", error))
            .finally(() => setLoading(false));
    }, [year, type]);
    const filteredTableResults = results.filter((result) => result.name.toLowerCase().includes(searchQuery.toLowerCase()));
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(Nav, {}), _jsxs("div", { className: "p-6 bg-gray-50 min-h-screen", children: [_jsxs(motion.h1, { className: "text-4xl font-bold text-center mb-8 text-indigo-600", initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: ["PCTE Koshish ", year, " Result - ", type, " Wing"] }), _jsxs("div", { className: "flex flex-col md:flex-row items-center gap-4 mb-6 justify-center", children: [_jsx("select", { className: "px-4 py-2 border rounded-md bg-white shadow", value: year, onChange: (e) => setYear(Number(e.target.value)), children: Array.from({ length: 5 }, (_, i) => currentYear - i).map((y) => (_jsx("option", { value: y, children: y }, y))) }), _jsxs("select", { className: "px-4 py-2 border rounded-md bg-white shadow", value: type, onChange: (e) => setType(e.target.value), children: [_jsx("option", { value: "Junior", children: "Junior" }), _jsx("option", { value: "Senior", children: "Senior" })] })] }), _jsxs("div", { className: "bg-white p-3 rounded-lg shadow-md mb-6", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Top 10 Classes" }), loading ? (_jsx("div", { className: "w-full h-64 bg-gray-200 animate-pulse rounded-md" })) : (_jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: results.slice(0, 10), children: [_jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Bar, { dataKey: "totalPoints", fill: "#4F46E5" })] }) }))] }), _jsx("div", { className: "flex justify-center mb-4", children: _jsx("input", { className: "px-4 py-2 border rounded-md shadow w-full md:w-1/3", placeholder: "Search class...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) }) }), _jsxs("div", { className: "p-6 bg-white rounded-lg shadow-md", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Final Results" }), _jsx("div", { className: "overflow-x-auto", children: loading ? (_jsx("div", { className: "space-y-3", children: [...Array(5)].map((_, i) => (_jsx("div", { className: "h-10 bg-gray-200 animate-pulse rounded-md" }, i))) })) : (_jsxs("table", { className: "w-full border-collapse border border-gray-300 text-center", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-200 text-gray-700", children: [_jsx("th", { className: "border px-4 py-2", children: "Rank" }), _jsx("th", { className: "border px-4 py-2", children: "Class" }), _jsx("th", { className: "border px-4 py-2", children: "Points" })] }) }), _jsx("tbody", { children: filteredTableResults.map((result, index) => (_jsxs("tr", { className: "odd:bg-gray-100 even:bg-white", children: [_jsx("td", { className: "border px-4 py-2", children: index + 1 }), _jsx("td", { className: "border px-4 py-2", children: result.name }), _jsx("td", { className: "border px-4 py-2", children: result.totalPoints })] }, result._id))) })] })) })] })] })] }));
}
export default FinalResult;
