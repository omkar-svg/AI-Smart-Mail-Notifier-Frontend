import React, { useState } from "react";
import bg from "../assets/bg.png";
import { useNavigate } from "react-router-dom";
import { register } from "../Services/AuthService";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ validation
    if (!name || !email || !password || !whatsappNumber) {
      toast.warning("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      toast.warning("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    register(name, email, password, whatsappNumber)
      .then((data) => {
        console.log("Registration successful:", data);

        toast.success("Registration successful 🎉");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        toast.error(
          error.response?.data?.message || "Registration failed"
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm"></div>

      {/* Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md text-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Create Account
        </h2>

        <p className="text-center text-blue-200 text-sm mb-6 sm:mb-8">
          Join SmartMail AI and never miss important emails
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

          {/* Name */}
          <div>
            <label className="block mb-2 text-sm text-blue-200">
              Full Name
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
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
              className="w-full px-4 py-3 rounded-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="+919876543210"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
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