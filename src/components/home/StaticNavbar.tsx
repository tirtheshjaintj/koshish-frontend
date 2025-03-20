import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { FaBars } from "react-icons/fa6";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addUser } from "../../store/userSlice";
import { RootState } from "../../store/store";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

const navListItems = [
  { name: "Home", url: "/" },
  { name: "Results", url: "/results" },
  { name: "Events", url: "/events" },
];

type User = {
  user_type?: string;
  avatar?: string;
  name?: string;
  email?: string;
};

export default function Nav() {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const dispatch = useDispatch();
  
  
  const user: User | null = useSelector((state: RootState) => state.user);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = useLocation().pathname;

  const signOut = () => {
    cookie.remove("user_token", { path: "/" });
    navigate("/user/login");
    dispatch(addUser(null));
  };

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e as BeforeInstallPromptEvent;
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const install = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          deferredPrompt = null;
          setIsInstallable(false);
        }
      } catch (err) {
        console.error("Failed to install the app", err);
        toast.error("Failed to install the app");
      }
    }
  };

  // Handle click outside for closing profile dropdown
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
      className={`h-16 py-4 px-4 lg:px-24 md:px-10 flex w-full items-center justify-between sticky top-0 z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow-md bg-white/40 backdrop-blur-xl" : "bg-white"
      }`}
    >
      {/* Left Section */}
      <div className="flex items-center">
        {/* Mobile Menu Button */}
        <FaBars
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden cursor-pointer"
        />
      </div>

      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2"
        onClick={isInstallable ? install : undefined}
      >
        <img src="/pcte.jpeg" className="h-10 w-auto" alt="Logo" />
        <h1 className="text-2xl font-semibold">PCTE</h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex flex-1 justify-center items-center gap-8 font-semibold">
        {navListItems.map((item) => (
          <Link
            key={item.url}
            to={item.url}
            className={`hover:text-red-600 ${
              pathname === item.url ? "text-red-800" : "text-gray-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Profile Dropdown */}
      <div className="relative flex items-center gap-4">
        <div
          ref={profileRef}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="cursor-pointer flex items-center gap-3"
        >
          <img
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
            src={
              user?.avatar ||
              "https://variety.com/wp-content/uploads/2020/08/avatar-the-last-airbender-3.jpg"
            }
          />
          <span className="font-semibold max-sm:hidden">
            {user?.name || "Guest"}
          </span>
        </div>

        {isProfileOpen && (
          <div className="absolute top-12 right-0 w-48 bg-white shadow-lg rounded-lg p-3">
            {user ? (
              <>
                <span className="block px-4 py-2 text-black font-bold hover:bg-gray-100">
                  {user?.name || "Guest"}
                </span>
                <Link
                  to="/user/dashboard"
                  className="block px-4 border-t py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <div className="border-t my-2"></div>
                <div
                  onClick={signOut}
                  className="flex items-center gap-2 px-4 py-2 text-red-500 cursor-pointer hover:bg-gray-100"
                >
                  <BiLogOut />
                  Log Out
                </div>
              </>
            ) : (
              <Link
                to="/user/login"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Become User
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 py-4">
          {navListItems.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-6 py-3 text-lg hover:bg-gray-100"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
