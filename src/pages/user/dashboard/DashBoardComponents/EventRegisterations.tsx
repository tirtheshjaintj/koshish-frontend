import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../../config/axiosConfig';
import { EventData, Registration } from '../../../../context/DataProviderContext';





const EventRegistrations = () => {
    const { eventId } = useParams();
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
    const [event, setEvent] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [classFilter, setClassFilter] = useState('');

    useEffect(() => {
        const fetchEventRegistrations = async () => {
            try {
                const response = await axiosInstance.get(`/registrations/category/${eventId}`);
                if (response.data) {
                    console.log("first : " , response.data.registrations)
                    setRegistrations(response.data.registrations);
                    setFilteredRegistrations(response.data.registrations);
                    setEvent(response.data.event)
                }
            } catch (error) {
                setError('Failed to fetch registrations');
            } finally {
                setLoading(false);
            }
        };
        fetchEventRegistrations();
    }, [eventId]);

    const handleFilterChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        const selectedClass = e.target.value;
        setClassFilter(selectedClass);
        if (selectedClass) {
            const filteredRegistrations = registrations.filter((reg: Registration) => reg.classId?.name === selectedClass);
            setFilteredRegistrations(filteredRegistrations);

        } else {
            setFilteredRegistrations(registrations);
        }
    };

    return (
        <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
                {loading && "Loading..."}{event?.name} - {event?.type} </h1>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 border-b-2 border-gray-300 pb-2">
            Event Registrations
        </h2>
        
            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2">Filter:</label>
                        <select
                            className="border border-gray-300 p-2 rounded w-full"
                            value={classFilter}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Classes</option>
                            {[...new Set(registrations.map((reg : Registration)=> reg.classId?.name))].map(className => (
                                <option key={className} value={className}>{className}</option>
                            ))}
                        </select>
                    </div>

                    {filteredRegistrations.length === 0 ? (
                        <p className="text-gray-600">No registrations found</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-red-800 text-white">
                                        <th className="border border-gray-600 p-3 text-left">Class</th>
                                        <th className="border border-gray-600 p-3 text-left">Students</th>
                                        
                                        <th className="border border-gray-600 p-3 text-left">Attendance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRegistrations.map((registration : Registration)  => (
                                        <tr key={registration._id} className="border border-gray-300 odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300 transition">
                                            <td className="border border-gray-300 p-3">{registration.classId?.name}</td>
                                            <td className="border border-gray-300 p-3">{registration.students.join(', ')}</td>
                                            
                                            <td className="border border-gray-300 p-3">{registration.isPresent}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default EventRegistrations;