import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axiosInstance from "../../../config/axiosConfig";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useData } from "../../../context/DataProviderContext";
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

interface UpdateEventProps {
  event: EventData;
  closeModal: () => void;
}

const UpdateEvent: React.FC<UpdateEventProps> = ({ event , closeModal }) => {
  const [eventData, setEventData] = useState<EventData>(event);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletingEvent, setisDeletingEvent] = useState(false);

  const toggleIsDeletingEvent = () => setisDeletingEvent(!isDeletingEvent);
  const {fetchAllEvents} = useData();
  

  useEffect(() => {
    const pointValues: Record<string, number[]> = {
      Group: [15, 10, 6],
      Solo: [10, 6, 3],
      Other: [10, 6, 3],
    };
    setEventData((prev) => ({
      ...prev,
      points: pointValues[prev.part_type] || pointValues.Other,
    }));
  }, [eventData.part_type]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleRuleChange = (index: number, value: string) => {
    const updatedRules = [...eventData.rules];
    updatedRules[index] = value;
    setEventData({ ...eventData, rules: updatedRules });
  };

  const addRule = () => {
    setEventData({ ...eventData, rules: [...eventData.rules, ""] });
  };

  const removeRule = (index: number) => {
    if (eventData.rules.length > 1) {
      const updatedRules = eventData.rules.filter((_, i) => i !== index);
      setEventData({ ...eventData, rules: updatedRules });
    }
  };


  const deleteEvent = async () => {
    try {
      await axiosInstance.delete(`/event/delete/${eventData._id}`);
      fetchAllEvents();
      Swal.fire("Success", "Event deleted successfully!", "success");
      closeModal();
    } catch (error) {
      console.error("Error deleting event:", error);
      Swal.fire("Error", "Failed to delete event", "error");
    }
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!eventData.name || !eventData.type || !eventData.part_type || !eventData.description || !eventData.location || !eventData.maxStudents || !eventData.minStudents) {
      return Swal.fire("Error", "Please fill all required fields!", "error");
    }

    if(eventData.description.trim().length < 10){
      return Swal.fire("Error", "Description should be more than 10 characters!", "error");
    }

    if(parseInt(eventData.maxStudents) < parseInt(eventData.minStudents)){
      return Swal.fire("Error", "Max Students should be greater than Min!", "error");
    }

    setIsLoading(true);
    try {
      await axiosInstance.put(`/event/update/${eventData._id}`, { ...eventData, rules: eventData.rules.filter(rule => rule.trim() !== "") });
      Swal.fire("Success", "Event updated successfully!", "success");
      closeModal();
    } catch (error) {
      console.error("Error updating event:", error);
      Swal.fire("Error", "Failed to update event", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-end mb-3 " > <div className="flex items-center justify-center  w-10 h-10 rounded-2xl  cursor-pointer   border-2 border-red-500 " onClick={toggleIsDeletingEvent} >
      <MdDeleteForever size={20} color="red" />
        </div> </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input name="name" placeholder="Event Name" value={eventData.name} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
         
        <div className="flex gap-4">
          <select name="type" value={eventData.type} onChange={handleChange} className="w-full p-3 border rounded-lg" required>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
          </select>
          
          <select name="part_type" value={eventData.part_type} onChange={handleChange} className="w-full p-3 border rounded-lg" required>
            <option value="Group">Group</option>
            <option value="Solo">Solo</option>
          </select>
        </div>

        <textarea name="description" placeholder="Description" value={eventData.description} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        
        <div>
          <label className="block font-semibold">Rules:</label>
          {eventData.rules.map((rule, index) => (
            <div key={index} className="flex items-center space-x-3 mt-2">
              <input type="text" value={rule} onChange={(e) => handleRuleChange(index, e.target.value)} className="w-full p-3 border rounded-lg" required />
              <button type="button" onClick={() => removeRule(index)} className="bg-red-500 h-5 text-white px-3 py-1 rounded-md flex items-center"><FaMinus/></button>
            </div>
          ))}
          <button type="button" onClick={addRule} className="mt-3 bg-green-500 text-white px-3 py-2 rounded-lg flex items-center"><FaPlus/>&nbsp;Rule</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input name="minStudents" type="number" min="1" placeholder="Min Students" value={eventData.minStudents} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
          <input name="maxStudents" type="number" min="1" placeholder="Max Students" value={eventData.maxStudents} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        </div>
        
        <input name="location" placeholder="Location" value={eventData.location} onChange={handleChange} className="w-full p-3 border rounded-lg" required />


         
        
      </form>

      <div className="flex gap-4 flex-col sm:flex-row" >
          <motion.button onClick={closeModal} className="w-full bg-gray-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md flex justify-center items-center" whileTap={{ scale: 0.95 }} disabled={isLoading}>
            {"Cancel"}
          </motion.button>


          <motion.button onClick={handleSubmit} type="submit" className="w-full bg-red-800 hover:bg-red-700 text-white py-3 rounded-lg text-lg font-semibold shadow-md flex justify-center items-center" whileTap={{ scale: 0.95 }} disabled={isLoading}>
            {isLoading ? <motion.div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} /> : "Update Event"}
          </motion.button>
          </div>
          


          {isDeletingEvent && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <p className="text-lg font-semibold mb-4">Do you want to delete this event?</p>
      <div className="flex justify-center gap-4">
        <button 
          className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700"
          onClick={deleteEvent}
        >
          Delete
        </button>
        <button 
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          onClick={toggleIsDeletingEvent}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}



    </motion.div>
  );
};

export default UpdateEvent;
