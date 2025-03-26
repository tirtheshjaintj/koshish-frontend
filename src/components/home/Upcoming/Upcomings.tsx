import { ArrowRight } from "lucide-react";
import UpcomingCard from "./UpcomingCard";
import { Link } from "react-router-dom";
import { EventData, useData } from "../../../context/DataProviderContext";
import { useEffect, useState } from "react";
import ModalWrapper from "../../common/ModalWrapper";
import {motion} from "framer-motion"

export default function Upcomings() {
  const [openModal, setOpenModal] = useState(false);
  const { allEvents } = useData();
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  useEffect(() => {
    setOpenModal(selectedEvent ? true : false);
  }, [selectedEvent]);
  return (
    <section className="mt-15  lg:px-20 px-4 py-10  relative z-10"
      style={{ scrollbarWidth: "none" }}>
      <h2 className="md:text-4xl text-blue-prime font-bold text-2xl font-poppins w-full md:text-center">
        Upcoming
        <span className="text-yellow-300"> Special </span>
        Events
      </h2>
      <div className="mt-2 text-light-gray max-sm:hidden text-xl flex-wrap flex justify-start items-center gap-4">
        <p>Participate in Events of Koshish, Win prizes and Extra internals</p>
        <Link
          to={"/events"}
          className="text-purple-600  hover:text-pink-600  flex items-center gap-1 font-medium"
        >
          View All Events <ArrowRight />
        </Link>
      </div>

      {/* Puja Card */}
      <div className="flex items-center scrollbar-hidden max-md:flex-wrap lg:px-2 max-md:justify-center gap-6 md:mt-6 py-4 md:overflow-x-auto"
        style={{ scrollbarWidth: "none" }}>
        {allEvents?.slice(0, 4).map((item) => {
          return <UpcomingCard key={item._id} value={item} openDetailsHandler={setSelectedEvent} />;
        })}
      </div>
      <Link
        to={"/events"}
        className="text-pink-700 md:hidden mx-auto mt-6 flex items-center justify-center font-bold gap-1"
      >
        View All Events <ArrowRight />
      </Link>
              {/* Modal for Event Details */}
              <ModalWrapper open={openModal} setOpenModal={setOpenModal}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg flex flex-col min-w-[60%] shadow-lg p-8  max-w-lg text-gray-800"
          >
            {selectedEvent && (
              <>
                <h2 className="text-2xl font-bold">{selectedEvent.name}</h2>
                <p className="text-gray-700 mt-4">
                  <strong>Description:</strong> <br/>{selectedEvent.description}
                </p>
                <p className="text-gray-700 mt-4">
                  <strong>Part Type:</strong> {selectedEvent.part_type}
                </p>
                <p className="text-gray-700 mt-4">
                  <strong>Rules:</strong>
                </p>
               
                <ul className="list-disc pl-6 text-gray-600">
                  {selectedEvent.rules.map((rule: string, index: number) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
                <p className="text-gray-700 mt-4">
                  <strong>Points:</strong> {selectedEvent.points.join(", ")}
                </p>
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                    onClick={() => setSelectedEvent(null)}
                  >
                    Close
                  </button> 
                  <Link to={`/events/${selectedEvent._id}`}
                    className="px-4 py-2  text-white rounded-lg bg-[#9B1C1C] transition"
                  >
                    Results
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </ModalWrapper>
    </section>
  );
}
