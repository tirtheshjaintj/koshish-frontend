import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../../config/axiosConfig';
const EventRegistrations = () => {
    const { eventId } = useParams();
    const [registrations, setRegistrations] = useState([]);
    const [filteredRegistrations, setFilteredRegistrations] = useState([]);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [classFilter, setClassFilter] = useState('');
    useEffect(() => {
        const fetchEventRegistrations = async () => {
            try {
                const response = await axiosInstance.get(`/registrations/category/${eventId}`);
                if (response.data) {
                    console.log("first : ", response.data.registrations);
                    setRegistrations(response.data.registrations);
                    setFilteredRegistrations(response.data.registrations);
                    setEvent(response.data.event);
                }
            }
            catch (error) {
                setError('Failed to fetch registrations');
            }
            finally {
                setLoading(false);
            }
        };
        fetchEventRegistrations();
    }, [eventId]);
    const handleFilterChange = (e) => {
        const selectedClass = e.target.value;
        setClassFilter(selectedClass);
        if (selectedClass) {
            const filteredRegistrations = registrations.filter((reg) => reg.classId?.name === selectedClass);
            setFilteredRegistrations(filteredRegistrations);
        }
        else {
            setFilteredRegistrations(registrations);
        }
    };
    return (_jsxs("div", { className: "bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto", children: [_jsxs("h1", { className: "text-4xl font-bold mb-4 text-gray-900", children: [loading && "Loading...", event?.name, " - ", event?.type, " "] }), _jsx("h2", { className: "text-2xl font-semibold mb-6 text-gray-700 border-b-2 border-gray-300 pb-2", children: "Event Registrations" }), loading ? (_jsx("p", { className: "text-gray-600", children: "Loading..." })) : error ? (_jsx("p", { className: "text-red-500", children: error })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-lg font-medium mb-2", children: "Filter:" }), _jsxs("select", { className: "border border-gray-300 p-2 rounded w-full", value: classFilter, onChange: handleFilterChange, children: [_jsx("option", { value: "", children: "All Classes" }), [...new Set(registrations.map((reg) => reg.classId?.name))].map(className => (_jsx("option", { value: className, children: className }, className)))] })] }), filteredRegistrations.length === 0 ? (_jsx("p", { className: "text-gray-600", children: "No registrations found" })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-red-800 text-white", children: [_jsx("th", { className: "border border-gray-600 p-3 text-left", children: "Class" }), _jsx("th", { className: "border border-gray-600 p-3 text-left", children: "Students" })] }) }), _jsx("tbody", { children: filteredRegistrations.map((registration) => (_jsxs("tr", { className: "border border-gray-300 odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300 transition", children: [_jsx("td", { className: "border border-gray-300 p-3", children: registration.classId?.name }), _jsx("td", { className: "border border-gray-300 p-3", children: registration.students.join(', ') })] }, registration._id))) })] }) }))] }))] }));
};
export default EventRegistrations;
