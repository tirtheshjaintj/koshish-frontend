import React from "react";
import { FaPen } from "react-icons/fa";
import { Faculty } from "../../../context/DataProviderContext";
interface FacultyRowsProps {
  faculty: Faculty;
  handleEdit: (faculty: Faculty) => void;
}

const FacultyRows: React.FC<FacultyRowsProps> = ({ faculty, handleEdit }) => {
  return (
    <tr className="border-b border-red-300  text-xs text-stone-700 ">
      {/* Avatar */}
      <td className="p-2">
        <img
          src={"https://cdn-icons-png.flaticon.com/512/3541/3541871.png"}
          alt={faculty.name}
          className="w-8 h-8 rounded-full"
        />
      </td>

      {/* Name */}
      <td className="p-2">
        <p className="font-semibold"> {faculty.name}</p>
      </td>

      {/* Email */}
      <td className="p-2">
        <p className="font-semibold"> {faculty.email}</p>
      </td>

      {/* Phone Number */}
      <td className="p-2">
        <p className="font-semibold"> {faculty.phone_number}</p>
      </td>
      {/* User Type */}
      <td className="p-2">
        <p className="font-semibold"> {faculty.user_type}</p>
      </td>

      {/* is_active Toggle */}
      <td className="p-2 ">
        {faculty?.is_active ? (
          <div className="w-4 h-4  rounded-full bg-green-600 "></div>
        ) : (
          <div className="w-4 h-4 rounded-full bg-red-600 "></div>
        )}
      </td>

      {/* Edit  */}
      <td className="p-2">
        <FaPen
          title="Edit"
          onClick={() => handleEdit(faculty)}
          className="cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default FacultyRows;
