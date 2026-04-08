import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import React, { useContext, useRef, useState } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

const ResetPassword = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true
  const { backendUrl } = useContext(AppContent)

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [newpassword, setNewPassword] = useState("");
  const [isEmailSent, setEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setOtpSubmitted] = useState(false);

  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeydown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async(e) => {
    e.preventDefault()
    try {
      setLoading(true);

      const { data } = await axios.post(backendUrl + "/user/auth/sendresetotp", {
        email,
      });
      if (data.success) {
        setLoading(false);
        toast.success(data.msg);
        setEmailSent(true)
      } else {
        setLoading(false);
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onSubmitOTP = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(backendUrl + "/user/auth/verifyresetotp", {
        otp,
      });
      if (data.success) {
        setLoading(false);
        toast.success(data.msg);
        setOtpSubmitted(true)
      } else {
        setLoading(false);
        toast.error(data.msg);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const onSubmitNewPassword = async(e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(backendUrl + "/user/auth/resetpassword", {
        newpassword,
      });
      if (data.success) {
        setLoading(false);
        toast.success(data.msg);
        navigate('/login')
      } else {
        setLoading(false);
        toast.error(data.msg);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen sm:px-0 bg-linear-to-br from-[#a29bfe] to-[#8c52ff]">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-9 sm:w-10 cursor-pointer"
      />
      {/* reset password email */}

      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className="bg-slate-900 p-8 rounded-3xl shadow-lg w-96 text-sm">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your registered email address.
          </p>
          <div className="flex items-center gap-3 mb-8 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="mail_icon" />
            <input
              className="bg-transparent outline-none w-full text-white"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="user@domain.com"
              id="email"
              required
            />
          </div>
          <button className="flex justify-center cursor-pointer w-full py-2.5 rounded-3xl font-medium bg-linear-to-r from-[#8c52ff] to-indigo-500 text-white">
            {loading ? (
              <ThreeDots
                visible={true}
                height="20"
                width="50"
                color="#ffffff"
                radius=""
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Proceed"
            )}
          </button>
        </form>
      )}

      {/* otp verification form*/}

      {!isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitOTP}
          className="bg-slate-900 p-8 rounded-3xl shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Verify Email
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the 6-digit code sent to your email id.
          </p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength={1}
                  key={index}
                  required
                  className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeydown(e, index)}
                />
              ))}
          </div>
          <button className="flex justify-center w-full py-2.5 rounded-3xl font-medium bg-linear-to-r from-[#8c52ff] to-indigo-500 text-white">
            {loading ? (
              <ThreeDots
                visible={true}
                height="20"
                width="50"
                color="#ffffff"
                radius=""
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Verify email"
            )}
          </button>
        </form>
      )}

      {/* reset password */}

      {isEmailSent && isOtpSubmitted && (
        <form onSubmit={onSubmitNewPassword} className="bg-slate-900 p-8 rounded-3xl shadow-lg w-96 text-sm">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            New Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the new password below
          </p>
          <div className="flex items-center gap-3 mb-8 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="mail_icon" />
            <input
              className="bg-transparent outline-none w-full text-white"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newpassword}
              type="password"
              placeholder="Password"
              id="password"
              required
            />
          </div>
          <button className="flex justify-center cursor-pointer w-full py-2.5 rounded-3xl font-medium bg-linear-to-r from-[#8c52ff] to-indigo-500 text-white">
            {loading ? (
              <ThreeDots
                visible={true}
                height="20"
                width="50"
                color="#ffffff"
                radius=""
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
