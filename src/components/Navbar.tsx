import { useState, useEffect } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { addUser } from "../store/userSlice";
import toast from "react-hot-toast";
import { HiMenu } from "react-icons/hi";

let deferredPrompt: any = null;

export default function Nav() {
    const navigate = useNavigate();
    const cookie = new Cookies();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const [isInstallable, setIsInstallable] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const signOut = () => {
        cookie.remove('user_token', { path: '/' });
        navigate("/user/login");
        dispatch(addUser(null));
    };

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
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
                } else {
                    console.log("User dismissed the install prompt");
                }
            } catch (err) {
                console.error("Failed to install the app", err);
                toast.error("Failed to install the app");
            }
        }
    };

    return (
        <Navbar className="sticky top-0 z-10 bg-slate-100 backdrop-blur-3xl">
            <div className="flex flex-grow" onClick={isInstallable ? install : undefined}>
                <Link to="/" className="flex">
                    <img src="/pcte.jpeg" className="h-12 mr-3" alt="PCTE Koshish App" />
                    <h1 className="self-center text-2xl font-semibold cursor-pointer whitespace-nowrap">
                        PCTE&nbsp;
                    </h1>
                </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden space-x-6 md:flex">
                <Link to="/events" className="text-lg font-medium hover:text-blue-600">
                    Events
                </Link>
                <Link to="/results" className="text-lg font-medium hover:text-blue-600">
                    Results
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-2xl">
                    <HiMenu />
                </button>
            </div>

            {/* User Dropdown */}
            <div className="flex justify-end flex-grow md:order-2">
                <Dropdown arrowIcon={false} inline label={<Avatar alt={`${user?.name}`} img="" rounded />}>
                    {user ? (
                        <>
                            <Dropdown.Header>
                                <span className="block text-sm">{`${user?.name}`}</span>
                                <span className="block text-sm font-medium truncate">{`${user?.email}`}</span>
                            </Dropdown.Header>
                            <Link to={"/user/dashboard"}>
                                <Dropdown.Item>Dashboard</Dropdown.Item>
                            </Link>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
                        </>
                    ) : (
                        <Link to={"/user/login"}>
                            <Dropdown.Item>Become User</Dropdown.Item>
                        </Link>
                    )}
                </Dropdown>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="absolute w-48 p-4 bg-white rounded-lg shadow-lg top-16 right-4 md:hidden">
                    <Link to="/events" className="block px-4 py-2 text-lg font-medium hover:bg-gray-100">
                        Events
                    </Link>
                    <Link to="/results" className="block px-4 py-2 text-lg font-medium hover:bg-gray-100">
                        Results
                    </Link>
                </div>
            )}
        </Navbar>
    );
}

