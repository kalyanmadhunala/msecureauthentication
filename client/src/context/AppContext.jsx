import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState("");

  const getAuthStatus = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/user/auth/isauth");
      if (data.success) {
        await getUserData();
        setIsLoggedin(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/user/data");
      data.success ? setUserData(data.userData) : toast.error(data.msg);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const startServer = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/");
      if (data.success) {
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthStatus();
  }, []);

  useEffect(() => {
    startServer();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
