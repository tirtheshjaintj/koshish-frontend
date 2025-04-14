import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../config/axiosConfig";
import toast from "react-hot-toast";
import { FaRegPenToSquare } from "react-icons/fa6";
import Loader from "../../../components/common/Loader";

const ClassProfile: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const [email, setEmail] = useState(user?.email || "");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.put(`/class/${user?._id}`, { email });
      toast.success("Email updated successfully");
      setIsEditingEmail(false);
    } catch (error) {
      console.error("Failed to update email:", error);
      toast.error("Failed to update email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 mmx-auto bg-white border-[2px]  rounded-xl text-sm ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Class Profile</h1>
        <div className="h-1 w-20 bg-red-800 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Class Name */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Class Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="className"
              value={user?.name}
              disabled
              className="w-full p-2 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium focus:outline-none focus:border-red-300 transition"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Class Username */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Class Username
          </label>
          <div className="relative">
            <input
              type="text"
              name="classUsername"
              value={user?.username || ""}
              disabled
              className="w-full p-2 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium focus:outline-none focus:border-red-300 transition"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col space-y-2 ">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Email
          </label>
      
          {isEditingEmail ? (
            <form onSubmit={handleChangeEmail} className="flex gap-2 flex-wrap">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-2 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-800 transition"
                placeholder="Enter email"
                required
              />
              <div className="flex gap-2">
                <button
                  disabled={loading}
                  type="submit"
                  className="px-4 py-2 bg-red-800 flex items-center justify-center text-white font-medium rounded-lg hover:bg-red-900 transition"
                >
                  {loading ? <Loader /> : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail(user?.email || "");
                    setIsEditingEmail(false);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                value={email}
                disabled
                className="flex-1 p-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium"
              />
              <button
                onClick={() => setIsEditingEmail(true)}
                className="px-4 py-1.5 bg-red-800 text-white font-medium rounded-lg hover:bg-red-900 transition"
              >
                <FaRegPenToSquare />
              </button>
            </div>
          )}
        </div>

        {/* Type */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Class Type
          </label>
          <div className="p-3 border-2 border-gray-200 rounded-lg bg-gray-50">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              {user?.type}
            </span>
          </div>
        </div>

        {/* Is Active Switch */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Account Status
          </label>
          <div className="p-3 border-2 border-gray-200 rounded-lg bg-gray-50 flex items-center justify-between">
            <span className="text-gray-700 font-medium">
              {user?.is_active ? "Active" : "Inactive"}
            </span>
            <div className="relative inline-block w-12 mr-2 align-middle select-none">
              <input
                type="checkbox"
                name="is_active"
                id="is_active"
                checked={user?.is_active}
                disabled
                className="sr-only"
              />
              <label
                htmlFor="is_active"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                  user?.is_active ? "bg-red-800" : "bg-gray-300"
                }`}
              >
                <span
                  className={`block h-6 w-6 rounded-full bg-white shadow-md transform transition ${
                    user?.is_active ? "translate-x-6" : ""
                  }`}
                ></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -z-10 opacity-10">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 0C44.8 0 0 44.8 0 100C0 155.2 44.8 200 100 200C155.2 200 200 155.2 200 100C200 44.8 155.2 0 100 0ZM100 180C56 180 20 143.6 20 100C20 56.4 56.4 20 100 20C143.6 20 180 56.4 180 100C180 143.6 143.6 180 100 180Z"
            fill="#991B1B"
          />
        </svg>
      </div>
    </div>
  );
};

export default ClassProfile;
