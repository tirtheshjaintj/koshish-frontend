import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState, } from "react";
import axiosInstance from "../config/axiosConfig";
import { useSelector } from "react-redux";
const DataContext = createContext(null);
export const DataProvider = ({ children }) => {
    const user = useSelector((state) => state.user);
    const [faculties, setFaculties] = useState([]);
    const [allRegisterations, setAllRegisterations] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [classRegisterations, setClassRegisterations] = useState([]);
    const [allClasses, setAllClasses] = useState([]);
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchAllFaculties = async () => {
        try {
            const response = await axiosInstance.get("/user/getFaculty");
            if (response.data.status) {
                setFaculties(response.data.data || []);
            }
        }
        catch (error) {
            console.error("Error fetching faculties:", error);
        }
    };
    const fetchClassRegisterations = async () => {
        try {
            const response = await axiosInstance.get("/registrations/classRegistrations");
            if (response?.data?.status) {
                setClassRegisterations(response.data.registrations);
            }
        }
        catch (error) {
            console.error("Error fetching class registrations:", error);
        }
    };
    const fetchAllRegisterations = async () => {
        try {
            const response = await axiosInstance.get("/registrations");
            if (response?.data?.status) {
                setAllRegisterations(response.data.registrations);
            }
        }
        catch (error) {
            console.error("Error fetching registrations:", error);
        }
    };
    const fetchAllClasses = async (page, limit, searchQuery) => {
        try {
            const response = await axiosInstance.get(`/class?page=${page}&limit=${limit}&search=${searchQuery}`);
            if (response?.data?.status) {
                console.log("first : ", response.data.classes);
                setAllClasses(response.data.classes);
                setClassData({
                    totalPages: response.data.totalPages || 1,
                    currentPage: response.data.currentPage || 1,
                    classes: response.data.classes,
                    totalClasses: response.data.totalClasses || response.data.classes.length,
                });
            }
        }
        catch (error) {
            console.error("Error fetching classes:", error);
        }
    };
    const fetchAllEvents = async () => {
        try {
            const response = await axiosInstance.get("/event");
            if (response?.data?.status) {
                setAllEvents(response.data.events);
            }
        }
        catch (error) {
            console.error("Error fetching events:", error);
        }
    };
    useEffect(() => {
        if (user?.user_type === "Admin") {
            fetchAllFaculties();
            fetchAllRegisterations();
            fetchAllClasses(1, 10, "");
        }
        else if (user?.user_type === "Class") {
            fetchClassRegisterations();
            fetchAllClasses(1, 10, "");
        }
        else if (user?.user_type === "Convenor") {
            fetchAllRegisterations();
        }
        fetchAllEvents();
    }, [user]);
    useEffect(() => {
        console.log("Classes : ", allClasses);
    }, [allClasses]);
    return (_jsx(DataContext.Provider, { value: {
            faculties,
            allRegisterations,
            allClasses,
            allEvents,
            loading,
            classData,
            setLoading,
            setAllClasses,
            setFaculties,
            classRegisterations,
            fetchAllEvents,
            fetchAllFaculties,
            fetchAllRegisterations,
            fetchAllClasses,
            fetchClassRegisterations,
        }, children: children }));
};
// Custom Hook for using DataContext
export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};
