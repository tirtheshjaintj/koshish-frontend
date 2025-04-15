import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { FaBars } from "react-icons/fa6";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addUser } from "../../store/userSlice";
import { RootState } from "../../store/store";

// ✅ Define User Type
type User = {
  user_type: string;
  avatar: string;
  name: string;
  email: string;
};

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

export const navListItems = [
  { name: "Home", url: "/" },
  { name: "Results", url: "/results" },
  { name: "Events", url: "/events" },
];

export default function Nav() {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const dispatch = useDispatch();

  // ✅ Ensure Correct Typing
  const user: User | null = useSelector((state: RootState) => state.user) as User | null;

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e as BeforeInstallPromptEvent;
      setIsInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
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

  return (
    <header
      className={`h-16 py-4 px-4 lg:px-24 md:px-10 flex w-full items-center justify-between sticky top-0 z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow-md bg-white/40 backdrop-blur-xl" : "bg-white"
      }`}
    >
      {/* Left Section */}
      <div className="flex items-center">
        <FaBars onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="cursor-pointer lg:hidden" />
      </div>

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2" onClick={isInstallable ? install : undefined}>
        <img src="/pcte.jpeg" className="w-10 h-10" alt="Logo" />
        <h1 className="text-2xl font-semibold">PCTE</h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="items-center justify-center flex-1 hidden gap-8 font-semibold lg:flex">
        {navListItems.map((item) => (
          <Link
            key={item.url}
            to={item.url}
            className={`hover:text-red-600 ${pathname === item.url ? "text-red-800" : "text-gray-800"}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Profile Dropdown */}
      <div className="relative flex items-center gap-4">
        <div ref={profileRef} onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 cursor-pointer">
          <img
            alt="Profile"
            className="object-cover w-8 h-8 rounded-full"
            src={user?.avatar ?? "https://variety.com/wp-content/uploads/2020/08/avatar-the-last-airbender-3.jpg"}
          />
          <span className="font-semibold max-sm:hidden">{user?.name ?? "Guest"}</span>
        </div>

        {isProfileOpen && (
          <div className="absolute right-0 w-48 p-3 bg-white rounded-lg shadow-lg top-12">
            {user ? (
              <>
                <span className="block px-4 py-2 font-bold text-black hover:bg-gray-100">{user.name}</span>
                <Link
                  to={
                    user.user_type === "Admin"
                      ? "/user/dashboard/faculties"
                      : user.user_type === "Convenor"
                      ? "/user/dashboard/events"
                      : user.user_type === "Class"
                      ? "/user/dashboard/registerEvent"
                      : "/user/dashboard"
                  }
                  onClick={() => setIsProfileOpen(false)}
                  className="block px-4 py-2 border-t hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <div className="my-2 border-t"></div>
                <div onClick={signOut} className="flex items-center gap-2 px-4 py-2 text-red-500 cursor-pointer hover:bg-gray-100">
                  <BiLogOut />
                  Log Out
                </div>
              </>
            ) : (
              <Link to="/user/login" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
                Become User
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 z-50 w-full py-4 bg-white shadow-md top-16">
          {navListItems.map((item) => (
            <Link key={item.url} to={item.url} onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-3 text-lg hover:bg-gray-100">
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
