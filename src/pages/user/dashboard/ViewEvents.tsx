import { useEffect, useState } from "react";
import { useData } from "../../../context/DataProviderContext";
import { motion } from "framer-motion";
import ModalWrapper from "../../../components/common/ModalWrapper";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import UpdateEvent from "./UpdateEvent";
import { FaEdit } from "react-icons/fa";

interface EventData {
  _id:string;
  name: string;
  type: string;
  part_type: string;
  description: string;
  rules: string[];
  maxStudents: string;
  minStudents: string;
  location: string;
  points: number[];
}
const ViewEvents = () => {
  const events = useData().allEvents;
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [partFilterType, setPartFilterType] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventData|null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [updatedEvent,setUpdatedEvent]=useState<EventData|null>(null);

  // Filtered events based on search and type
  const filteredEvents = events.filter(
    (event:any) =>
      event.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterType === "" || event.type === filterType) &&
      (partFilterType === "" || event.part_type === partFilterType)
  );
  
  
    const closeModal = ()=>{
      setUpdatedEvent(null);
      setSelectedEvent(null);
    }

  useEffect(()=>{
    console.log("selectedEvent : " , selectedEvent)
    setOpenModal(selectedEvent?true:false);
  },[selectedEvent]);

if(!updatedEvent){
  return (
    <>
      <div className="container mx-auto p-6">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search event..."
            className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
          <select
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-md"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
          </select>
          <select
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-md"
            value={partFilterType}
            onChange={(e) => setPartFilterType(e.target.value)}
          >
            <option value="">All Part</option>
            <option value="Group">Group</option>
            <option value="Solo">Solo</option>
          </select>
          <Link to={`/user/dashboard/addEvent`} className="text-white bg-[#9B1C1C] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-md"><span className="flex justify-center items-center">Add Event <FaPlus/></span></Link>

          </div>
        
        </div>
        

        {/* Events List */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredEvents.map((event:EventData) => (
            <motion.div
              key={event._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/30  backdrop-blur-lg shadow-lg rounded-xl p-6 cursor-pointer transition duration-300 hover:shadow-xl border border-white/20 relative"
            >
            
              <span className="absolute top-3 right-3 " onClick={()=>{setUpdatedEvent(event)}} ><FaEdit size={18}/></span>
              <h2 className="text-2xl font-semibold text-gray-800">{event.name}</h2>
              <p className="text-gray-600 mt-2">
                <strong>Type:</strong> {event.type}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                <strong>Description:</strong> {event.description.substring(0,30)+"..."}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                <strong>Location:</strong> {event.location}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setSelectedEvent(event)}
                >
                  Details 
                </button>
                <button
                    className="px-4 py-2  text-white rounded-lg bg-[#9B1C1C] transition"
                    
                  >
                    Result
                  </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal for Event Details */}
        <ModalWrapper open={openModal} setOpenModal={setOpenModal}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg text-gray-800"
          >
            {selectedEvent && (
              <>
                <h2 className="text-2xl font-bold">{selectedEvent.name}</h2>
                <p className="text-gray-700 mt-4">
                  <strong>Description:</strong> <br/>{selectedEvent.description}
                </p>
                <p className="text-gray-700 mt-4">
                  <strong>Part Type:</strong> {selectedEvent.part_type}
                </p>
                <p className="text-gray-700 mt-4">
                  <strong>Rules:</strong>
                </p>
               
                <ul className="list-disc pl-6 text-gray-600">
                  {selectedEvent.rules.map((rule: string, index: number) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
                <p className="text-gray-700 mt-4">
                  <strong>Points:</strong> {selectedEvent.points.join(", ")}
                </p>
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                    onClick={() => setSelectedEvent(null)}
                  >
                    Close
                  </button> 
                  <Link to={`/events/${selectedEvent._id}`}
                    className="px-4 py-2  text-white rounded-lg bg-[#9B1C1C] transition"
                  >
                    Results
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </ModalWrapper>
      </div>
    </>
  );
}else{
    return (
        <>
        <UpdateEvent event={updatedEvent} closeModal={closeModal} />
        </>
    )
}
};

export default ViewEvents;
