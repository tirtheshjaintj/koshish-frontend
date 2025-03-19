import { useEffect, useRef, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaBars } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import MobileNavbar from "./MobileNavbar";
import ProfileOptions from "./ProfileOptions";

export const navListItems = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Results",
    url: "/results",
  },
  {
    name: "Events",
    url: "/events",
  },
];

function StaticNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const pathname = useLocation().pathname;
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        event.target instanceof Node &&  
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
    <header
      className={`h-16 py-4 px-4 lg:px-24 md:px-10 flex items-center text-blue-prime justify-between
      sticky top-0 z-50 w-full transition-shadow duration-300 
      ${isScrolled ? "shadow-md bg-white/40 backdrop-blur-xl " : "bg-white "}
    `}
    >
      <div className="flex items-center">
        <FaBars
          // strokeWidth={1.75}
          onClick={() => setIsOpen(true)}
          className="lg:hidden"
        />
      </div>

      <Link
        to={"/"}
        className="relative w-fit font-semibold max-lg:flex items-center justify-center"
      >
        PCTE
        {/* <img
          src={"/public/pcte.jpeg"}
          alt="logo"
          height={30}
          width={150}
          className="object-contain w-[100px] h-[30px]"
        /> */}
      </Link>

      <div className="flex-1 flex items-center justify-between  max-lg:hidden gap-10">
        <nav className="w-full flex items-center justify-center font-quicksand font-semibold gap-8">
          {navListItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.url}
              className={`hover:text-yellow-prime ${
                pathname === item.url ? "text-yellow-prime" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex max-sm:hidden  items-center lg:ml-4 gap-4 ">
        <div
          ref={profileRef}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex  relative items-center gap-4 "
        >
          <div className="min-w-7 min-h-7 drop-shadow-sm rounded-full relative overflow-clip">
            <img
              alt="profile"
              className="bg-cover w-7 h-7"
              src={
                "https://variety.com/wp-content/uploads/2020/08/avatar-the-last-airbender-3.jpg"
              }
            />
          </div>
          <p className="font-semibold min-w-fit cursor-pointer hover:opacity-80">
            Aniket Gupta
          </p>
          {isProfileOpen && (
            <div className="absolute top-10  -left-20 w-60 bg-white shadow-md max-h-fit p-4 flex flex-col gap-4">
              <h4 className="text-gray-prime-10 font-poppins font-semibold">
                Account
              </h4>
              <ProfileOptions />
              <div className="min-h-[1px] w-full bg-gray-200 " />
              <div className="flex items-center gap-3 text-red-500">
                <BiLogOut
                  strokeWidth={1.5}
                  className="rotate-180 hover:text-red-400"
                />
                Log Out
              </div>
            </div>
          )}
        </div>
      </div>

      <MobileNavbar setIsOpen={setIsOpen} isOpen={isOpen} />
    </header>
  );
}

export default StaticNavbar;
