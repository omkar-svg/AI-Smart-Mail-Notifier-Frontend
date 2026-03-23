import React, { useEffect, useState } from "react";
import { Mail, Bot, MessageCircle, RefreshCw, ChevronRight } from "lucide-react";
import DashboardNavbar from "../Components/DashboardNavbar";
import { getdashboardData } from "../Services/AuthService";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getdashboardData();
        setDashboardData(data);
        console.log("Dashboard data fetched:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#1E293B] font-sans">
      <DashboardNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8 ml-1 sm:ml-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            Dashboard
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-1 font-medium">
            Monitor your AI email automation & WhatsApp notifications
          </p>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon={<Mail className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />}
            bgColor="bg-blue-50"
            label="Emails Today"
            value={dashboardData ? dashboardData.emailsToday : "Loading..."}
          />

          <StatCard
            icon={<Bot className="text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />}
            bgColor="bg-purple-50"
            label="AI Summaries"
            value={dashboardData ? dashboardData.aiSummaries : "Loading..."}
          />

          <StatCard
            icon={<MessageCircle className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />}
            bgColor="bg-green-50"
            label="WhatsApp Alerts"
            value={dashboardData ? dashboardData.whatsappAlerts : "Loading..."}
          />
        </section>

        {/* Recent Emails */}
        <section className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 px-4 sm:px-8 py-4 sm:py-6 border-b border-slate-100">
            <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">
              Recent Important Emails
            </h3>

            <button
              className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 px-4 py-2 rounded-xl font-bold text-xs border border-slate-200 w-full sm:w-auto"
              onClick={() => setRefresh(!refresh)}
            >
              <RefreshCw size={14} className="text-blue-600" />
              Refresh
            </button>
          </div>

          {/* Emails */}
          <div className="p-3 sm:p-4 space-y-2">
            {dashboardData?.recentImportant?.length > 0 ? (
              dashboardData.recentImportant.map((email) => (
                <EmailRow key={email.id} email={email} navigate={navigate} />
              ))
            ) : (
              <p className="text-center text-slate-400 py-6">
                No recent emails found
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ icon, bgColor, label, value }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 sm:gap-4">
      <div className={`${bgColor} p-3 sm:p-4 rounded-xl`}>
        {icon}
      </div>

      <div>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
          {label}
        </p>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] mt-1">
          {value}
        </h2>
      </div>
    </div>
  );
}

function EmailRow({ email, navigate }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 hover:bg-slate-50 rounded-2xl group transition">
      
      {/* Left */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 border rounded-full flex items-center justify-center flex-shrink-0">
          <Mail className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
        </div>

        <div className="min-w-0">
          <h4 className="font-bold text-[#0F172A] text-sm sm:text-base truncate">
            {email.subject}
          </h4>
          <p className="text-slate-400 text-xs sm:text-sm truncate">
            {email.sender}
          </p>
        </div>
      </div>

      {/* Button */}
      <button
        className="w-full sm:w-auto bg-[#0F172A] text-white px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition"
        onClick={() => navigate(`/viewemail/${email.id}`)}
      >
        View
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default Dashboard;