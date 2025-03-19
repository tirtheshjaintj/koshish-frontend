import { Link, useLocation } from "react-router-dom";
import ProfileOptions from "./ProfileOptions";
import { navListItems } from "./StaticNavbar";
import { LogOut, X } from "lucide-react";

export default function MobileNavbar({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  const pathname = useLocation().pathname;

  return (
    <div
      className={`flex h-screen overflow-y-auto flex-col w-full absolute top-0 left-0 ${
        isOpen ? "flex" : "-translate-x-full md:hidden"
      } bg-gray-100 transistion-all duration-300 z-50  gap-4`}
      style={{ scrollbarWidth: "none" }}
    >
      <div className="bg-white w-full sticky top-0 shadow flex items-center justify-between p-4">
        <div className="items-center hidden gap-2">
          <div className="min-w-7  min-h-7  rounded-full relative overflow-clip">
            <img
              alt="profile"
              className="bg-cover"
              src={
                "https://plus.unsplash.com/premium_photo-1689977871600-e755257fb5f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          </div>
          Aniket Gupta
        </div>
        <X strokeWidth={1.25} onClick={() => setIsOpen(false)} />
      </div>

      <div className=" hidden   flex-col gap-4 px-4 ">
        <ProfileOptions />
      </div>

      {/* <div className="min-h-[1px] w-full bg-gray-200 " /> */}

      <div className="flex flex-col gap-4 px-4 flex-1">
        {navListItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.url}
            onClick={() => setIsOpen(false)}
            className={`hover:text-stone-800 ${
              pathname === item.url && "text-black font-bold font-poppins"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* <div className="min-h-[1px] w-full bg-gray-200 " />
      <div className="max-w-70 p-4"> */}
      {/* <DownloadButton /> */}
      {/* </div> */}

      <div className="bg-white w-full text-red-500 shadow p-4 sticky  bottom-0">
        <button className="flex items-center gap-3">
          <LogOut strokeWidth={1.25} className="rotate-180" /> Log out
        </button>
      </div>
    </div>
  );
}
