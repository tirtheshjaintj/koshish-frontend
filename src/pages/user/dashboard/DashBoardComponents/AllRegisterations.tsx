import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ModalWrapper from "../../../../components/common/ModalWrapper";
import axiosInstance from "../../../../config/axiosConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EventData } from "../../../../context/DataProviderContext";

const AllEvents = () => {
  // const events = useData().allEvents;
  const [events, setevents] = useState([])
  const [search, setSearch] = useState("");
  const [partFilterType, setPartFilterType] = useState("");
  const [typeFilter, setTypeFilter] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openRegisterModal, setopenRegisterModal] = useState(false);
  const [openUpdateRegiter, setopenUpdateRegiter] = useState(false);
  const [updatingEvent, setupdatingEvent] = useState(null)
  const [registerEvent, setRegisterEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  
  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance(`/event/`);
      if (response.data) {
        console.log("Data : ", response.data)
        setevents(response.data.events);
      }
    } catch (error) {
      console.log("error : ", error)
    }finally{
      setIsLoading(false);
    }
  }


  // Filtered events based on search and type
  const filteredEvents = events.filter(
    (event: EventData) =>
      event.name.toLowerCase().includes(search.toLowerCase()) &&
      // (filterType === "" || event.type === filterType) &&
      (partFilterType === "" || event.part_type === partFilterType) &&
      (typeFilter === "" ||
        (typeFilter === "Senior" && event.type === "Senior") ||
        (typeFilter === "Junior" && event.type === "Junior"))
  );

  useEffect(() => {
    console.log("Hello", events);
  }, [events]);

  useEffect(() => {
    setOpenModal(selectedEvent ? true : false);
  }, [selectedEvent]);


  useEffect(() => {
    setopenRegisterModal(registerEvent ? true : false);
  }, [registerEvent]);


  useEffect(() => {
    setopenUpdateRegiter(updatingEvent ? true : false);
  }, [updatingEvent])


  useEffect(() => {
    if (user) {
      fetchEvents()
    }
  }, [user])




  return (
    <>
      <div className="container mx-auto p-6">
        {/* Search and Filter Section */}
        <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
          <input
            type="text"
            placeholder="Search event..."
            className="w-full px-4 py-3 transition border border-gray-300 rounded-lg shadow-md md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-1 flex-wrap justify-center">
            <select
              className="px-4 py-3 transition border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={partFilterType}
              onChange={(e) => setPartFilterType(e.target.value)}
            >
              <option value="">All Part</option>
              <option value="Group">Group</option>
              <option value="Solo">Solo</option>
            </select>

            <select
              className="px-4 py-3 transition border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">All Events</option>
              <option value="Senior">Senior</option>
              <option value="Junior">Junior</option>
            </select>

          </div>
        </div>

        {
          isLoading ? <>
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          </>:<>
          
        {/* Events List */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredEvents.map((event: EventData) => (
          <motion.div
            key={event._id}
            layout
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-4 transition flex flex-col h-full"
          >
            <div className="bg-white shadow-lg rounded-lg p-5 w-full border border-gray-200 flex flex-col min-h-[300px] h-full">
              {/* Title and Type */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {event.name}
                </h2>
                <span className="bg-red-800 text-white text-xs sm:text-sm px-3 py-1 rounded-md">
                  {event.type}
                </span>
              </div>
        
              {/* Event Info */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-gray-200 text-gray-900 text-xs sm:text-sm px-3 py-1 rounded-md">
                  {event.part_type}
                </span>
                <span className="bg-gray-200 text-gray-900 text-xs sm:text-sm px-3 py-1 rounded-md">
                  {event.minStudents} - {event.maxStudents} Students
                </span>
              </div>
        
              {/* Location and Points */}
              <p className="text-gray-900 font-medium">
                <span className="text-gray-500">Location:</span> {event.location}
              </p>
              <p className="text-gray-900 font-medium">
                <span className="text-gray-500">Points:</span> {event.points.join(", ")}
              </p>
        
              {/* Buttons - Positioned at the Bottom */}
              <div className="flex flex-wrap justify-between mt-auto gap-2">
                <button
                  className="border border-red-800 text-red-900 px-4 py-2 rounded-md hover:bg-red-50 w-full sm:w-auto"
                  onClick={() => setSelectedEvent(event)}
                >
                  Details
                </button>
                <button
                  onClick={() =>
                    navigate(`/user/dashboard/category/${event._id}`)
                  }
                  className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full sm:w-auto"
                >
                  Registrations
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        
        </motion.div>
          
          </>
        }



        {/* Modal for Event Details */}
        <ModalWrapper open={openModal} setOpenModal={setOpenModal}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg p-8 min-w-[60%] text-gray-800 bg-white rounded-lg shadow-lg"
          >
            {selectedEvent && (
              <>
                <h2 className="text-2xl font-bold">{selectedEvent?.name}</h2>
                <p className="mt-4 text-gray-700">
                  <strong>Description:</strong> <br />{selectedEvent?.description}
                </p>
                <p className="mt-4 text-gray-700">
                  <strong>Part Type:</strong> {selectedEvent.part_type}
                </p>
                <p className="mt-4 text-gray-700">
                  <strong>Rules:</strong>
                </p>

                <ul className="pl-6 text-gray-600 list-disc">
                  {selectedEvent.rules.map((rule: string, index: number) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
                <p className="mt-4 text-gray-700">
                  <strong>Points:</strong> {selectedEvent.points.join(", ")}
                </p>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    className="px-4 py-2 text-white transition bg-gray-500 rounded-lg hover:bg-gray-600"
                    onClick={() => setSelectedEvent(null)}
                  >
                    Close
                  </button>

                </div>
              </>
            )}
          </motion.div>
        </ModalWrapper>

      </div>
    </>
  );
};

export default AllEvents;
