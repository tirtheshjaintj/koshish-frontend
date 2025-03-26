import { ArrowRight } from "lucide-react";
import UpcomingCard from "./UpcomingCard";
import { Link } from "react-router-dom";
import { EventData, useData } from "../../../context/DataProviderContext";
import { useEffect, useState } from "react";
import ModalWrapper from "../../common/ModalWrapper";
import { motion } from "framer-motion"

export default function Upcomings() {
  const [openModal, setOpenModal] = useState(false);
  const { allEvents } = useData();
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  useEffect(() => {
    setOpenModal(selectedEvent ? true : false);
  }, [selectedEvent]);
  return (
    <section className="relative z-10 px-4 py-10 mt-15 lg:px-20"
      style={{ scrollbarWidth: "none" }}>
      <h2 className="w-full text-2xl font-bold md:text-4xl text-blue-prime font-poppins md:text-center">
        Upcoming
        <span className="text-[#9B1C1C]"> Special </span>
        Events
      </h2>
      <div className="flex flex-wrap items-center justify-start gap-4 mt-2 text-xl text-light-gray max-sm:hidden">
        <p>Participate in Events of Koshish, Win prizes and Extra internals</p>
        <Link
          to={"/events"}
          className="flex items-center gap-1 font-medium text-purple-600 hover:text-pink-600"
        >
          View All Events <ArrowRight />
        </Link>
      </div>

      {/* Puja Card */}
      <div className="flex items-center gap-6 py-4 scrollbar-hidden max-md:flex-wrap lg:px-2 max-md:justify-center md:mt-6 md:overflow-x-auto"
        style={{ scrollbarWidth: "none" }}>
        {allEvents?.slice(0, 4).map((item) => {
          return <UpcomingCard key={item._id} value={item} openDetailsHandler={setSelectedEvent} />;
        })}
      </div>
      <Link
        to={"/events"}
        className="flex items-center justify-center gap-1 mx-auto mt-6 font-bold text-pink-700 md:hidden"
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
              <p className="mt-4 text-gray-700">
                <strong>Description:</strong> <br />{selectedEvent.description}
              </p>
              <p className="mt-4 text-gray-700">
                <strong>Part Type:</strong> {selectedEvent.part_type}
              </p>
              <p className="mt-4 text-gray-700">
                <strong>Rules:</strong>
              </p>

              <ul className="pl-6 text-gray-600 list-disc">
                {selectedEvent.rules.map((rule: string, index: number) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
              <p className="mt-4 text-gray-700">
                <strong>Points:</strong> {selectedEvent.points.join(", ")}
              </p>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="px-4 py-2 text-white transition bg-gray-500 rounded-lg hover:bg-gray-600"
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
