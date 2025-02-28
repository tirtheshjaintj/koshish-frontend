import { useState, useEffect } from "react";
import axiosInstance from "../../../../config/axiosConfig";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

function AddEvents() {
  const [eventData, setEventData] = useState({
    name: "",
    type: "Junior",
    part_type: "Group",
    description: "",
    rules: [""],
    maxStudents: "",
    minStudents: "",
    location: "",
    points: { first: "", second: "", third: "" },
  });

  useEffect(() => {
    const pointValues = {
      Group: { first: 15, second: 10, third: 6 },
      Solo: { first: 10, second: 6, third: 3 },
      Other: { first: 10, second: 6, third: 3 },
    };
    setEventData((prev) => ({
      ...prev,
      points: pointValues[prev.part_type] || pointValues.Other,
    }));
  }, [eventData.part_type]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleRuleChange = (index, value) => {
    const updatedRules = [...eventData.rules];
    updatedRules[index] = value;
    setEventData({ ...eventData, rules: updatedRules });
  };

  const addRule = () => {
    setEventData({ ...eventData, rules: [...eventData.rules, ""] });
  };

  const removeRule = (index) => {
    if(eventData.rules.length>1){
    const updatedRules = eventData.rules.filter((_, i) => i !== index);
    setEventData({ ...eventData, rules: updatedRules });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventData.name || !eventData.type || !eventData.part_type || !eventData.description || !eventData.location || !eventData.maxStudents || !eventData.minStudents) {
      return Swal.fire("Error", "Please fill all required fields!", "error");
    }
    try {
      await axiosInstance.post("/events/create", { ...eventData, rules: eventData.rules.filter(rule => rule.trim() !== "") });
      Swal.fire("Success", "Event created successfully!", "success");
    } catch (error) {
      console.error("Error creating event:", error);
      Swal.fire("Error", "Failed to create event", "error");
    }
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center mb-6">Add New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input name="name" placeholder="Event Name" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        
        <select name="type" onChange={handleChange} className="w-full p-3 border rounded-lg" required>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
        </select>
        
        <select name="part_type" onChange={handleChange} className="w-full p-3 border rounded-lg" required>
          <option value="Group">Group</option>
          <option value="Solo">Solo</option>
        </select>
        
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        
        <div>
          <label className="block font-semibold">Rules:</label>
          {eventData.rules.map((rule, index) => (
            <div key={index} className="flex space-x-3 mt-2">
              <input type="text" value={rule} onChange={(e) => handleRuleChange(index, e.target.value)} className="w-full p-3 border rounded-lg" required />
              <button type="button" onClick={() => removeRule(index)} className="bg-red-500 text-white px-3 py-1 rounded-lg">-</button>
            </div>
          ))}
          <button type="button" onClick={addRule} className="mt-3 bg-green-500 text-white px-3 py-2 rounded-lg">+ Add Rule</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input name="maxStudents" type="number" placeholder="Max Students" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
          <input name="minStudents" type="number" placeholder="Min Students" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        </div>
        
        <input name="location" placeholder="Location" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        
        <div>
          <label className="block font-semibold">Points:</label>
          <div className="grid grid-cols-3 gap-4">
            <input name="first" value={eventData.points.first} placeholder="1st Prize" className="w-full p-3 border rounded-lg" readOnly />
            <input name="second" value={eventData.points.second} placeholder="2nd Prize" className="w-full p-3 border rounded-lg" readOnly />
            <input name="third" value={eventData.points.third} placeholder="3rd Prize" className="w-full p-3 border rounded-lg" readOnly />
          </div>
        </div>

        <motion.button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Event
        </motion.button>
      </form>
    </motion.div>
  );
}

export default AddEvents;
