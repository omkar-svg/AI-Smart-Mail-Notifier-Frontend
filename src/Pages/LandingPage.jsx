import React from "react";
import bg from "../assets/bg.png";
import hero from "../assets/l1.png";
import LandingNavbar from "../Components/LandingNavbar";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center text-white relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navbar */}
        <LandingNavbar />

        {/* HERO SECTION */}
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between px-5 sm:px-10 lg:px-16 py-8 lg:py-0 flex-1 gap-10">
          
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-5">

            {/* IMAGE (TOP ON MOBILE) */}
            <img
              src={hero}
              alt="hero"
              className="w-[85%] max-w-[280px] sm:max-w-[320px] lg:hidden object-contain drop-shadow-2xl"
            />

            {/* HEADING */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              AI-Powered Email <br /> Notifications & Summaries
            </h1>

            {/* DESCRIPTION */}
            <p className="text-blue-100 text-sm sm:text-base md:text-lg max-w-md">
              Get important email alerts and smart summaries powered by AI
              directly to your WhatsApp. Never miss anything important again.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto mt-2">
              
              <button
                className="bg-blue-600 py-3 px-6 sm:px-8 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg w-full sm:w-auto"
                onClick={() => navigate("/register")}
              >
                Get Started
              </button>

              <button className="bg-white/20 backdrop-blur-md py-3 px-6 sm:px-8 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition w-full sm:w-auto">
                Learn More
              </button>

            </div>
          </div>

          {/* RIGHT IMAGE (DESKTOP ONLY) */}
          <div className="hidden lg:flex w-1/2 justify-end">
            <img
              src={hero}
              alt="hero"
              className="w-[80%] max-h-[85vh] object-contain drop-shadow-2xl"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default LandingPage;