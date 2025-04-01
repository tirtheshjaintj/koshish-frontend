import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../config/axiosConfig";
import { useParams } from "react-router-dom";
import { BiTrophy } from "react-icons/bi";
import { useData } from "../context/DataProviderContext";
import { EventData } from "../context/DataProviderContext";


interface ResultItem {

  name: string;

}

interface ApiResponse {
  success: boolean;
  data: {
    eventId: EventData;
    result: ResultItem[];
  };
}

function EventResult() {
  const [eventDetails, setEventDetails] = useState<EventData | null>(null);
  const [result, setResult] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { event_id } = useParams<{ event_id: string }>();
  const [year, setYear] = useState(new Date().getFullYear());
  const events = useData().allEvents;

  const fetchEventResult = async (selectedYear: number) => {
    try {
      const response = await axiosInstance.get<ApiResponse>(`/result/get/${event_id}?year=${selectedYear}`);
      console.log(response.data);
      if (response.data?.success) {
        setEventDetails(response.data.data.eventId);
        setResult(response.data.data.result);
        document.title = `${response.data.data.eventId.name} - Results`;
      } else {
        setResult([]);
      }
    } catch (error: any) {
      setError(true);
      setResult([]);
      const eventFromList = events.find((event: EventData) => event._id === event_id);
      if (eventFromList) {
        setEventDetails(eventFromList);
      } else {
        setEventDetails(error.response.data?.event);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventResult(year);
  }, [year]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold"
        >
          Loading Results...
        </motion.div>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="mt-5 text-6xl text-yellow-500"
        >
          <BiTrophy />
        </motion.div>
      </div>
    );
  }

  if (error && !eventDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900">
        <h2 className="text-3xl font-bold text-red-500">Something went wrong!</h2>
        <p className="mt-2 text-gray-300">Unable to fetch results. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-10 text-center text-white bg-gray-900">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-4xl font-bold text-yellow-400 lg:text-5xl">{eventDetails?.name || "Unknown Event"}
          <select className="ml-2 text-4xl text-yellow-400 bg-transparent border-none outline-none lg:text-5xl" value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {[...Array(10)].map((_, index) => {
              const y = new Date().getFullYear() - index;
              return <option key={y} value={y}>{y}</option>;
            })}
          </select>
        </h1>
        <p className="mt-2 text-xl font-bold text-gray-300">
          {eventDetails && `${eventDetails.type} | ${eventDetails.location} | ${eventDetails.part_type}`}
        </p>
      </motion.div>
      <motion.h2 className="text-2xl font-bold text-yellow-400" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
        {result.length > 0 ? "🎉 Results Declared! 🎉" : "Results To be Declared 🏆"}
      </motion.h2>
      {result.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-center pt-10"
        >
          {/* 2nd Place (Silver) */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="mb-2 text-xl font-semibold lg:text-2xl">{result[1].name || "N/A"}</span>
            <div className="flex items-center justify-center h-40 text-5xl font-bold bg-gray-400 rounded-t-lg shadow-lg w-28 lg:w-52 lg:h-60 lg:text-7xl">
              🥈
            </div>
            <p className="mt-2 font-bold text-gray-300">{eventDetails?.points[1] || "N/A"} Points</p>
          </motion.div>
          {/* 1st Place (Gold) */}
          <motion.div
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="mb-2 text-xl font-semibold text-yellow-300 lg:text-3xl">
              {result[0].name || "N/A"}
            </span>
            <div className="flex items-center justify-center w-32 text-6xl font-bold bg-yellow-500 rounded-t-lg shadow-lg h-52 lg:w-72 lg:h-80 lg:text-8xl">
              🥇
            </div>
            <p className="mt-2 font-bold text-gray-300">{eventDetails?.points[0] || "N/A"} Points</p>
          </motion.div>
          {/* 3rd Place (Bronze) */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="mb-2 text-xl font-semibold lg:text-2xl">{result[2].name || "N/A"}</span>
            <div className="flex items-center justify-center text-5xl font-bold bg-orange-700 rounded-t-lg shadow-lg w-28 h-36 lg:w-52 lg:h-60 lg:text-7xl">
              🥉
            </div>
            <p className="mt-2 font-bold text-gray-300">{eventDetails?.points[2] || "N/A"} Points</p>
          </motion.div>
        </motion.div>
      ) : (
        <p className="text-lg text-gray-400">No results available</p>
      )}
    </div>
  );
}

export default EventResult;
