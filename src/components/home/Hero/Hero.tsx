import { Link } from "react-router-dom";
import DownloadButton from "./DownloadButton";
import InfiniteCarousel from "./InfiniteCrousal";
export default function Hero() {
  return (
    <section className="md:flex relative gap-12 w-full  max-h-[612px] xl:px-30 lg:px-24 md:px-10 px-4 ">
      {/* Info */}
      <div className="md:my-20 my-10">
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
        <p className="text-text_secondary_dark max-w-2xl md:text-xl text-sm">
        Koshish is our college’s annual fest, featuring a dynamic mix of cultural and literary events. It provides a platform for students to showcase their talents in music, dance, drama, debates, poetry, and more. With a blend of creativity and intellect, Koshish celebrates expression, competition, and excellence.
        </p>

        {/* <div className="flex items-center gap-2 md:gap-4 my-5 max-sm:text-sm">
          <div
            className="flex border-[1px] rounded-xl border-gray-prime
           items-center gap-1 font-poppins font-bold text-blue-prime py-2 px-2 md:px-3  min-w-fit"
          >
            <img
              src={"/assets/images/home/hero/ladoo.avif"}
              alt="Rating"
              width={10}
              loading="eager"
              height={50}
              className="md:w-6 md:h-6 w-4 h-4 bg-cover"
            ></img>
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center">
                4.6
                <img
                  src={"/assets/images/home/hero/ladoo.avif"}
                  alt="Rating"
                  width={10}
                  loading="eager"
                  height={50}
                  className="md:w-6 md:h-6 w-4 h-4 bg-cover"
                ></img>
              </div>

               Some txt
            </div>
          </div>
          <div
            className="flex font-poppins  items-center gap-1 font-bold text-blue-prime rounded-xl
           border-[1px] border-gray-prime py-2 px-2 md:px-3 min-w-fit"
          >
            <img
              src={"/assets/images/home/hero/ladoo.avif"}
              alt="Rating"
              width={10}
              loading="eager"
              height={50}
              className="md:w-6 md:h-6 w-4 h-4 bg-cover"
            ></img>
            <p>Authentic Prasad</p>
          </div>
        </div> */}

        <div className="flex items-center gap-2 max-sm:flex-wrap md:gap-4 lg:gap-6 my-5 md:mt-14 mt-8 max-sm:text-sm">
          <Link
            to={"/events"}
            className="flex rounded-2xl  cursor-pointer  min-h-14 
            items-center justify-center bg-gradient-to-r text-[16px] md:text-lg md:min-w-54 font-poppins
            from-indigo-800 to-pink-700 min-w-fit max-sm:flex-1 font-bold text-white hover:opacity-80  px-4 md:px-6 md:py-3.5 py-2"
          >
            <p className="max-sm:hidden min-w-fit">
              Participate in Koshish
            </p>
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
