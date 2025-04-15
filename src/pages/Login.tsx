import React, { useEffect, useState } from "react";
import EyeToggleSVG from "../components/Eye";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import toast from "react-hot-toast";
import Cookie from "universal-cookie";
import GoogleBox from "../components/GoogleBox";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import Nav from "../components/home/StaticNavbar";
import Loader from "../components/common/Loader";


function Login() {
  const [activeTab, setActiveTab] = useState<"class" | "faculty">("faculty");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const cookie = new Cookie();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "PCTE User Login";
    const token = cookie.get("user_token");
    if (token) navigate("/user/dashboard");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (credentials.password.length < 8) {
      toast.error("Invalid credentials");
      return;
    }
    try {
      setIsLoading(true);
      const endpoint = activeTab === "faculty" ? "/user/login" : "/class/login";
      const payload =
        activeTab === "faculty"
          ? {
            email: credentials.email.toLowerCase().trim(),
            password: credentials.password,
          }
          : {
            username: credentials.username.toLowerCase().trim(),
            password: credentials.password,
          };

      const response = await axiosInstance.post(endpoint, payload);
      dispatch(addUser(response.data.data));
      console.log(response.data);
      toast.success("Logged In Successfully");
      const token = response?.data?.token;
      if (token) {
        cookie.set("user_token", token, {
          path: "/",
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });
        const user_type = response.data.data.user_type;
        if (user_type == "Admin") {
          navigate("/user/dashboard/faculties");
        } else if (user_type == "Convenor") {
          navigate("/user/dashboard/events");
        } else {
          navigate("/user/dashboard/registerEvent");
        }
      }
    } catch (error: any) {
      const error_msg = error.response?.data?.message || "An error occurred";
      toast.error(error_msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center min-h-screen mx-auto my-10 bg-white">
        <div className="w-full bg-white border border-red-800 shadow-2xl rounded-xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-8 space-y-6">
            <div className="flex justify-around pb-2 border-b border-stone-200">
              <button
                className={`px-4 py-2 relative text-stone-700 transition-colors duration-300 ${activeTab === "faculty"
                  ? "font-semibold text-red-800 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-800"
                  : "hover:text-red-800"
                  }`}
                onClick={() => setActiveTab("faculty")}
              >
                Admin Login
              </button>
              <button
                className={`px-4 py-2 relative text-stone-700 transition-colors duration-300 ${activeTab === "class"
                  ? "font-semibold text-red-800 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-800"
                  : "hover:text-red-800"
                  }`}
                onClick={() => setActiveTab("class")}
              >
                Class Login
              </button>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-center text-stone-800">
              Welcome Back
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === "faculty" ? (
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-3 text-sm font-medium text-stone-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={credentials.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-stone-700 bg-white border-2 border-stone-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition-all"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-3 text-sm font-medium text-stone-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={credentials.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-stone-700 bg-white border-2 border-stone-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition-all"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-3 text-sm font-medium text-stone-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pr-12 text-stone-700 bg-white border-2 border-stone-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 transition-colors text-stone-500 hover:text-red-800"
                    onClick={handleShowPasswordToggle}
                  >
                    <EyeToggleSVG
                      handleShowPasswordToggle={handleShowPasswordToggle}
                    />
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center w-full py-3 font-semibold text-white transition-colors duration-300 bg-red-800 rounded-lg hover:bg-red-900"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader />
                ) : (
                  "Sign In"
                )}
              </button>

              {activeTab === "faculty" && (
                <GoogleBox setIsLoading={setIsLoading} />
              )}

              <div className="pt-4 text-center">
                <Link
                  to="/user/forgot"
                  className="text-sm font-medium text-red-800 underline transition-colors hover:text-red-900 underline-offset-4"
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
