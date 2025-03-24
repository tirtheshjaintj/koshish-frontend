import { useState ,useEffect} from "react";
import { FaDownload } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { addUser } from "../../../store/userSlice";
import toast from "react-hot-toast";
let deferredPrompt: any = null;

export default function DownloadButton() {
  const navigate=useNavigate();

  const cookie = new Cookies();
  const [isInstallable, setIsInstallable] = useState(false);
  const dispatch = useDispatch();

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
    <button
      className="flex items-center w-auto gap-[6px] md:gap-2 max-sm:flex-1  justify-center font-bold text-[16px] font-poppins md:text-lg
bg-white text-gray-900 rounded-2xl border border-stone-300  md:min-w-54 min-h-14 
py-2 md:px-6 px-4 hover:shadow-md  transition-all min-w-fit"
    onClick={isInstallable ? install : undefined}
    >
      <div className="w-[1px] md:h-6 h-4 bg-blue-prime" />
      <FaDownload className="text-lg"/>
      <p className="min-w-fit">Download App</p>
    </button>
  );
}
