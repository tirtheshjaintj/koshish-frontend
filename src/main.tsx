import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home.tsx';
import { Provider } from 'react-redux';
import store from './store/store';
import Login from "./pages/Login.tsx";
import User_Dashboard from "./pages/user/User_Dashboard";
import Forgot_Password from './pages/Forgot_Password.tsx';

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/teacher/login" element={<Login type="teacher" />} />
      <Route path="/teacher/forgot" element={<Forgot_Password type="teacher" />} />
      <Route path="/convenor/login" element={<Login type="convenor" />} />
      <Route path="/convenor/forgot" element={<Forgot_Password type="convenor" />} />
      <Route path="/admin/login" element={<Login type="admin" />} />
      <Route path="/admin/forgot" element={<Forgot_Password type="admin" />} />
      <Route path="/user/dashboard" element={<User_Dashboard />} />
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID} >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </GoogleOAuthProvider>
)

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
