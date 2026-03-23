import React, { useState, useEffect } from "react";
import {
  Bot,
  Settings,
  User,
  LayoutDashboard,
  History,
  MailPlus,
  Mail,
  LogOut
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { getprofile } from "../Services/UserServices";
import { AuthContext } from "../context/AuthContext";
import { toggleGmail } from "../Services/EmailService";


const DashboardNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [profiledata, setProfileData] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showGmailModal, setShowGmailModal] = useState(false);

  const connectGmail = () => {
    window.location.href = "https://localhost:7094/api/gmail/connect";
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getprofile();
        setProfileData(data);
        console.log("Profile data:", data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);


   const handleToggleGmail = async (gmailAddress) => {
  try {
    await toggleGmail(gmailAddress);

    // refresh profile
    const data = await getprofile();
    setProfileData(data);
    alert("Gmail connection toggled successfully!");
  } catch (error) {
    console.error("Toggle Gmail failed:", error);
  }
};
  return (
    <>
      {/* ---------------- NAVBAR ---------------- */}
      <nav className="bg-[#0F172A] text-white px-8 py-4 flex justify-between items-center shadow-md relative">
        {/* Left */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Bot size={22} />
            </div>
            <span className="text-xl font-bold">AI Notifier</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <a href="#dashboard" className="flex items-center gap-2" onClick={() => navigate("/dashboard")}>
              <LayoutDashboard size={18} />
              Dashboard
            </a>

            <Link to="/allemails" className="flex items-center gap-2">
              <Mail size={18} />
              All Emails
            </Link>

          
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 relative">
          {/* Connect Gmail */}
          <button
            className="hidden md:flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/10 transition"
            onClick={connectGmail}
          >
            <MailPlus size={16} />
            Connect Gmail
          </button>

          {/* Profile */}
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="bg-blue-600 p-2.5 rounded-xl"
          >
            <User size={18} />
          </button>

          {/* -------- PROFILE DROPDOWN -------- */}
          {showProfileMenu && (
            <div className="absolute right-0 top-14 w-64 bg-white text-black rounded-xl shadow-lg p-4 z-50">
              <div className="flex items-center gap-3 pb-3 border-b">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {profiledata?.name
                    ? profiledata.name.charAt(0).toUpperCase()
                    : "U"}
                </div>
                <div>
                  <p className="font-semibold">
                    {profiledata?.name || "Your Name"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {profiledata?.email || "No email"}
                  </p>
                </div>
              </div>

              <div className="mt-3 space-y-3 text-sm">
                <button
                  onClick={() => {
                    setShowProfileModal(true);
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center gap-2 w-full hover:text-blue-600"
                >
                  <User size={16} /> My Profile
                </button>

                <button
                  onClick={() => {
                    setShowSettings(true);
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center gap-2 w-full hover:text-blue-600"
                >
                  <Settings size={16} /> Settings
                </button>

                <button
                  onClick={() => {
                    setShowGmailModal(true);
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center gap-2 w-full hover:text-blue-600"
                >
                  <Mail size={16} /> Connected Gmail
                </button>

                <button className="flex items-center gap-2 w-full hover:text-red-600"
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                  }}
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* -------- PROFILE MODAL -------- */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[500px] rounded-xl p-6 relative">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute right-4 top-4 text-gray-500"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                {profiledata?.name
                  ? profiledata.name.charAt(0).toUpperCase()
                  : "U"}
              </div>
              <div>
                <h2 className="font-semibold text-lg">
                  {profiledata?.name || "Your Name"}
                </h2>
                <p className="text-gray-500">
                  {profiledata?.email || "No email"}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Name</span>
                <span>{profiledata?.name || "Unknown"}</span>
              </div>

              <div className="flex justify-between">
                <span>Email</span>
                <span>{profiledata?.email || "No email"}</span>
              </div>

              <div className="flex justify-between">
                <span>Whatsapp</span>
                <span>{profiledata?.whatsapp || "No number"}</span>
              </div>

              <div className="flex justify-between">
                <span>Location</span>
                <span>India</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------- SETTINGS MODAL -------- */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-80 rounded-xl p-6 relative">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute right-4 top-4 text-gray-500"
            >
              ✕
            </button>

            <h2 className="font-semibold mb-4">Settings</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Theme</span>
                <span>Light</span>
              </div>

              <div className="flex justify-between">
                <span>Language</span>
                <span>English</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------- CONNECTED GMAIL MODAL -------- */}
      {showGmailModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-xl p-6 relative">
            <button
              onClick={() => setShowGmailModal(false)}
              className="absolute right-4 top-4 text-gray-500"
            >
              ✕
            </button>

            <h2 className="font-semibold text-lg mb-4">
              Connected Gmail Accounts
            </h2>

            {profiledata?.connectedGemails?.length > 0 ? (
              <div className="space-y-3">
                {profiledata.connectedGemails.map((gmail, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg"
                  >
                    <span className="text-sm">{gmail.gmailAddress}</span>

                    <button className="text-red-500 text-xs hover:underline" onClick={() => handleToggleGmail(gmail.gmailAddress)}>
                     {gmail.isActive == "Yes" ? "Active" : "Inactive"}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No Gmail accounts connected.
              </p>
            )}

            <button
              onClick={connectGmail}
              className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Connect New Gmail
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardNavbar;