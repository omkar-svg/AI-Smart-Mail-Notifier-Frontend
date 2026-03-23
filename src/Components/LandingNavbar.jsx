import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function LandingNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full flex justify-between items-center px-4 sm:px-10 lg:px-16 py-4 sm:py-6 text-white relative z-50">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 px-3 py-2 rounded-lg text-lg">
            ✉️
          </div>
          <h1 className="text-lg sm:text-xl font-bold tracking-wide">
            SmartMail AI
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium">
          <a href="#" className="hover:text-blue-200">Home</a>
          <a href="#features" className="hover:text-blue-200">Features</a>
          <a href="#about" className="hover:text-blue-200">About</a>
          <a href="#contact" className="hover:text-blue-200">Contact</a>

          <button
            className="bg-white text-blue-900 px-5 py-2 rounded-full font-semibold hover:bg-blue-200"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#0F172A] text-white px-6 py-6 space-y-5 z-40 shadow-lg">
          
          <a
            href="#"
            className="block text-sm font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>

          <a
            href="#features"
            className="block text-sm font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>

          <a
            href="#about"
            className="block text-sm font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>

          <a
            href="#contact"
            className="block text-sm font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>

          <button
            className="w-full bg-white text-blue-900 py-2 rounded-full font-semibold"
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
          >
            Login
          </button>
        </div>
      )}
    </>
  );
}

export default LandingNavbar;