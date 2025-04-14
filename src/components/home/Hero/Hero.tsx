import { Link } from "react-router-dom";
import DownloadButton from "./DownloadButton";
import InfiniteCarousel from "./InfiniteCrousal";

export default function Hero() {
  return (
    <section className="md:flex relative gap-12 w-full mb-8   max-h-[640px] xl:px-30 lg:px-24 md:px-10 px-4 ">
      {/* Info */}
      <div className="my-10 md:my-20">
        <div className="flex w-fit relative items-center gap-1 px-3  py-1.5  text-sm font-semibold text-gray-prime-10 border rounded-lg border-red-800">
          🎉 70+ Events to win
        </div>

        <h1
          className="my-4 max-w-xl lg:leading-[60px] text-gray-900 font-bold
          lg:text-5xl md:text-3xl text-2xl  break-words  
         font-poppins"
        >
          Koshish Fest – Unleash Your Talent
        </h1>
        <p className="max-w-2xl text-sm text-text_secondary_dark md:text-xl">
          Koshish is our college’s annual fest, featuring a dynamic mix of cultural and literary events. It provides a platform for students to showcase their talents in music, dance, drama, debates, poetry, and more. With a blend of creativity and intellect, Koshish celebrates expression, competition, and excellence.
        </p>



        <div className="flex items-center gap-2 my-5 mt-8 max-sm:flex-wrap md:gap-4 lg:gap-6 md:mt-14 max-sm:text-sm">
          <Link
            to={"/events"}
            className="flex rounded-2xl  cursor-pointer  min-h-14 
            items-center justify-center bg-[#9B1C1C] text-[16px] w-full md:text-lg md:min-w-54 font-poppins
           font-bold text-white hover:opacity-80  px-4 md:px-6 md:py-3.5 py-2"
          >

            Explore Koshish Events

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
