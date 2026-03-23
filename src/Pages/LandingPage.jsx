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
      <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Navbar */}
        <LandingNavbar />

        {/* HERO 50-50 SECTION */}
        <div className="flex flex-1 items-center justify-between px-14">

          {/* LEFT SIDE */}
          <div className="w-1/2 space-y-6 pr-10 ">

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              AI-Powered Email <br /> Notifications & Summaries
            </h1>

            <p className="text-blue-100 text-lg max-w-lg">
              Get important email alerts and smart summaries powered by AI
              directly to your WhatsApp. Never miss anything important again.
            </p>

            <div className="flex gap-6 pt-4">
              <button className="bg-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg"
              
              onClick={() => navigate("/register")}
              >
                Get Started
              </button>

              <button className="bg-white/20 backdrop-blur-md px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="w-1/2 flex justify-left">
            <img
              src={hero}
              alt="hero"
              className="h-[90vh] object-contain drop-shadow-2xl"
            />
          </div> 

        </div>
      </div>
    </div>
  );
}

export default LandingPage;