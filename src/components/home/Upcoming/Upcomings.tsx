import { ArrowRight } from "lucide-react";
import UpcomingCard from "./UpcomingCard";
import { Link } from "react-router-dom";
import { useData } from "../../../context/DataProviderContext";

export default function Upcomings() {
  const { allEvents } = useData();

  return (
    <section className="mt-15  lg:px-20 px-4 py-10  relative z-10" 
    style={{scrollbarWidth: "none"}}>
      <h2 className="md:text-4xl text-blue-prime font-bold text-2xl font-poppins w-full md:text-center">
        Upcoming 
        <span className="text-yellow-300"> Special </span>
        Events
      </h2>
      <div className="mt-2 text-light-gray max-sm:hidden text-xl flex-wrap flex justify-center items-center gap-4">
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
       style={{scrollbarWidth: "none"}}>
        {allEvents?.slice(0, 4).map((item) => {
          return <UpcomingCard key={item._id} value={item} />;
        })}
      </div>
      <Link
        to={"/events"}
        className="text-pink-700 md:hidden mx-auto mt-6 flex items-center justify-center font-bold gap-1"
      >
        View All Events <ArrowRight />
      </Link>
    </section>
  );
}
