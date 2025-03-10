import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axiosInstance from "../config/axiosConfig";
import { useSelector } from "react-redux";
import { RootState, UserState } from "../store/store";

// Define Class interface
export interface Class {
  _id?: string;
  name: string;
  password?: string;
  username?: string;
  type: string;
  email: string;
  is_active?: boolean;
}

// Define Registration interface
interface Registration {
  _id: string;
  user: string;
  classId: string;
}

// Define Event interface
interface Event {
  _id: string;
  title: string;
  date: string;
  description: string;
}

export interface Faculty {
  _id?: string;
  name: string;
  email: string;
  password: string;
  is_active: boolean;
  phone_number: string;
  user_type: string;
}

interface ClassData {
    totalPages: number;
    currentPage: number;
    classes: Class[];
    totalClasses: number;
}
// Define Context Type
interface DataContextType {
  // States
  faculties: Faculty[];
  allRegisterations: Registration[];
  allClasses: Class[];
  allEvents: Event[];
  loading: boolean;
  classRegisterations: Registration[];
  classData: ClassData | null;

  // Setters
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAllClasses: React.Dispatch<React.SetStateAction<Class[]>>;
  setFaculties:React.Dispatch<React.SetStateAction<Faculty[]>>;

  // Functions
  fetchAllFaculties: () => Promise<void>;
  fetchAllRegisterations: () => Promise<void>;
  fetchAllClasses: (
    page: number,
    limit: number,
    searchQuery: string
  ) => Promise<void>;
  fetchAllEvents: () => Promise<void>;
  fetchClassRegisterations: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const user = useSelector(
    (state: RootState) => state.user
  ) as UserState | null;

  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [allRegisterations, setAllRegisterations] = useState<Registration[]>(
    []
  );
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [classRegisterations, setClassRegisterations] = useState<
    Registration[]
  >([]);
  const [allClasses, setAllClasses] = useState<Class[]>([]);
  const [classData, setClassData] = useState<ClassData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAllFaculties = async () => {
    try {
      const response = await axiosInstance.get<{
        status: boolean;
        data: Faculty[];
      }>("/user/getFaculty");
      if (response.data.status) {
        setFaculties(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  const fetchClassRegisterations = async () => {
    try {
      const response = await axiosInstance.get<{
        status: boolean;
        registrations: Registration[];
      }>("/registrations/classRegistrations");
      if (response?.data?.status) {
        setClassRegisterations(response.data.registrations);
      }
    } catch (error) {
      console.error("Error fetching class registrations:", error);
    }
  };

  const fetchAllRegisterations = async () => {
    try {
      const response = await axiosInstance.get<{
        status: boolean;
        registrations: Registration[];
      }>("/registrations");
      if (response?.data?.status) {
        setAllRegisterations(response.data.registrations);
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  const fetchAllClasses = async (
    page: number,
    limit: number,
    searchQuery: string
  ) => {
    try {
      const response = await axiosInstance.get<{
        status: boolean;
        classes: Class[];
        totalPages?: number;
        currentPage?: number;
        totalClasses?: number;
      }>(`/class?page=${page}&limit=${limit}&search=${searchQuery}`);

      if (response?.data?.status) {
        setAllClasses(response.data.classes);

        setClassData({
            totalPages: response.data.totalPages || 1,
            currentPage: response.data.currentPage || 1,
            classes: response.data.classes,
            totalClasses:
              response.data.totalClasses || response.data.classes.length,
        });
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchAllEvents = async () => {
    try {
      const response = await axiosInstance.get<{
        status: boolean;
        events: Event[];
      }>("/event");
      if (response?.data?.status) {
        setAllEvents(response.data.events);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    if (user?.user_type === "Admin") {
      fetchAllFaculties();
      fetchAllRegisterations();
      fetchAllClasses(1, 10, "");
    } else if (user?.user_type === "Class") {
      fetchClassRegisterations();
    } else if (user?.user_type === "Convenor") {
      fetchAllRegisterations();
    }
    fetchAllEvents();
  }, [user]);

  return (
    <DataContext.Provider
      value={{
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom Hook for using DataContext
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
