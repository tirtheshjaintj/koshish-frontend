import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home.tsx';
import { Provider } from 'react-redux';
import store from './store/store';
import Login from "./pages/Login.tsx";
import User_Dashboard from "./pages/user/dashboard/User_Dashboard.tsx";
import Forgot_Password from './pages/Forgot_Password.tsx';
import FacultyManageMain from './pages/user/faculty/FacultyMain.tsx';
import RegisterForEvent from './pages/user/dashboard/DashBoardComponents/RegisterForEvent.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/teacher/login",
        element: <Login type="teacher" />,
      },
      {
        path: "/teacher/forgot",
        element: <Forgot_Password type="teacher" />,
      },
      {
        path: "/convenor/login",
        element: <Login type="convenor" />,
      },
      {
        path: "/convenor/forgot",
        element: <Forgot_Password type="convenor" />,
      },
      {
        path: "/admin/login",
        element: <Login type="admin" />,
      },
      {
        path: "/admin/forgot",
        element: <Forgot_Password type="admin" />,
      },
      {
        path: "/user/dashboard",
        element: <User_Dashboard />,
      },
    ],

  },

  // Dashboard Routes
  {
    path: "/user/dashboard",
    element: <User_Dashboard />,
    children: [
      {
        path: "/user/dashboard",
        element: <User_Dashboard />,
      },
      {
        path: "/user/dashboard/faculties",
        element: <FacultyManageMain />,
      },{
        path:"/user/dashboard/registerEvent",
        element:<RegisterForEvent/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID} >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </GoogleOAuthProvider>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('serviceWorker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(err => {
        console.error('Service Worker registration failed:', err);
      });
  });
}
