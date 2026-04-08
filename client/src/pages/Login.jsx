import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import validator from "validator";
import { ThreeDots } from "react-loader-spinner";

const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      if (!validator.isEmail(email)) {
        return toast.error("Enter valid email address");
      }
      if (state === "Sign Up" && password.length < 8) {
        return toast.error("Password must be strong");
      }

      axios.defaults.withCredentials = true;
      setLoading(true);
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/user/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setLoading(false);
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          setLoading(false);
          toast.error(data.msg);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/user/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setLoading(false);
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          setLoading(false);
          toast.error(data.msg);
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-[#a29bfe] to-[#8c52ff]">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-9 sm:w-10 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-3xl shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Login" ? "Login" : "Sign Up"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Login"
            ? "Login to your account!"
            : "Create your account"}{" "}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="person_icon" />
              <input
                className="bg-transparent outline-none w-full"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                id="name"
                required
              />
            </div>
          )}
          <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="mail_icon" />
            <input
              className="bg-transparent outline-none w-full"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="user@domain.com"
              id="email"
              required
            />
          </div>
          <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="lock_icon" />
            <input
              className="bg-transparent outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              id="password"
              required
            />
          </div>
          {state === "Login" && (
            <p
              onClick={() => navigate("/resetpassword")}
              className="mb-4 text-indigo-500 cursor-pointer"
            >
              Forget password?
            </p>
          )}
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
              state
            )}
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Login here
            </span>{" "}
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Sign Up
            </span>{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
