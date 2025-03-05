import { useEffect, useState } from "react";
import { useData } from "../../../context/DataProviderContext";
import { motion } from "framer-motion";
import ModalWrapper from "../../../components/common/ModalWrapper";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import UpdateEvent from "./UpdateEvent";
import { FaEdit } from "react-icons/fa";
import axiosInstance from "../../../config/axiosConfig";
import Loader from "../../../components/common/Loader";

interface EventData {
  _id: string;
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

export interface IClass {
  _id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  type: "Senior" | "Junior";
  is_active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const ViewEvents = () => {
  const events = useData().allEvents;
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [partFilterType, setPartFilterType] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState<EventData | null>(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [result, setResult] = useState<any>(null)
  const [isResultLoading, setIsResultLoading] = useState(false);
  const { allClasses } = useData();
  const [selectedResultEvent, setselectedResultEvent] = useState<EventData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false);
  


  const [selected, setSelected] = useState<IClass[]>([]);
  const [inputValue, setInputValue] = useState("");


  const addResult = async () => {
    try {
      setIsSubmitting(true)
      const response = await axiosInstance.post('/result/add' ,{ eventId : selectedResultEvent?._id, result : selected });
      if(response.data){
        closeResultModal();
      }
    } catch (error) {
      console.log("erro : " , error)
    }finally{
      setIsSubmitting(false);
    }
  }

  const updateResult = async () => {
    try {
      setIsSubmitting(true);
      const response = await axiosInstance.put(`/result/update/${result._id}` ,{ result : selected });
      if(response.data){
        closeResultModal();
      }
    } catch (error) {
      console.log("erro : " , error)
    }finally{
      setIsSubmitting(false);
    }
  }



  const [formData, setFormData] = useState({
    first: null,
    second: null,
    third: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const closeResultModal = () => {
    setResult(null);
    setIsResultModalOpen(false);
    setFormData({ first: null, second: null, third: null });
    setInputValue("")
    setSelected([]);
    setselectedResultEvent(null);
  }


  const handleSelect = (value: IClass) => {
    if (selected.length < 3 && !selected.includes(value)) {
      setSelected([...selected, value]);
      setInputValue("");
    }
  };

  const handleRemove = (value: IClass) => {
    setSelected(selected.filter((item) => item !== value));
  };

  const filteredOptions = allClasses.filter(
    (option: IClass) => option.name.toLowerCase().includes(inputValue.toLowerCase()) && !selected.includes(option)
  );
  
  // Filtered events based on search and type
  const filteredEvents = events.filter(
    (event: any) =>
      event.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterType === "" || event.type === filterType) &&
      (partFilterType === "" || event.part_type === partFilterType)
  );

  console.log({formData})


  const fetchResult = async (eventId: string) => {
    try {
      const response = await axiosInstance.get(`/result/get/${eventId}`);
      if (response.data) {
        console.log("response.data :", response.data);
        setResult(response.data.data);
        setSelected([response.data.data.result[0].classId , response.data.data.result[1].classId , response.data.data.result[2].classId]);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  const openResultModal = async (event: EventData) => {
    try {
      setIsResultLoading(true);
      setselectedResultEvent(event);
      await fetchResult(event._id);
      setIsResultModalOpen(true);
    } catch (error) {
      console.log("error : ", error);
    } finally {
      setIsResultLoading(false);
    }
  }

  useEffect(() => {
    console.log("Hello", events);
  }, [events]);

  const closeModal = () => {
    setUpdatedEvent(null);
    setSelectedEvent(null);
  }

  useEffect(() => {
    console.log("selectedEvent : ", selectedEvent)
    setOpenModal(selectedEvent ? true : false);
  }, [selectedEvent]);

  if (!updatedEvent) {
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
              <Link to={`/user/dashboard/addEvent`} className="text-white bg-[#9B1C1C] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-md"><span className="flex justify-center items-center">Add Event <FaPlus /></span></Link>

            </div>

          </div>


          {/* Events List */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((event: EventData) => (
              <motion.div
                key={event._id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/30 backdrop-blur-lg flex flex-col justify-between shadow-lg rounded-xl p-6 cursor-pointer transition duration-300 hover:shadow-xl border border-white/20 relative"
              >
                <span className="absolute top-3 right-3" onClick={() => { setUpdatedEvent(event) }} ><FaEdit size={18} /></span>
                <h2 className="text-2xl font-semibold text-gray-800">{event.name}</h2>
                <p className="text-gray-600 mt-2">
                  <strong>Type:</strong> {event.type}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  <strong>Description:</strong> {event.description.substring(0, 30) + "..."}
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
                    onClick={() => openResultModal(event)}
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
                    <strong>Description:</strong> <br />{selectedEvent.description}
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

          <ModalWrapper open={isResultModalOpen} setOpenModal={setIsResultModalOpen} >

            

            <div className="md:w-[80%] min-w-[300px] mx-auto p-6 bg-white shadow-lg rounded-lg">

            {isResultLoading ? <Loader /> : <>
            
            
                <h2 className="text-lg font-semibold mb-4">
                  {
                    result === null ? "Add Result" : "Update Result"
                  }
                </h2>

                {/* Selected Values */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selected.map((value, index) => (
                    <div key={index} className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">
                      <span className="capitalize">{index === 0 ? "First" : index === 1 ? "Second" : "Third"}: {value.name}</span>
                      <button onClick={() => handleRemove(value)} className="text-red-600 hover:text-red-800">✖</button>
                    </div>
                  ))}
                </div>

                {/* Input Field */}
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type to search..."
                    className="w-full p-2 border rounded-md"
                  />
                  {inputValue && filteredOptions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border mt-1 shadow-lg rounded-md">
                      {filteredOptions.map((option: IClass) => (
                        <li
                          key={option._id}
                          onClick={() => handleSelect(option)}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {option.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 flex-col md:flex-row mt-4">
                  <button
                    onClick={closeResultModal}
                    className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={selected.length !== 3}
                    className={`w-full text-white py-2 rounded-md transition ${selected.length === 3 ? "bg-red-800 hover:bg-ed-700" : "bg-gray-400 cursor-not-allowed"
                      }`}
                    onClick={()=>{
                      if(result === null){
                        addResult()
                      }else{
                        updateResult()
                      }
                    }}
                      
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
            
            </>}
            </div>
          </ModalWrapper>



        </div>
      </>
    );
  } else {
    return (
      <>
        <UpdateEvent event={updatedEvent} closeModal={closeModal} />
      </>
    )
  }
};

export default ViewEvents;
