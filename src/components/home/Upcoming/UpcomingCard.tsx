import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { TiGroup } from "react-icons/ti";

export default function EventCard({ value }) {
  return (
    <div
      className="flex-1  hover:drop-shadow-xl border-gray-400 p-2
    border-[1px] transition-all duration-100 cursor-pointer bg-white min-w-[288px] lg:min-w-96 max-w-sm drop-shadow-md rounded-2xl overflow-clip"
    >
      {/* Content */}

      <div className="p-2 flex-grow flex flex-col">
        <h2 className="font-poppins  text-ellipsis overflow-hidden md:line-clamp-1 line-clamp-2  text-xl font-semibold text-blue-prime">
          {value?.name}
        </h2>

        <div className="text-gray-600 mb-3 mt-2 border-t pt-2">
          <p className="relative   line-clamp-3 overflow-hidden text-ellipsis ">
            {value?.description || "No description available"}
          </p>

          <div className="flex items-center  gap-2 my-2">
            <TiGroup
              size={24}
              className="min-w-[24px] max-w-[24px] max-h-[24px] min-h-[24px]"
            />
            <p className="text-ellipsis break-words overflow-hidden  line-clamp-2 md:line-clamp-1">
              {value?.type}, {value?.part_type}
            </p>
          </div>

          <div className="flex items-center gap-2 my-2">
            <span className="relative min-w-[24px] max-w-[24px] max-h-[24px] min-h-[24px]">
              <Building2 />
            </span>

            <p className="text-ellipsis overflow-hidden line-clamp-1">
              {value?.location}
            </p>
          </div>
          <div className="">
            <p className="text-ellipsis overflow-hidden line-clamp-1">
              Min Participants: {value?.minStudents}
            </p>
            <p className="text-ellipsis overflow-hidden line-clamp-1">
              Max Participants: {value?.maxStudents}
            </p>
          </div>
        </div>
      </div>

      {/* Book Button */}
      <div
        className="flex items-center border-t relative z-10
       
         border-gray-prime py-2 px-2.5 text-light-gray justify-between"
      >
        <p>34+ Registred</p>
        <Link
          to={`/events/${value?._id}`}
          className="bg-gradient-to-r font-poppins from-purple-600
          hover:opacity-75 to-pink-600 text-white py-2 px-6 rounded-2xl"
        >
          Participate
        </Link>
      </div>
    </div>
  );
}
