import React, { useState } from "react";
import bg from "../assets/bg.png";
import { useNavigate } from "react-router-dom";
import { register } from "../Services/AuthService";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    register(name, email, password, whatsappNumber)
      .then((data) => {
        console.log("Registration successful:", data);
        alert("Registration successful 🎉");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        alert("Registration failed");
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm"></div>

      {/* Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-[420px] text-white">
        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h2>

        <p className="text-center text-blue-200 text-sm mb-8">
          Join SmartMail AI and never miss important emails
        </p>


        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block mb-2 text-sm text-blue-200">
              Full Name
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm text-blue-200">
              Email Address
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm text-blue-200">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block mb-2 text-sm text-blue-200">
              WhatsApp Number
            </label>
            <input
              type="text"
              onChange={(e) => setWhatsappNumber(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="+919876543210"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-blue-200">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-white font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;