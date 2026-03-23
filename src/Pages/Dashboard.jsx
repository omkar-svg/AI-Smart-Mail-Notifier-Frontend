import React, { useEffect, useState } from "react";
import { Mail, Bot, MessageCircle, RefreshCw, ChevronRight } from "lucide-react";
import DashboardNavbar from "../Components/DashboardNavbar";
import { getdashboardData } from "../Services/AuthService";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate(); // ✅ correct
  const [dashboardData, setDashboardData] = useState(null);
  const[refresh , setRefresh] = useState(false);

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
  }, [refresh]); // ✅ add refresh to dependencies
  

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#1E293B] font-sans">
      <DashboardNavbar />

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8 ml-2">
          <h1 className="text-3xl font-extrabold text-[#0F172A]">Dashboard</h1>
          <p className="text-slate-500 text-base mt-1 font-medium">
            Monitor your AI email automation & WhatsApp notifications
          </p>
        </div>

        {/* Stats */}
        <section className="grid md:grid-cols-3 gap-5 mb-10">

          <StatCard
            icon={<Mail className="text-blue-600 w-6 h-6" />}
            bgColor="bg-blue-50"
            label="Emails Today"
            value={dashboardData ? dashboardData.emailsToday : "Loading..."}
          />

          <StatCard
            icon={<Bot className="text-purple-600 w-6 h-6" />}
            bgColor="bg-purple-50"
            label="AI Summaries"
            value={dashboardData ? dashboardData.whatsappAlerts : "Loading..."}
          />

          <StatCard
            icon={<MessageCircle className="text-green-600 w-6 h-6" />}
            bgColor="bg-green-50"
            label="WhatsApp Alerts"
            value={dashboardData ? dashboardData.whatsappAlerts : "Loading..."}
          />

        </section>

        {/* Recent Emails */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">

          <div className="flex justify-between items-center px-8 py-6 border-b border-slate-50">
            <h3 className="text-xl font-bold text-[#0F172A]">
              Recent Important Emails
            </h3>
            <button className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 px-4 py-2 rounded-xl font-bold text-xs border border-slate-200"
              onClick={() => setRefresh(!refresh)}
            >
              <RefreshCw size={14} className="text-blue-600" />
              Refresh
            </button>
          </div>

          <div className="p-4">
            {dashboardData?.recentImportant?.map((email) => (
              <EmailRow
                key={email.id}
                email={email}
                navigate={navigate}   e
              />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}


function StatCard({ icon, bgColor, label, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
      <div className={`${bgColor} p-4 rounded-xl`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{label}</p>
        <h2 className="text-3xl font-black text-[#0F172A] mt-1">{value}</h2>
      </div>
    </div>
  );
}



function EmailRow({ email, navigate }) {
  return (
    <div className="flex justify-between items-center p-4 hover:bg-slate-50 rounded-2xl group">

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-50 border rounded-full flex items-center justify-center">
          <Mail className="text-blue-500 w-5 h-5" />
        </div>

        <div>
          <h4 className="font-bold text-[#0F172A]">{email.subject}</h4>
          <p className="text-slate-400 text-sm">{email.sender}</p>
        </div>
      </div>

      <button
        className="bg-[#0F172A] text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-600"
        onClick={() => navigate(`/viewemail/${email.id}`)}  
      >
        View
        <ChevronRight size={16} />
      </button>

    </div>
  );
}

export default Dashboard;