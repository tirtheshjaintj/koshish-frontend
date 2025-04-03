import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { FaBars } from "react-icons/fa6";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addUser } from "../../store/userSlice";
let deferredPrompt = null;
const navListItems = [
    { name: "Home", url: "/" },
    { name: "Results", url: "/results" },
    { name: "Events", url: "/events" },
];
export default function Nav() {
    const navigate = useNavigate();
    const cookie = new Cookies();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isInstallable, setIsInstallable] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
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
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            deferredPrompt = e;
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
            }
            catch (err) {
                console.error("Failed to install the app", err);
                toast.error("Failed to install the app");
            }
        }
    };
    return (_jsxs("header", { className: `h-16 py-4 px-4 lg:px-24 md:px-10 flex w-full items-center justify-between sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? "shadow-md bg-white/40 backdrop-blur-xl" : "bg-white"}`, children: [_jsx("div", { className: "flex items-center", children: _jsx(FaBars, { onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), className: "cursor-pointer lg:hidden" }) }), _jsxs(Link, { to: "/", className: "flex items-center gap-2", onClick: isInstallable ? install : undefined, children: [_jsx("img", { src: "/pcte.jpeg", className: "w-10 h-10", alt: "Logo" }), _jsx("h1", { className: "text-2xl font-semibold", children: "PCTE" })] }), _jsx("nav", { className: "items-center justify-center flex-1 hidden gap-8 font-semibold lg:flex", children: navListItems.map((item) => (_jsx(Link, { to: item.url, className: `hover:text-red-600 ${pathname === item.url ? "text-red-800" : "text-gray-800"}`, children: item.name }, item.url))) }), _jsxs("div", { className: "relative flex items-center gap-4", children: [_jsxs("div", { ref: profileRef, onClick: () => setIsProfileOpen(!isProfileOpen), className: "flex items-center gap-3 cursor-pointer", children: [_jsx("img", { alt: "Profile", className: "object-cover w-8 h-8 rounded-full", src: user?.avatar ||
                                    "https://variety.com/wp-content/uploads/2020/08/avatar-the-last-airbender-3.jpg" }), _jsx("span", { className: "font-semibold max-sm:hidden", children: user?.name || "Guest" })] }), isProfileOpen && (_jsx("div", { className: "absolute right-0 w-48 p-3 bg-white rounded-lg shadow-lg top-12", children: user ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "block px-4 py-2 font-bold text-black hover:bg-gray-100", children: user?.name || "Guest" }), _jsx(Link, { to: user?.user_type === "Admin"
                                        ? "/user/dashboard/faculties"
                                        : user?.user_type === "Convenor"
                                            ? "/user/dashboard/events"
                                            : user?.user_type === "Class"
                                                ? "/user/dashboard/registerEvent"
                                                : "/user/dashboard", onClick: () => setIsProfileOpen(false), className: "block px-4 py-2 border-t hover:bg-gray-100", children: "Dashboard" }), _jsx("div", { className: "my-2 border-t" }), _jsxs("div", { onClick: signOut, className: "flex items-center gap-2 px-4 py-2 text-red-500 cursor-pointer hover:bg-gray-100", children: [_jsx(BiLogOut, {}), "Log Out"] })] })) : (_jsx(Link, { to: "/user/login", onClick: () => setIsProfileOpen(false), className: "block px-4 py-2 hover:bg-gray-100", children: "Become User" })) }))] }), isMobileMenuOpen && (_jsx("div", { className: "absolute left-0 z-50 w-full py-4 bg-white shadow-md top-16", children: navListItems.map((item) => (_jsx(Link, { to: item.url, onClick: () => setIsMobileMenuOpen(false), className: "block px-6 py-3 text-lg hover:bg-gray-100", children: item.name }, item.url))) }))] }));
}
