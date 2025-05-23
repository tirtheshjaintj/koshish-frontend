import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion"
import axiosInstance from "../../../../config/axiosConfig";
import toast from "react-hot-toast";
const UpdateRegisterationForEvent: React.FC<any> = ({ setRegisterEvent , event , fetchAllEvents }) => {

  if(!event){
    return;
  }


  const [students, setStudents] = useState<string[]>([...event?.register?.students]);
  const [newStudent, setNewStudent] = useState(""); // State for input field
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);


  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault()
    if (newStudent.trim() !== "" && students.length < event?.maxStudents) {
      setStudents([...students, newStudent.trim()]);
      setNewStudent(""); // Clear input field
    }
  };

  const handleRemoveStudent = (index: number) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await axiosInstance.put(`/registrations/${event?.register?._id}`, {
        students,
        eventId: event?._id,
        classId: event?.register?.classId
      });
      if (response?.data) {
        toast.success("Registration updated successfully");
        setRegisterEvent(null);
        fetchAllEvents()
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Something went wrong");
      toast.error("Registration updation failed");
    } finally {
      setLoading(false);
    }
  };

  const filledFields = students.length;
  const progressPercentage = (filledFields / event?.maxStudents) * 100;
  const progressColor =
    filledFields === event?.maxStudents
      ? "bg-red-500"
      : filledFields >= event?.minStudents
        ? "bg-green-500"
        : "bg-yellow-500";

  return (
    <AnimatePresence>
      <motion.div
        className="mx-auto p-6 flex-1 max-w-[600px]  bg-white shadow-lg rounded-lg border "
        initial={{ y: 100, opacity: 0 }} // Start below and invisible
        animate={{ y: 0, opacity: 1 }} // Slide up and appear
        exit={{ y: 100, opacity: 0 }} // Slide down and disappear
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto p-6  rounded-lg  ">
          <h2 className="text-3xl text-center font-bold mb-4 text-gray-800">{event?.name}</h2>

          <div className="flex text-sm justify-between my-2">
            <p className="mb-2 text-gray-700">
              Min: <span className="font-semibold">{event?.minStudents}</span>
            </p>
            <p className="mb-2 text-gray-700">
              Max: <span className="font-semibold">{event?.maxStudents}</span>
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full my-3 bg-gray-300 rounded-full h-3 mb-4 relative shadow-inner">
            <div
              className={`h-3 ${progressColor} rounded-full transition-all shadow-md`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
            <span className="absolute right-0 top-[-1.5rem] text-sm text-gray-700 font-medium">
              {filledFields} / {event?.maxStudents} students
            </span>
          </div>

          {/* Student List */}
          <div className="flex flex-wrap bg-gray-100 rounded-lg p-3 shadow-md gap-2">
            {students.length === 0 && (
              <span className="text-gray-600 text-sm">No students added yet</span>
            )}
            {students.map((student, index) => (
              <div
                key={index}
                className="bg-white flex items-center gap-4 border px-2 py-1 rounded-lg shadow-md transition-all hover:shadow-xl hover:border-gray-300 cursor-pointer"
              >
                <span className="text-gray-900  text-md">{student}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveStudent(index)}
                  className="text-red-600 font-semibold hover:text-red-700 transition-colors border border-red-600 px-1 py-1 rounded-full"
                >
                  <AiOutlineClose size={10} />
                </button>
              </div>

            ))}
          </div>

          {/* Input Field with Add Button */}
          <form onSubmit={(e) => handleAddStudent(e)} className="flex items-center gap-2 mt-4">
            <input
              type="text"
              value={newStudent}
              onChange={(e) => setNewStudent(e.target.value)}
              disabled={filledFields === event?.maxStudents}
              placeholder="Enter student name"
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={handleAddStudent}
              disabled={filledFields === event?.maxStudents}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              <TiTick />
            </button>
          </form>

          {
            filledFields === event?.maxStudents && (
              <p className="mt-4 text-center text-xs text-red-500 font-medium">
                Maximum number of students reached
              </p>
            )
          }


          {/* Submit Button */}
          <button
            type="submit"
            className={`${loading || (filledFields < event?.minStudents) ? "cursor-not-allowed opacity-50" : ""} bg-red-800 text-white p-2 rounded-md w-full mt-4 hover:bg-red-700 transition `}
            onClick={handleSubmit}
            disabled={loading || (filledFields < event?.minStudents)}

          >
            {loading ? "Updating..." : "Update Registration"}
          </button>


          <div className="flex justify-center">

            <button
              onClick={() => setRegisterEvent(null)}
              className=" px-3 py-1 bg-gray-500 hover:bg-gray-400 text-white rounded-md text-lg m-3 mx-auto">
              close
            </button>
          </div>


          {message && <p className="mt-4 text-center text-red-500 font-medium">{message}</p>}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdateRegisterationForEvent;
