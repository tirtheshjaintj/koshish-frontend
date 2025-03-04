import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../config/axiosConfig";
import { useParams } from "react-router-dom";
import { BiTrophy } from "react-icons/bi";
import { useData } from "../context/DataProviderContext";

interface EventDetails {
  _id:string;
  name: string;
  type: string;
  location: string;
  part_type: string;
  points: number[];
}

interface ResultItem {

    name: string;

}

interface ApiResponse {
  success: boolean;
  data: {
    eventId: EventDetails;
    result: ResultItem[];
  };
}

function EventResult() {
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [result, setResult] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { event_id } = useParams<{ event_id: string }>();
  const [year,setYear]=useState(new Date().getFullYear());
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
    } catch (error:any) {
      setError(true);
      setResult([]);
      const eventFromList = events.find((event: EventDetails) => event._id === event_id);
      if (eventFromList) {
        setEventDetails(eventFromList);
      }else{
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
    <div className="flex flex-col  justify-between text-center py-10 items-center min-h-screen bg-gray-900 text-white">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-4xl lg:text-5xl font-bold text-yellow-400">{eventDetails?.name || "Unknown Event"} 
          <select className="bg-transparent text-4xl lg:text-5xl  ml-2 border-none outline-none text-yellow-400" value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {[...Array(10)].map((_, index) => {
              const y = new Date().getFullYear() - index;
              return <option key={y} value={y}>{y}</option>;
            })}
          </select>
        </h1>
        <p className="text-gray-300 text-xl font-bold mt-2">
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
             <span className="text-xl lg:text-2xl font-semibold mb-2">{result[1].name || "N/A"}</span>
             <div className="w-28 h-40 lg:w-52 lg:h-60 bg-gray-400 rounded-t-lg flex items-center justify-center text-5xl lg:text-7xl font-bold shadow-lg">
               🥈
             </div>
             <p className="text-gray-300 font-bold mt-2">{eventDetails?.points[1] || "N/A"} Points</p>
           </motion.div>
           {/* 1st Place (Gold) */}
           <motion.div
             initial={{ y: 70, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.4, duration: 0.8 }}
             className="flex flex-col items-center"
           >
             <span className="text-xl lg:text-3xl font-semibold mb-2 text-yellow-300">
               {result[0].name || "N/A"}
             </span>
             <div className="w-32 h-52 lg:w-72 lg:h-80 bg-yellow-500 rounded-t-lg flex items-center justify-center text-6xl lg:text-8xl font-bold shadow-lg">
               🥇
             </div>
             <p className="text-gray-300 font-bold mt-2">{eventDetails?.points[0] || "N/A"} Points</p>
           </motion.div>
           {/* 3rd Place (Bronze) */}
           <motion.div
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.6, duration: 0.8 }}
             className="flex flex-col items-center"
           >
             <span className="text-xl lg:text-2xl font-semibold mb-2">{result[2].name || "N/A"}</span>
             <div className="w-28 h-36 lg:w-52 lg:h-60 bg-orange-700 rounded-t-lg flex items-center justify-center text-5xl lg:text-7xl font-bold shadow-lg">
               🥉
             </div>
             <p className="text-gray-300 font-bold mt-2">{eventDetails?.points[2] || "N/A"} Points</p>
           </motion.div>
         </motion.div>
      ) : (
        <p className="text-gray-400 text-lg">No results available</p>
      )}
    </div>
  );
}

export default EventResult;
