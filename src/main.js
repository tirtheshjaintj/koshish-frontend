import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/Home/Home.tsx";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./pages/Login.tsx";
import User_Dashboard from "./pages/user/dashboard/User_Dashboard.tsx";
import Forgot_Password from "./pages/Forgot_Password.tsx";
import FacultyManageMain from "./pages/user/faculty/FacultyMain.tsx";
import Events from "./pages/Events.tsx";
import EventResult from "./pages/EventResult.tsx";
import TeacherEvents from "./pages/user/faculty/Events/TeacherEvents.tsx";
import ClassMain from "./pages/user/classes/ClassMain.tsx";
import AllRegisterations from "./pages/user/dashboard/DashBoardComponents/AllRegisterations.tsx";
import EventRegisterations from "./pages/user/dashboard/DashBoardComponents/EventRegisterations.tsx";
import AddEvents from "./pages/user/dashboard/AddEvents.tsx";
import ViewEvents from "./pages/user/dashboard/ViewEvents.tsx";
import FinalResult from "./pages/FinalResult.tsx";
import { Link } from "react-router-dom";
const NotFound = () => {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center h-screen bg-gray-100 text-center", children: [_jsx("h1", { className: "text-6xl font-bold text-red-500", children: "404" }), _jsx("p", { className: "text-xl text-gray-700 mt-4", children: "Oops! The page you're looking for doesn't exist." }), _jsx(Link, { to: "/", className: "mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition", children: "Go to Homepage" })] }));
};
export default NotFound;
const router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(App, {}),
        children: [
            { path: "", element: _jsx(Home, {}) },
            { path: "results", element: _jsx(FinalResult, {}) },
            { path: "user/login", element: _jsx(Login, {}) },
            { path: "user/forgot", element: _jsx(Forgot_Password, {}) },
            { path: "events", element: _jsx(Events, {}) },
            { path: "events/:event_id", element: _jsx(EventResult, {}) },
            {
                path: "user/dashboard",
                element: _jsx(User_Dashboard, {}),
                children: [
                    { path: "faculties", element: _jsx(FacultyManageMain, {}) },
                    { path: "addEvent", element: _jsx(AddEvents, {}) },
                    { path: "events", element: _jsx(ViewEvents, {}) },
                    {
                        path: "registerEvent",
                        element: _jsx(TeacherEvents, {}),
                    },
                    {
                        path: "class",
                        element: _jsx(ClassMain, {}),
                    },
                    {
                        path: "allRegisterations",
                        element: _jsx(AllRegisterations, {}),
                    },
                    {
                        path: "category/:eventId",
                        element: _jsx(EventRegisterations, {}),
                    },
                ],
            },
        ],
    },
    { path: "*", element: _jsx(NotFound, {}) }
]);
createRoot(document.getElementById("root")).render(_jsx(GoogleOAuthProvider, { clientId: import.meta.env.VITE_GOOGLE_ID, children: _jsx(Provider, { store: store, children: _jsx(RouterProvider, { router: router }) }) }));
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("serviceWorker.js")
            .then((registration) => {
            console.log("Service Worker registered with scope:", registration.scope);
        })
            .catch((err) => {
            console.log(err);
        });
    });
}
