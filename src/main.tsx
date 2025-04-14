import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/Home/Home";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./pages/Login";
import User_Dashboard from "./pages/user/dashboard/User_Dashboard";
import Forgot_Password from "./pages/Forgot_Password";
import FacultyManageMain from "./pages/user/faculty/FacultyMain";
import Events from "./pages/Events";
import EventResult from "./pages/EventResult";
import TeacherEvents from "./pages/user/faculty/Events/TeacherEvents";
import ClassMain from "./pages/user/classes/ClassMain";
import AllRegisterations from "./pages/user/dashboard/DashBoardComponents/AllRegisterations";
import EventRegisterations from "./pages/user/dashboard/DashBoardComponents/EventRegisterations";
import AddEvents from "./pages/user/dashboard/AddEvents";
import ViewEvents from "./pages/user/dashboard/ViewEvents";
import FinalResult from "./pages/FinalResult";

import { Link } from "react-router-dom";
import ClassProfile from "./pages/user/profile/ClassProfile";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl text-gray-700 mt-4">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "results", element: <FinalResult /> },
      { path: "user/login", element: <Login /> },
      { path: "user/forgot", element: <Forgot_Password /> },
      { path: "events", element: <Events /> },
      { path: "events/:event_id", element: <EventResult /> },
      {
        path: "user/dashboard",
        element: <User_Dashboard />,
        children: [
          { path: "faculties", element: <FacultyManageMain /> },
          { path: "addEvent", element: <AddEvents /> },
          { path: "events", element: <ViewEvents /> },
          {
            path: "registerEvent",
            element: <TeacherEvents />,
          },
          {
            path: "class",
            element: <ClassMain />,
          },
          {
            path: "profile",
            element: <ClassProfile />,
          },
          {
            path: "allRegisterations",
            element: <AllRegisterations />,
          },
          {
            path: "category/:eventId",
            element: <EventRegisterations />,
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> }
]);

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </GoogleOAuthProvider>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("serviceWorker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
