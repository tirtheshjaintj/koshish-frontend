import React from "react";
import { FaEye, FaEyeSlash, FaTrash, FaToggleOn, FaToggleOff, FaPen } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

// Define Faculty type
interface Faculty {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  block: string;
  is_active: boolean;
  phone_number: string;
  user_type: string;

}

// Define Props for the component
interface FacultyRowsProps {
  faculty: Faculty;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  handleSave: (e: React.FormEvent) => Promise<void>;
  handleEdit: (faculty: Faculty) => void;
  editFacultyId: string | null;
  handleCancel: () => void;
  handleToggleAccess: (id: string) => Promise<void>;
  handleRemove: (id: string) => void;
  data: {
    name: string;
    email: string;
    password?: string;
    user_type?: string;
  };
}

const FacultyRows: React.FC<FacultyRowsProps> = ({
  faculty,
  handleInputChange,
  isEditing,
  handleSave,
  handleEdit,
  editFacultyId,
  handleCancel,
  handleToggleAccess,
  handleRemove,
  data,
}) => {
  return (
    <tr className="border-b border-stone-300  text-xs text-stone-700 ">
      {/* Avatar */}
      <td className="p-2">
        <img
          src={faculty.avatar || "https://cdn-icons-png.flaticon.com/512/3541/3541871.png"}
          alt={faculty.name}
          className="w-8 h-8 rounded-full"
        />
      </td>

      {/* Name */}
      <td className="p-2">
        <p> {faculty.name}</p>
      </td>

      {/* Email */}
      <td className="p-2">
        <p> {faculty.email}</p>
      </td>

      {/* Phone Number */}
      <td className="p-2">
        <p> {faculty.phone_number}</p>
      </td>
      {/* User Type */}
      <td className="p-2">
        <p> {faculty.user_type}</p>
      </td>


      {/* is_active Toggle */}
      <td className="p-2">
        {faculty?.is_active ? (
          <FaToggleOn
            onClick={() => handleToggleAccess(faculty._id)}
            className="text-emerald-500 cursor-pointer text-xl"
          />
        ) : (
          <FaToggleOff
            onClick={() => handleToggleAccess(faculty._id)}
            className="text-red-500 cursor-pointer text-xl"
          />
        )}
      </td>

       
      {/* Edit / Save / Cancel */}
      <td className="p-2">
        {!isEditing || editFacultyId !== faculty._id ? (
          <FaPen title="Edit" onClick={() => handleEdit(faculty)} className="cursor-pointer" />
        ) : (
          <div className="flex gap-4 items-center">
            <IoCheckmarkDoneCircle
              title="Save"
              className="text-green-600 hover:text-green-700 cursor-pointer"
              onClick={handleSave}
              size={20}
            />
            <MdCancel
              title="Cancel"
              className="text-red-600 cursor-pointer"
              onClick={handleCancel}
              size={20}
            />
          </div>
        )}
      </td>
    </tr>
  );
};

export default FacultyRows;
