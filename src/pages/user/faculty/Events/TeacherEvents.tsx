import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ModalWrapper from "../../../../components/common/ModalWrapper";
import RegisterForEvent from "../../dashboard/DashBoardComponents/RegisterForEvent.tsx";
import UpdateRegisterationForEvent from "../../dashboard/DashBoardComponents/UpdateRegisterations.tsx";
import axiosInstance from "../../../../config/axiosConfig.ts";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setevents] = useState([])
  const [search, setSearch] = useState("");
  const [partFilterType, setPartFilterType] = useState("");
  const [registerFilter, setregisterFilter] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openRegisterModal, setopenRegisterModal] = useState(false);
  const [openUpdateRegiter, setopenUpdateRegiter] = useState(false);
  const [updatingEvent, setupdatingEvent] = useState(null)
  const [registerEvent, setRegisterEvent] = useState(null);
  const user = useSelector((state:any)=>state.user);


  
  const fetchEvents = async()=>{
    try {
      const response = await axiosInstance(`/event/class`);
      
      if(response.data){
        setevents(response.data.result);
      }
    } catch (error) {
      console.log("error : " ,error)
    }
  }

  

  // Filtered events based on search and type
  const filteredEvents = events.filter(
    (event: any) =>
      event.name.toLowerCase().includes(search.toLowerCase()) &&
      // (filterType === "" || event.type === filterType) &&
      (partFilterType === "" || event.part_type === partFilterType) &&
      (registerFilter === "" || 
        (registerFilter === "registered" && event.register !== null) || 
        (registerFilter === "unregistered" && event.register === null))
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
    setopenUpdateRegiter(updatingEvent?true:false);
  }, [updatingEvent])
  

  useEffect(() => {
     if(!user)
      return;
    fetchEvents()
 
  }, [user])
  



  return (
    <>
      <div className="container mx-auto p-6">
        {/* Search and Filter Section */}
        <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
          <input
            type="text"
            placeholder="Search event..."
            className="w-full px-4 py-3 transition border  border-gray-300 rounded-lg shadow-md md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-1 flex-wrap justify-center">
            {/* <select
              className="px-4 py-3 transition border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </select> */}
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
            value={registerFilter}
            onChange={(e) => setregisterFilter(e.target.value)}
          >
            <option value="">All Events</option>
            <option value="registered">Registered</option>
            <option value="unregistered">Unregistered</option>
          </select>

          </div>
        </div>

        {/* Events List */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredEvents.map((event: any) => (
            <motion.div
              key={event._id}
              layout
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/30 backdrop-blur-lg flex flex-col justify-between shadow-lg rounded-xl p-6 cursor-pointer transition duration-300 hover:shadow-xl border border-white/20 relative"
            >
              <h2 className="text-2xl font-semibold text-gray-800">{event.name}</h2>
              <p className="mt-2 text-gray-600">
                <strong>Type:</strong> {event.type}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                <strong>Location:</strong> {event.location}
              </p>
              <div className="flex items-center justify-between mt-4">
                <button
                  className="px-4 py-2 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
                  onClick={() => setSelectedEvent(event)}
                >
                  Details
                </button>
                {/* {event.regi/ster?.toString()} */}
                {
                  event.register !== null ? <><button
                  className="px-4 py-2 bg-[#9B1C1C] text-white rounded-lg  transition"
                    onClick={()=>setupdatingEvent(event)}
                >
                  
                  Update
                </button></>:<><button
                  className="px-4 py-2 bg-[#9B1C1C] text-white rounded-lg  transition"
                  onClick={() => setRegisterEvent(event)}
                >
                  Register
                </button></>
                }
                
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
                  <Link
                   to={`/events/${selectedEvent._id}`}
                    className="px-4 py-2 text-white transition bg-green-500 rounded-lg hover:bg-green-600"

                  >
                    Results
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </ModalWrapper>

        <ModalWrapper open={openRegisterModal} setOpenModal={setopenRegisterModal} >
            <RegisterForEvent setRegisterEvent={setRegisterEvent} event={registerEvent} fetchAllEvents={fetchEvents} />
        </ModalWrapper>

        <ModalWrapper  open={openUpdateRegiter} setOpenModal={setopenUpdateRegiter}  >

        <UpdateRegisterationForEvent setRegisterEvent={setupdatingEvent} event={updatingEvent} fetchAllEvents={fetchEvents} />
        </ModalWrapper>
      </div>
    </>
  );
};

export default Events;
