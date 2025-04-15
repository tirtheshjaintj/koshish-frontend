import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axiosInstance from "../../../config/axiosConfig";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useData } from "../../../context/DataProviderContext";
import { FaToggleOn } from "react-icons/fa6";
import { FaToggleOff } from "react-icons/fa6";

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
  is_active: boolean;
}

interface UpdateEventProps {
  event: EventData;
  closeModal: () => void;
}

const UpdateEvent: React.FC<UpdateEventProps> = ({ event, closeModal }) => {
  const [eventData, setEventData] = useState<EventData>(event);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletingEvent, setisDeletingEvent] = useState(false);

  const toggleIsDeletingEvent = () => setisDeletingEvent(!isDeletingEvent);
  const { fetchAllEvents } = useData();

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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
    if (
      !eventData.name ||
      !eventData.type ||
      !eventData.part_type ||
      !eventData.description ||
      !eventData.location ||
      !eventData.maxStudents ||
      !eventData.minStudents
    ) {
      return Swal.fire("Error", "Please fill all required fields!", "error");
    }

    if (eventData.description.trim().length < 10) {
      return Swal.fire(
        "Error",
        "Description should be more than 10 characters!",
        "error"
      );
    }

    if (parseInt(eventData.maxStudents) < parseInt(eventData.minStudents)) {
      return Swal.fire(
        "Error",
        "Max Students should be greater than Min!",
        "error"
      );
    }

    setIsLoading(true);
    try {
      await axiosInstance.put(`/event/update/${eventData._id}`, {
        ...eventData,

        rules: eventData.rules.filter((rule) => rule.trim() !== ""),
      });
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
    <div className="  p-4 sm:p-8 bg-white border-[2px] rounded-md ">
      <div className="flex flex-wrap justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold ">EDIT EVENT</h1>

        <div className="flex items-center gap-4 text-lg font-bold">
          Event Staus :
          {eventData.is_active ? (
            <FaToggleOn
              onClick={() =>
                setEventData({ ...eventData, is_active: !eventData.is_active })
              }
              size={30}
              className="text-green-500 cursor-pointer"
            />
          ) : (
            <FaToggleOff
              onClick={() =>
                setEventData({ ...eventData, is_active: !eventData.is_active })
              }
              size={30}
              className="text-red-500 cursor-pointe"
            />
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6">
            <input
              name="name"
              placeholder="Event Name"
              value={eventData.name}
              onChange={handleChange}
              className="w-full p-2 text-xs border rounded-lg sm:p-3 sm:text-sm lg:text-base"
              required
            />

            <div className="flex gap-2 sm:gap-4">
              <select
                name="type"
                value={eventData.type}
                onChange={handleChange}
                className="w-full p-2 text-xs border rounded-lg sm:p-3 sm:text-sm lg:text-base"
                required
              >
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
              </select>

              <select
                name="part_type"
                value={eventData.part_type}
                onChange={handleChange}
                className="w-full p-2 text-xs border rounded-lg sm:p-3 sm:text-sm lg:text-base"
                required
              >
                <option value="Group">Group</option>
                <option value="Solo">Solo</option>
              </select>
            </div>

            <textarea
              name="description"
              rows={5}
              placeholder="Description"
              value={eventData.description}
              onChange={handleChange}
              className="w-full p-2 text-xs border rounded-lg sm:p-3 sm:text-sm lg:text-base"
              required
            />

            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <input
                name="minStudents"
                type="number"
                min="1"
                placeholder="Min Students"
                value={eventData.minStudents}
                onChange={handleChange}
                className="w-full p-2 text-xs border rounded-lg sm:p-3 sm:text-sm lg:text-base"
                required
              />
              <input
                name="maxStudents"
                type="number"
                min="1"
                placeholder="Max Students"
                value={eventData.maxStudents}
                onChange={handleChange}
                className="w-full p-2 text-xs border rounded-lg sm:p-3 sm:text-sm lg:text-base"
                required
              />
            </div>

            <input
              name="location"
              placeholder="Location"
              value={eventData.location}
              onChange={handleChange}
              className="w-full p-2 text-xs border rounded-lg sm:p-3 sm:text-sm lg:text-base"
              required
            />
          </div>

          {/* Right Column - Rules Section */}
          <div>
            <label className="block text-sm font-semibold sm:text-base lg:text-lg">
              Rules:
            </label>
            <div className="mt-2 space-y-2">
              {eventData.rules.map((rule, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={rule}
                    onChange={(e) => handleRuleChange(index, e.target.value)}
                    className="w-full p-2 text-xs border rounded-lg sm:p-3 sm:text-sm lg:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeRule(index)}
                    className="flex items-center px-2 py-1 text-xs text-white bg-red-500 rounded-md sm:px-3 sm:text-sm"
                  >
                    <FaMinus />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addRule}
                className="flex items-center gap-1 px-3 py-1 mt-2 text-xs text-white bg-green-500 rounded-lg sm:py-2 sm:text-sm"
              >
                <FaPlus />
                &nbsp;Add Rule
              </button>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 pt-4 sm:gap-4 sm:flex-row">
          <button
            onClick={closeModal}
            className="flex items-center justify-center w-full py-2 text-sm font-semibold text-white bg-gray-600 rounded-lg shadow-md sm:py-3 sm:text-base"
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            type="submit"
            className="flex items-center justify-center w-full py-2 text-sm font-semibold text-white bg-red-800 rounded-lg shadow-md hover:bg-red-700 sm:py-3 sm:text-base"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white rounded-full sm:w-5 sm:h-5 sm:border-4 border-t-transparent animate-spin" />
            ) : (
              "Update Event"
            )}
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {isDeletingEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-xs p-4 text-center bg-white rounded-lg shadow-lg sm:p-6 sm:max-w-sm">
            <p className="mb-3 text-sm font-semibold sm:text-base lg:text-lg sm:mb-4">
              Do you want to delete this event?
            </p>
            <div className="flex justify-center gap-2 sm:gap-4">
              <button
                className="px-3 py-1 text-xs text-white bg-red-800 rounded sm:px-4 sm:py-2 hover:bg-red-700 sm:text-sm"
                onClick={deleteEvent}
              >
                Delete
              </button>
              <button
                className="px-3 py-1 text-xs text-gray-800 bg-gray-300 rounded sm:px-4 sm:py-2 hover:bg-gray-400 sm:text-sm"
                onClick={toggleIsDeletingEvent}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateEvent;
