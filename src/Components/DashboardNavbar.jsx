import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Bot,
  Settings,
  User,
  LayoutDashboard,
  MailPlus,
  Mail,
  LogOut,
  MoreVertical
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showGmailModal, setShowGmailModal] = useState(false);

  const menuRef = useRef();

  const connectGmail = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}Gmail/connect`;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getprofile();
        setProfileData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  // CLOSE MENU ON OUTSIDE CLICK
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setShowMobileMenu(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleToggleGmail = async (gmailAddress) => {
    try {
      await toggleGmail(gmailAddress);
      const data = await getprofile();
      setProfileData(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-[#0F172A] text-white px-4 md:px-8 py-4 flex justify-between items-center shadow-md relative">

        {/* LEFT */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Bot size={22} />
            </div>
            <span className="text-xl font-bold">AI Notifier</span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex gap-8">
            <button onClick={() => navigate("/dashboard")} className="flex gap-2">
              <LayoutDashboard size={18} /> Dashboard
            </button>

            <Link to="/allemails" className="flex gap-2">
              <Mail size={18} /> All Emails
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 relative" ref={menuRef}>

          {/* MOBILE MENU */}
          <button
            className="lg:hidden bg-white/10 p-2 rounded-lg"
            onClick={() => {
              setShowMobileMenu(!showMobileMenu);
              setShowProfileMenu(false);
            }}
          >
            <MoreVertical size={20} />
          </button>

          {showMobileMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white text-black rounded-xl shadow-lg p-4 z-50">

              <button
                onClick={() => {
                  navigate("/dashboard");
                  setShowMobileMenu(false);
                }}
                className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100"
              >
                <LayoutDashboard size={16} /> Dashboard
              </button>

              <Link
                to="/allemails"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100"
              >
                <Mail size={16} /> All Emails
              </Link>

              <button
                onClick={() => {
                  connectGmail();
                  setShowMobileMenu(false);
                }}
                className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100"
              >
                <MailPlus size={16} /> Connect Gmail
              </button>
            </div>
          )}

          {/* DESKTOP BUTTON */}
          <button
            className="hidden md:flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl hover:bg-white/10"
            onClick={connectGmail}
          >
            <MailPlus size={16} />
            Connect Gmail
          </button>

          {/* PROFILE BUTTON */}
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowMobileMenu(false);
            }}
            className="bg-blue-600 p-2.5 rounded-xl"
          >
            <User size={18} />
          </button>

          {/* PROFILE DROPDOWN */}
          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white text-black rounded-xl shadow-lg p-4 z-50">

              <div className="flex items-center gap-3 pb-3 border-b">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {profiledata?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <p className="font-semibold">{profiledata?.name}</p>
                  <p className="text-sm text-gray-500">{profiledata?.email}</p>
                </div>
              </div>

              <div className="mt-3 space-y-2 text-sm">

                <button
                  onClick={() => {
                    setShowProfileModal(true);
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100"
                >
                  <User size={16} /> My Profile
                </button>

                <button
                  onClick={() => {
                    setShowSettings(true);
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100"
                >
                  <Settings size={16} /> Settings
                </button>

                <button
                  onClick={() => {
                    setShowGmailModal(true);
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100"
                >
                  <Mail size={16} /> Connected Gmail
                </button>

                <button
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-red-100 text-red-600"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* PROFILE MODAL */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-[500px] rounded-xl p-6 relative">
            <button onClick={() => setShowProfileModal(false)} className="absolute right-4 top-4">✕</button>

            <div className="flex gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                {profiledata?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <h2 className="font-semibold">{profiledata?.name}</h2>
                <p className="text-gray-500">{profiledata?.email}</p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between"><span>Name</span><span>{profiledata?.name}</span></div>
              <div className="flex justify-between"><span>Email</span><span>{profiledata?.email}</span></div>
              <div className="flex justify-between"><span>Whatsapp</span><span>{profiledata?.whatsapp}</span></div>
              <div className="flex justify-between"><span>Location</span><span>India</span></div>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-sm rounded-xl p-6 relative">
            <button onClick={() => setShowSettings(false)} className="absolute right-4 top-4">✕</button>
            <h2 className="font-semibold mb-4">Settings</h2>
          </div>
        </div>
      )}

      {/* GMAIL MODAL */}
      {showGmailModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-xl p-6 relative">
            <button onClick={() => setShowGmailModal(false)} className="absolute right-4 top-4">✕</button>

            <h2 className="font-semibold mb-4">Connected Gmail</h2>

            {profiledata?.connectedGemails?.length > 0 ? (
              profiledata.connectedGemails.map((g, i) => (
                <div key={i} className="flex justify-between mb-2">
                  <span>{g.gmailAddress}</span>
                  <button onClick={() => handleToggleGmail(g.gmailAddress)}>
                    {g.isActive}
                  </button>
                </div>
              ))
            ) : (
              <p>No Gmail connected</p>
            )}

            <button onClick={connectGmail} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">
              + Connect Gmail
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardNavbar;