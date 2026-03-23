import React, { use } from "react";
import bg from "../assets/bg.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Services/AuthService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then((data) => {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        alert("Login successful 🎉");
        navigate("/dashboard");
      }
      )
      .catch((error) => {
        console.error("Login failed:", error);
        alert("Login failed");
      });
  };
  
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-md text-white">
        
        <h2 className="text-3xl font-bold text-center mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-center text-blue-100 mb-8">
          Login to SmartMail Notifier
        </p>

        <form className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-200" onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-200"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 transition font-semibold shadow-lg" 
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>

        {/* Bottom text */}
        <p className="text-center text-sm mt-6 text-blue-100">
          Don’t have account? <span className="text-white font-semibold cursor-pointer " onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;