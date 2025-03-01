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
  const events = useData().allEvents;

  const fetchEventResult = async () => {
    try {
      const response = await axiosInstance.get(`/result/get/${event_id}`);
      if (response.data?.success) {
        setEventDetails(response.data.data.eventId);
        setResult(response.data.data.result);
        console.log(response.data.data.result);
        document.title = `${response.data.data.eventId.name} - Results`;
      } else {
        throw new Error("Results not found");
      }
    } catch (error) {
      console.error("Error fetching result:", error);
      setError(true);
      const eventFromList = events.find(event => event._id === event_id);
      if (eventFromList) {
        setEventDetails(eventFromList);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventResult();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
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
          className="mt-5 text-yellow-500 text-6xl"
        >
          <BiTrophy />
        </motion.div>
      </div>
    );
  }

  if (error && !eventDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h2 className="text-3xl font-bold text-red-500">Something went wrong!</h2>
        <p className="text-gray-300 mt-2">Unable to fetch results. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
        {/* Event Details */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-bold text-yellow-400">{eventDetails?.name || "Unknown Event"}</h1>
          <p className="text-gray-300 text-lg font-bold mt-2">
            {eventDetails &&
              `${eventDetails?.type || "Type"} | ${eventDetails?.location || "Location"} | ${eventDetails?.part_type || "N/A"}`}
          </p>
        </motion.div>

        {/* Animated Results Declared */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-2xl text-center font-semibold text-yellow-400 mb-6"
        >
          {result.length > 0 ? `🎉 Results Declared! 🎉` : `Results To be Declared 🏆`}
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
              <span className="text-xl lg:text-2xl font-semibold mb-2">{result[1]?.classId?.name || "N/A"}</span>
              <div className="w-28 h-40 lg:w-52 lg:h-60 bg-gray-400 rounded-t-lg flex items-center justify-center text-5xl lg:text-7xl font-bold shadow-lg">
                🥈
              </div>
              <p className="text-gray-300 font-bold mt-2">{eventDetails?.points?.[1] || "N/A"} Points</p>
            </motion.div>

            {/* 1st Place (Gold) */}
            <motion.div
              initial={{ y: 70, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <span className="text-xl lg:text-3xl font-semibold mb-2 text-yellow-300">
                {result[0]?.classId?.name || "N/A"}
              </span>
              <div className="w-32 h-52 lg:w-72 lg:h-80 bg-yellow-500 rounded-t-lg flex items-center justify-center text-6xl lg:text-8xl font-bold shadow-lg">
                🥇
              </div>
              <p className="text-gray-300 font-bold mt-2">{eventDetails?.points?.[0] || "N/A"} Points</p>
            </motion.div>

            {/* 3rd Place (Bronze) */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <span className="text-xl lg:text-2xl font-semibold mb-2">{result[2]?.classId?.name || "N/A"}</span>
              <div className="w-28 h-36 lg:w-52 lg:h-60 bg-orange-700 rounded-t-lg flex items-center justify-center text-5xl lg:text-7xl font-bold shadow-lg">
                🥉
              </div>
              <p className="text-gray-300 font-bold mt-2">{eventDetails?.points?.[2] || "N/A"} Points</p>
            </motion.div>
          </motion.div>
        ) : (
          <p className="text-gray-400 text-lg">No results available</p>
        )}
      </div>
    </>
  );
}

export default EventResult;
