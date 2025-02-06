import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axiosInstance from "../config/axiosConfig";
import { useSelector } from "react-redux";

interface DataContextType {
  // Define the shape of the context value here
}

// Create Context
const DataContext = createContext<DataContextType | null>(null);

// Data Provider Component
interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const user = useSelector((state: any) => state.user);
  const [faculties, setFaculties] = useState([])
  const [events,setEvents]=useState([]);

  const fetchAllFaculties = async () => {
    try {
      const response = await axiosInstance.get("/user/getFaculty");
      if (response.data.status) {
        console.log("faculties : ", response.data.data);
        setFaculties(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const fetchAllEvents = async () => {
    try {
      const response = await axiosInstance.get("/event");
      if (response.data.status) {
        console.log("Events : ", response.data.events);
        setEvents(response.data.events);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  useEffect(() => {
    if (user?.user_type === "Admin") {
      fetchAllFaculties();
      // faculties
      // registrations
      // classes
    } else if (user?.user_type === "Teacher") {
      // registration of this class only
    } else if (user?.user_type === "Convenor") {
      // registrations
    }
  }, [user]);

  return <DataContext.Provider value={{faculties,setFaculties,events,setEvents}}>{children}</DataContext.Provider>;
};

// Custom hook to use the DataContext
export const useData = (): any=> {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
