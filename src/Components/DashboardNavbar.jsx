import React, { useState, useEffect, useContext } from "react";
import {
  Bot,
  Settings,
  User,
  LayoutDashboard,
  Mail,
  MailPlus,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getprofile } from "../Services/UserServices";
import { AuthContext } from "../context/AuthContext";
import { toggleGmail } from "../Services/EmailService";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [profiledata, setProfileData] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

const connectGmail = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/Gmail/connect`;
};

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getprofile();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleToggleGmail = async (gmailAddress) => {
    try {
      await toggleGmail(gmailAddress);
      const data = await getprofile();
      setProfileData(data);
    } catch (error) {
      console.error("Toggle failed:", error);
    }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="bg-[#0F172A] text-white px-4 sm:px-8 py-4 flex justify-between items-center shadow-md relative z-50">
        
        {/* LEFT */}
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Bot size={20} />
            </div>
            <span className="text-lg sm:text-xl font-bold">AI Notifier</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <Link
              to="/allemails"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <Mail size={18} />
              All Emails
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Connect Gmail */}
          <button
            className="hidden md:flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold hover:bg-white/10"
            onClick={connectGmail}
          >
            <MailPlus size={14} />
            Connect
          </button>

          {/* Profile */}
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="bg-blue-600 p-2 rounded-xl"
          >
            <User size={18} />
          </button>

          {/* Hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* PROFILE DROPDOWN */}
          {showProfileMenu && (
            <div className="absolute right-2 top-14 w-64 bg-white text-black rounded-xl shadow-lg p-4 z-50">
              <div className="flex items-center gap-3 pb-3 border-b">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {profiledata?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="font-semibold">
                    {profiledata?.name || "User"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {profiledata?.email}
                  </p>
                </div>
              </div>

              <div className="mt-3 space-y-3 text-sm">
                <button className="flex gap-2 w-full hover:text-blue-600">
                  <User size={16} /> Profile
                </button>

                <button className="flex gap-2 w-full hover:text-blue-600">
                  <Settings size={16} /> Settings
                </button>

                <button className="flex gap-2 w-full hover:text-blue-600">
                  <Mail size={16} /> Gmail
                </button>

                <button
                  onClick={logout}
                  className="flex gap-2 w-full hover:text-red-600"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-[#0F172A] text-white px-6 py-5 space-y-5 shadow-lg z-40">
          
          <button
            onClick={() => {
              navigate("/dashboard");
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 text-sm font-semibold hover:text-blue-400"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <Link
            to="/allemails"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 text-sm font-semibold hover:text-blue-400"
          >
            <Mail size={18} />
            All Emails
          </Link>

          <button
            onClick={() => {
              connectGmail();
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 text-sm font-semibold hover:text-blue-400"
          >
            <MailPlus size={18} />
            Connect Gmail
          </button>
        </div>
      )}
    </>
  );
};

export default DashboardNavbar;