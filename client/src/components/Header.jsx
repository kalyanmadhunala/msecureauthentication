import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userData, isLoggedin } = useContext(AppContent);

  const navigate = useNavigate()
  const fullText = `Hii ${userData !== "" ? userData.name : "There"}`;
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [showWave, setShowWave] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Typing effect
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 120);

      return () => clearTimeout(timeout);
    } else {
      setShowWave(true);

      // delay before showing rest of content
      setTimeout(() => {
        setShowContent(true);
      }, 400);
    }
  }, [index, fullText]);

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img
        src={assets.header_img}
        alt="header_img"
        className="w-36 h-36 rounded-full mb-6"
      />

      {/* Typing Text */}
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        {displayedText}

        {showWave && (
          <img
            src={assets.hand_wave}
            alt="hand_wave"
            className="w-12 aspect-square"
          />
        )}
      </h1>

      {/* Subtitle */}
      <h2
        className={`text-3xl sm:text-5xl font-semibold mb-4 transition-all duration-1000 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        Welcome to our mSecure App
      </h2>

      {/* Paragraph */}
      <p
        className={`mb-8 max-w-md transition-all duration-900 delay-400 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        A complete authentication web application. Explore how mSecure
        Authentication works.
      </p>

      {/* Button */}
      {!isLoggedin && (<button onClick={() => navigate('/login')}
        className={`border border-gray-500 rounded-full px-8 py-2.5 cursor-pointer transition-all duration-900 delay-600 hover:bg-purple-300 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        Get Started
      </button>)}

      {!userData.isAccountVerified && (<p
        className={`border border-gray-500 rounded-full px-8 py-2.5 cursor-pointer transition-all duration-900 delay-600 hover:bg-purple-300 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        Verify your email in profile
      </p>)}

      {userData.isAccountVerified && (<p
        className={`bg-green-600 text-green-50 rounded-full px-8 py-2.5 cursor-pointer transition-all duration-900 delay-600 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        Account Verified <img src={assets.verified_check} alt="verified_check" className="w-6 aspect-square" />
      </p>)}
    </div>
  );
};

export default Header;
