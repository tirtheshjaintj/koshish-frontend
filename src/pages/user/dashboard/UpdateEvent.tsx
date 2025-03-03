import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axiosInstance from "../../../config/axiosConfig";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa";

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
}

const UpdateEvent: React.FC<UpdateEventProps> = ({ event }) => {
  const [eventData, setEventData] = useState<EventData>(event);
  const [isLoading, setIsLoading] = useState(false);

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
    } catch (error) {
      console.error("Error updating event:", error);
      Swal.fire("Error", "Failed to update event", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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

        <motion.button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md flex justify-center items-center" whileTap={{ scale: 0.95 }} disabled={isLoading}>
          {isLoading ? <motion.div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} /> : "Update Event"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default UpdateEvent;
