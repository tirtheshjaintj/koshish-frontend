import { Link } from "react-router-dom";
import DownloadButton from "./DownloadButton";
import InfiniteCarousel from "./InfiniteCrousal";

export default function Hero() {
  return (
    <section className="md:flex relative gap-12 w-full  max-h-[612px] xl:px-30 lg:px-24 md:px-10 px-4 ">
      {/* Info */}
      <div className="md:my-20 my-10">
        <div className="flex w-fit relative items-center gap-1 px-3  py-1.5  text-sm font-semibold text-gray-prime-10 border rounded-lg border-red-800">
          🎉 50+ Events to win
        </div>

        <h1
          className="my-4 max-w-xl lg:leading-[60px] text-gray-900 font-bold
          lg:text-5xl md:text-3xl text-2xl  break-words  
         font-poppins"
        >
          Participate in Events of Koshish
        </h1>
        <p className="text-text_secondary_dark max-w-2xl md:text-xl text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim aliquid
          quasi praesentium dolorum modi, cum accusamus. Dicta expedita eius
          culpa aperiam perferendis dolorem ut, repellendus, id optio vero,
          ducimus officiis.
        </p>

        

        <div className="flex items-center gap-2 max-sm:flex-wrap md:gap-4 lg:gap-6 my-5 md:mt-14 mt-8 max-sm:text-sm">
          <Link
            to={"/events"}
            className="flex rounded-2xl  cursor-pointer  min-h-14 
            items-center justify-center bg-gradient-to-r text-[16px] md:text-lg md:min-w-54 font-poppins
            from-indigo-800 to-pink-700 min-w-fit max-sm:flex-1 font-bold text-white hover:opacity-80  px-4 md:px-6 md:py-3.5 py-2"
          >
        
              Participate in Koshish
          
           </Link>

          {/* Download and Playstore */}
          <DownloadButton />
        </div>
      </div>

      {/* Infinite vertical crousal */}
      <div className="flex-1 max-sm:hidden">
        <InfiniteCarousel />
      </div>
    </section>
  );
}
