import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Cookie from "universal-cookie";
import { addUser } from './store/userSlice';
import axiosInstance from './config/axiosConfig';
import { useEffect } from 'react';
import { DataProvider } from './context/DataProviderContext';



function App() {
  const cookie = new Cookie();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!user) {
      getUser();
    }
    console.log("User", user);
  }, [user]);

  const getUser = async () => {
    const userToken = cookie.get('user_token');
    if (!userToken) {
      return; // Exit if the seller token is not available
    }
    try {
      const response = await axiosInstance.get(`/user/getUser`, {
        withCredentials: true, // Keep this if you need credentials
      });
      const userData = response.data;
      if (userData.status) {
        dispatch(addUser(userData.user));
      } else {
        cookie.remove('user_token');
      }
    } catch (error: any) {
      if (!error.response?.data?.status) {
        cookie.remove('user_token');
      }
    }
  };
  useEffect(() => {
    document.title = "PCTE Koshish App";
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Toaster position="bottom-right" />
      <DataProvider>
        <Outlet />
      </DataProvider>

    </>
  )
}

export default App


