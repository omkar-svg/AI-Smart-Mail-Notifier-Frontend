import React from "react";
import { useNavigate } from "react-router-dom";

function LandingNavbar() {
  const navigate = useNavigate();
  return (
    <nav className="w-full flex justify-between items-center px-16 py-6 text-white">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-500 px-3 py-2 rounded-lg text-lg">
          ✉️
        </div>
        <h1 className="text-xl font-bold tracking-wide">
          SmartMail AI
        </h1>
      </div>

      {/* Menu Links */}
      <div className="hidden md:flex items-center gap-10 text-sm font-medium">

        <a href="#" className="hover:text-blue-200 transition">
          Home
        </a>

        <a href="#features" className="hover:text-blue-200 transition">
          Features
        </a>

        <a href="#about" className="hover:text-blue-200 transition">
          About
        </a>

        <a href="#contact" className="hover:text-blue-200 transition">
          Contact
        </a>

        <button className="bg-white text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-blue-200 transition"
         onClick={() => navigate("/login")}
        >
          Login
        </button>

      </div>
    </nav>
  );
}

export default LandingNavbar;