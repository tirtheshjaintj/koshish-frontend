import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { TiGroup } from "react-icons/ti";

interface EventCardProps {
  value: any;
  openDetailsHandler: any;
}
export default function EventCard({ value, openDetailsHandler }: EventCardProps) {
  return (
    <div
      className="flex-1  hover:drop-shadow-xl border-gray-400 p-2
    border-[1px] transition-all duration-100 cursor-pointer bg-white min-w-[288px] lg:min-w-96 max-w-sm drop-shadow-md rounded-2xl overflow-clip"
    >
      {/* Content */}

      <div className="flex flex-col flex-grow p-2">
        <h2 className="overflow-hidden text-xl font-semibold font-poppins text-ellipsis md:line-clamp-1 line-clamp-2 text-blue-prime">
          {value?.name}
        </h2>

        <div className="pt-2 mt-2 mb-3 text-gray-600 border-t">
          <p className="relative overflow-hidden line-clamp-3 text-ellipsis ">
            {value?.description || "No description available"}
          </p>

          <div className="flex items-center gap-2 my-2">
            <TiGroup
              size={24}
              className="min-w-[24px] max-w-[24px] max-h-[24px] min-h-[24px]"
            />
            <p className="overflow-hidden break-words text-ellipsis line-clamp-2 md:line-clamp-1">
              {value?.type}, {value?.part_type}
            </p>
          </div>

          <div className="flex items-center gap-2 my-2">
            <span className="relative min-w-[24px] max-w-[24px] max-h-[24px] min-h-[24px]">
              <Building2 />
            </span>

            <p className="overflow-hidden text-ellipsis line-clamp-1">
              {value?.location}
            </p>
          </div>
          <div className="">
            <p className="overflow-hidden text-ellipsis line-clamp-1">
              Min Participants: {value?.minStudents}
            </p>
            <p className="overflow-hidden text-ellipsis line-clamp-1">
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
        <button
          onClick={() => openDetailsHandler(value)}

          className="px-6 py-2 text-white bg-blue-600 font-poppins rounded-xl"
        >
          Details
        </button>
        <Link
          to={`/events/${value?._id}`}
          className="px-6 py-2 text-white bg-[#9B1C1C]   rounded-xl"
        >
          Result
        </Link>
      </div>
    </div>
  );
}
