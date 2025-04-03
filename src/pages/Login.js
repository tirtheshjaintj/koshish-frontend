import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import EyeToggleSVG from "../components/Eye";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../config/axiosConfig';
import toast from 'react-hot-toast';
import Cookie from "universal-cookie";
import GoogleBox from "../components/GoogleBox";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from '../store/userSlice';
import Nav from "../components/home/StaticNavbar";
function Login() {
    const [activeTab, setActiveTab] = useState('faculty');
    const [credentials, setCredentials] = useState({ email: "", password: "", username: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const cookie = new Cookie();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        document.title = "PCTE User Login";
        const token = cookie.get("user_token");
        if (token)
            navigate("/user/dashboard");
    }, []);
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleShowPasswordToggle = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async (e) => {
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
                const user_type = response.data.data.user_type;
                if (user_type == "Admin") {
                    navigate("/user/dashboard/faculties");
                }
                else if (user_type == "Convenor") {
                    navigate("/user/dashboard/events");
                }
                else {
                    navigate("/user/dashboard/registerEvent");
                }
            }
        }
        catch (error) {
            const error_msg = error.response?.data?.message || "An error occurred";
            toast.error(error_msg);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Nav, {}), _jsx("div", { className: "flex flex-col items-center justify-center min-h-screen mx-auto", children: _jsx("div", { className: "w-full rounded-lg shadow-lg bg-slate-100 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700", children: _jsxs("div", { className: "p-6 space-y-4 md:space-y-6 sm:p-8", children: [_jsxs("div", { className: "flex justify-around border-b pb-2", children: [_jsx("button", { className: `px-4 py-2 ${activeTab === 'faculty' ? 'font-bold' : ''}`, onClick: () => setActiveTab('faculty'), children: "Admin Login" }), _jsx("button", { className: `px-4 py-2 ${activeTab === 'class' ? 'font-bold' : ''}`, onClick: () => setActiveTab('class'), children: "Class Login" })] }), _jsx("h1", { className: "text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white", children: "Sign in to your account" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 md:space-y-6", children: [activeTab === "faculty" ? (_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white", children: "Your email" }), _jsx("input", { type: "email", name: "email", id: "email", value: credentials.email, onChange: handleChange, className: "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5", placeholder: "name@company.com", required: true })] })) : (_jsxs("div", { children: [_jsx("label", { htmlFor: "username", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white", children: "Username" }), _jsx("input", { type: "text", name: "username", id: "username", value: credentials.username, onChange: handleChange, className: "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5", placeholder: "Enter your username", required: true })] })), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: showPassword ? "text" : "password", name: "password", id: "password", value: credentials.password, onChange: handleChange, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5", required: true }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 flex items-center pr-3", onClick: handleShowPasswordToggle, children: _jsx(EyeToggleSVG, { handleShowPasswordToggle: handleShowPasswordToggle }) })] })] }), _jsx("button", { type: "submit", className: "w-full dark:text-white bg-red-600 text-black font-medium rounded-lg text-sm px-5 py-2.5", disabled: isLoading, children: isLoading ? "Signing In..." : "Sign In" }), activeTab === "faculty" && _jsx(GoogleBox, { setIsLoading: setIsLoading }), _jsx(Link, { to: "/user/forgot", className: "text-sm font-medium text-primary-600 m-2 hover:underline dark:text-primary-500", children: "Forgot Password?" })] })] }) }) })] }));
}
export default Login;
