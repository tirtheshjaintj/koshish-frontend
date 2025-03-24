import React, { useEffect, useState } from "react";
import EyeToggleSVG from "../components/Eye";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../config/axiosConfig';
import toast from 'react-hot-toast';
import Cookie from "universal-cookie";
import Navbar from "../components/Navbar";
import GoogleBox from "../components/GoogleBox";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from '../store/userSlice';
import { RootState } from "../store/store";
import Nav from "../components/home/StaticNavbar";
type User = {
    user_type?: string;
    avatar?: string;
    name?: string;
    email?: string;
  };

  
function Login() {
    const [activeTab, setActiveTab] = useState<'class' | 'faculty'>('faculty');
    const [credentials, setCredentials] = useState({ email: "", password: "", username: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const cookie = new Cookie();
    const dispatch = useDispatch();
    const user: User | null = useSelector((state: RootState) => state.user);
    

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
            const payload = activeTab === "faculty" 
                ? { email: credentials.email.toLowerCase(), password: credentials.password } 
                : { username: credentials.username.toLowerCase(), password: credentials.password };

            const response = await axiosInstance.post(endpoint, payload);
            dispatch(addUser(response.data.data));
            console.log(response.data);
            toast.success("Logged In Successfully");
            const token = response?.data?.token;
            if (token) {
                cookie.set("user_token", token, { path: "/", expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) });
                const user_type=response.data.data.user_type;
                if(user_type=="Admin"){
                navigate("/user/dashboard/faculties");
                }else if(user_type=="Convenor"){
                navigate("/user/dashboard/events");   
                }else{
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
            <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
                <div className="w-full rounded-lg shadow-lg bg-slate-100 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="flex justify-around border-b pb-2">
                            <button className={`px-4 py-2 ${activeTab === 'faculty' ? 'font-bold' : ''}`} onClick={() => setActiveTab('faculty')}>Faculty Login</button>
                            <button className={`px-4 py-2 ${activeTab === 'class' ? 'font-bold' : ''}`} onClick={() => setActiveTab('class')}>Class Login</button>
                        </div>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            {activeTab === "faculty" ? (
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value={credentials.username}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5"
                                        placeholder="Enter your username"
                                        required
                                    />
                                </div>
                            )}
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5"
                                        required
                                    />
                                    <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={handleShowPasswordToggle}>
                                        <EyeToggleSVG handleShowPasswordToggle={handleShowPasswordToggle}/>
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full dark:text-white bg-red-600 text-black font-medium rounded-lg text-sm px-5 py-2.5"
                                disabled={isLoading}
                            >
                                {isLoading ? "Signing In..." : "Sign In"}
                            </button>
                           {activeTab === "faculty" && <GoogleBox setIsLoading={setIsLoading} />}
                            <Link to="/user/forgot" className="text-sm font-medium text-primary-600 m-2 hover:underline dark:text-primary-500">Forgot Password?</Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
