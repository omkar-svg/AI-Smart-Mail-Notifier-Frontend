import React, { useState } from "react";
import bg from "../assets/bg.png";
import { useNavigate } from "react-router-dom";
import { login } from "../Services/AuthService";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ validation
    if (!email || !password) {
      toast.warning("Please fill all fields");
      return;
    }

    setLoading(true);

    login(email, password)
      .then((data) => {
        console.log("Login successful:", data);

        // ✅ check token
        if (!data?.token) {
          toast.error("Invalid server response");
          return;
        }

        localStorage.setItem("token", data.token);

        toast.success("Login successful 🎉");

        // ✅ stable navigation
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      })
      .catch((error) => {
        console.error("Login failed:", error);
        toast.error(error.response?.data?.message || "Login failed");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-md text-white">
        
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-center text-blue-100 mb-6 sm:mb-8 text-sm sm:text-base">
          Login to SmartMail Notifier
        </p>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-200"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 transition font-semibold shadow-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-blue-100">
          Don’t have account?{" "}
          <span
            className="text-white font-semibold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;