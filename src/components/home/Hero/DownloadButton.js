import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
let deferredPrompt = null;
export default function DownloadButton() {
    const navigate = useNavigate();
    const cookie = new Cookies();
    const [isInstallable, setIsInstallable] = useState(false);
    const dispatch = useDispatch();
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
    return (_jsxs("button", { className: "flex items-center w-auto gap-[6px] md:gap-2 max-sm:flex-1  justify-center font-bold text-[16px] font-poppins md:text-lg\r\nbg-white text-gray-900 rounded-2xl border border-stone-300  md:min-w-54 min-h-14 \r\npy-2 md:px-6 px-4 hover:shadow-md  transition-all min-w-fit", onClick: isInstallable ? install : undefined, children: [_jsx("div", { className: "w-[1px] md:h-6 h-4 bg-blue-prime" }), _jsx(FaDownload, { className: "text-lg" }), _jsx("p", { className: "min-w-fit", children: "Download App" })] }));
}
