import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { addUser } from "../store/userSlice";
import toast from "react-hot-toast";
import { HiMenu } from "react-icons/hi";
let deferredPrompt = null;
export default function Nav() {
    const navigate = useNavigate();
    const cookie = new Cookies();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [isInstallable, setIsInstallable] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const signOut = () => {
        cookie.remove('user_token', { path: '/' });
        navigate("/user/login");
        dispatch(addUser(null));
    };
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
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === "accepted") {
                    console.log("User accepted the install prompt");
                    deferredPrompt = null;
                    setIsInstallable(false);
                }
                else {
                    console.log("User dismissed the install prompt");
                }
            }
            catch (err) {
                console.error("Failed to install the app", err);
                toast.error("Failed to install the app");
            }
        }
    };
    return (_jsxs(Navbar, { className: "sticky top-0 z-10 bg-slate-100 backdrop-blur-3xl", children: [_jsx("div", { className: "flex flex-grow", onClick: isInstallable ? install : undefined, children: _jsxs(Link, { to: "/", className: "flex", children: [_jsx("img", { src: "/pcte.jpeg", className: "h-12 mr-3", alt: "PCTE Koshish App" }), _jsx("h1", { className: "self-center text-2xl font-semibold cursor-pointer whitespace-nowrap", children: "PCTE\u00A0" })] }) }), _jsxs("div", { className: "hidden space-x-6 md:flex", children: [_jsx(Link, { to: "/events", className: "text-lg font-medium hover:text-blue-600", children: "Events" }), _jsx(Link, { to: "/results", className: "text-lg font-medium hover:text-blue-600", children: "Results" })] }), _jsx("div", { className: "flex items-center md:hidden", children: _jsx("button", { onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), className: "text-2xl", children: _jsx(HiMenu, {}) }) }), _jsx("div", { className: "flex justify-end flex-grow md:order-2", children: _jsx(Dropdown, { arrowIcon: false, inline: true, label: _jsx(Avatar, { alt: `${user?.name}`, img: "", rounded: true }), children: user ? (_jsxs(_Fragment, { children: [_jsxs(Dropdown.Header, { children: [_jsx("span", { className: "block text-sm", children: `${user?.name}` }), _jsx("span", { className: "block text-sm font-medium truncate", children: `${user?.email}` })] }), _jsx(Link, { to: "/user/dashboard", children: _jsx(Dropdown.Item, { children: "Dashboard" }) }), _jsx(Dropdown.Divider, {}), _jsx(Dropdown.Item, { onClick: signOut, children: "Sign out" })] })) : (_jsx(Link, { to: "/user/login", children: _jsx(Dropdown.Item, { children: "Become User" }) })) }) }), isMobileMenuOpen && (_jsxs("div", { className: "absolute w-48 p-4 bg-white rounded-lg shadow-lg top-16 right-4 md:hidden", children: [_jsx(Link, { to: "/events", className: "block px-4 py-2 text-lg font-medium hover:bg-gray-100", children: "Events" }), _jsx(Link, { to: "/results", className: "block px-4 py-2 text-lg font-medium hover:bg-gray-100", children: "Results" })] }))] }));
}
