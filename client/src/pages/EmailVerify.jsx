import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const EmailVerify = () => {

  axios.defaults.withCredentials = true
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([])

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeydown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    })
  }

  const onSubmitHandler = async(e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const { data } = await axios.post(backendUrl + '/user/auth/verifyotp', {otp})
      if (data.success) {
        await getUserData();
        setLoading(false)
        toast.success(data.msg)
        navigate('/')
      } else {
        setLoading(false)
        toast.error(data.msg)
      }


    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  },[isLoggedin, userData])



  return (
    <div className="flex items-center justify-center min-h-screen sm:px-0 bg-linear-to-br from-[#a29bfe] to-[#8c52ff]">
      <img
        src={assets.logo}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-9 sm:w-10"
      />
      <form onSubmit={onSubmitHandler} className="bg-slate-900 p-8 rounded-3xl shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Verify Email
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6-digit code sent to your email id.
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input type="text" maxLength={1} key={index} required
            className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
            ref={e => inputRefs.current[index] = e}
            onInput={(e) => handleInput(e, index)}
            onKeyDown={(e) => handleKeydown(e, index)}
            />
          ))}
        </div>
        <button className="flex justify-center w-full py-2.5 rounded-3xl font-medium bg-linear-to-r from-[#8c52ff] to-indigo-500 text-white">{loading ? (
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
            ) : "Verify email"}</button>
      </form>
    </div>
  );
};

export default EmailVerify;
