import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axiosInstance from "../config/axiosConfig";
import { useSelector } from "react-redux";

interface DataContextType {
  // Define the shape of the context value here
  faculties: Array<any>;
  allRegisterations: Array<any>;
  allClasses: Array<any>;
  allEvents: Array<any>;
  classRegisterations: Array<any>;
  fetchAllFaculties: () => Promise<void>;
  fetchAllRegisterations: () => Promise<void>;
  fetchAllClasses: () => Promise<void>;
  fetchAllEvents: () => Promise<void>;
  fetchClassRegisterations: () => Promise<void>;
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

  const [allRegisterations, setAllRegisterations] = useState([])
  const [allClasses, setAllClasses] = useState([])
  const [allEvents, setAllEvents] = useState([])
  const [classRegisterations, setClassRegisterations] = useState([])


  const fetchAllFaculties = async () => {
    try {
      const response = await axiosInstance.get("/user/getFaculty");
      if (response.data.status) {
        // console.log("faculties : ", response.data.data);
        setFaculties(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };


  const fetchClassRegisterations = async () => {
    try {
      const response = await axiosInstance.get("/registrations/classRegistrations");
      if (response?.data?.status) {
        console.log("fetclassRegisterations : ", response.data.registrations);
        setClassRegisterations(response.data.registrations)
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  const getAllRegisterations = async () => {
    try {
      const response = await axiosInstance.get('/registrations');
      if (response?.data?.status) {
        // console.log("response : " , response?.data?.registrations);
        setAllRegisterations(response?.data?.registrations);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  const fetchAllClasses = async () => {
    try {
      const response = await axiosInstance.get('/class');
      if (response?.data?.status) {
        // console.log("classes : " , response?.data?.classes);
        setAllClasses(response?.data?.classes)
      }
    } catch (error) {
      console.log("error :  ", error)
    }
  }

  const fetchAllEvents = async () => {
    try {
      const response = await axiosInstance.get('/event');
      if (response?.data?.status) {
        // console.log("events : " , response?.data?.events);
        setAllEvents(response?.data?.events)
      }
    } catch (error) {
      console.log("error :", error)
    }
  }


  useEffect(() => {
    fetchAllEvents();

  }, []);

  useEffect(() => {
    if (user?.user_type === "Admin") {
      fetchAllFaculties();
      getAllRegisterations();
      fetchAllClasses()
      // faculties
      // registrations
      // classes
    } else if (user?.user_type === "Teacher") {
      // registration of this class only
      fetchClassRegisterations()
    } else if (user?.user_type === "Convenor") {
      // registrations
      getAllRegisterations();
    }
  }, [user]);

  return <DataContext.Provider value={{
    faculties,
    allRegisterations, allClasses,
    allEvents, classRegisterations,
    fetchAllFaculties
  }}>{children}</DataContext.Provider>;
};

// Custom hook to use the DataContext
export const useData = (): any => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
