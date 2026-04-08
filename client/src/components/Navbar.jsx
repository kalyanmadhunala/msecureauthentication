import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

    const sendVerificationOTP = async() => {
      try {
        axios.defaults.withCredentials = true

        const { data } = await axios.post(backendUrl + '/user/auth/sendverifyotp')
        if (data.success) {
          navigate('/email-verify')
          toast.success(data.msg)
        } else {
          toast.error(data.msg)
        }




      } catch (error) {
        toast.error(error.message)
      }
    }

    const logout = async() => {

      try {

        axios.defaults.withCredentials = true
        const { data } = await axios.post(backendUrl + '/user/auth/logout')

        data.success && setIsLoggedin(false)
        data.success && setUserData("")
        navigate('/')


      } catch (error) {
        toast.error(error.message)
      }
    }

  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="logo" className="w-9 sm:w-10" />
      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black pt-10">
            <ul className="list-none m-0 p-2 bg-slate-200 text-sm rounded-lg">
              {!userData.isAccountVerified && (
                <li onClick={sendVerificationOTP} className="py-1 px-2 hover:bg-slate-300 rounded-md cursor-pointer">
                  Verify
                </li>
              )}
              <li onClick={logout} className="py-1 px-2 hover:bg-slate-300 rounded-md cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-900 rounded-full px-6 py-2 text-gray-800 hover:bg-purple-300 translate-all cursor-pointer"
        >
          Login
          <img src={assets.arrow_icon} alt="arrow_icon" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
