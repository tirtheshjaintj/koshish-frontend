import React from "react";
import InfiniteMarquee from "./InfiniteMarquee";
// Demo data
const demoData = [
  {
    id: 1,
    src: "https://tse1.mm.bing.net/th?id=OIP.4RFya1HIArbOoKomXixZwgHaEK&pid=Api&P=0&h=180",
    alt: "Economics Times",
  },
  {
    id: 2,
    src: "https://tse4.mm.bing.net/th?id=OIP.L-KZAIyHphVjl10qONJkRQHaCy&pid=Api&P=0&h=180",
    alt: "Entrackr",
  },
  {
    id: 3,
    src: "https://tse3.mm.bing.net/th?id=OIP.DQEec4LFcX7qwmnEm_qhBQHaD5&pid=Api&P=0&h=180",
    alt: "Entrepreneur",
  },
  {
    id: 4,
    src: "https://tse4.mm.bing.net/th?id=OIP.1bo3OYV6lGTqd231-INzAAHaE8&pid=Api&P=0&h=180",
    alt: "VCCircle",
  },
  {
    id: 5,
    src: "https://tse3.mm.bing.net/th?id=OIP.DQEec4LFcX7qwmnEm_qhBQHaD5&pid=Api&P=0&h=180",
    alt: "ABP",
  },
  {
    id: 6,
    src: "https://tse1.mm.bing.net/th?id=OIP.4RFya1HIArbOoKomXixZwgHaEK&pid=Api&P=0&h=180",
    alt: "Inc42",
  },
];

const Featured: React.FC = () => {
  return (
    <div className=" bg-stone-900 pt-10 pb-6 font-poppins bg-gradient-to-r bg-stone-900 text-white">
      <h2 className=" mb-3 md:text-4xl text-2xl font-bold w-full md:text-center px-4">
        Our
        <span className="text-[#FFDC7D]"> Sponsors</span>
      </h2>

      {/* Infinite Horizontal Carousel */}
      <InfiniteMarquee>
        {demoData.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl hover:scale-110 transition-all duration-300 min-w-44 px-4 bg-gray-100 mx-2 flex items-center justify-center md:h-16 h-14 overflow-hidden box-border drop-shadow-[0px_0px_8px_rgba(255,255,255,0.8)]"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="object-contain w-auto h-auto min-w-full min-h-full  max-h-full"
            />
          </div>
        ))}
      </InfiniteMarquee>
    </div>
  );
};

export default Featured;
