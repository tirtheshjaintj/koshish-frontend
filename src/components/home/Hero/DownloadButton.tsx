import { Link } from "react-router-dom";

export default function DownloadButton() {
  return (
    <Link
      to={"/"}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center w-auto gap-[6px] md:gap-2 max-sm:flex-1  justify-center font-bold text-[16px] font-poppins md:text-lg
bg-white text-gray-900 rounded-2xl border border-stone-300  md:min-w-54 min-h-14 
py-2 md:px-6 px-4 hover:shadow-md  transition-all min-w-fit"
    >
      <img
        src={"/assets/images/home/hero/apple.png"}
        width={24}
        height={24}
        alt="App Store"
        className="w-6 h-6"
      />

      <div className="w-[1px] md:h-6 h-4 bg-blue-prime" />

      <img
  src=""
  width={24}
  height={24}
  alt="App Store"
  className="w-6 h-6"
/>


      <p className="min-w-fit">Download App</p>
    </Link>
  );
}
