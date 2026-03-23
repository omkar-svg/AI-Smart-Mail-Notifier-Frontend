import React, { useEffect, useState } from "react";
import { Mail, Star, Clock, ChevronRight } from "lucide-react";
import DashboardNavbar from "../Components/DashboardNavbar";
import { useNavigate } from "react-router";
import { fetchAllEmails } from "../Services/EmailService";

function AllEmails() {
  const [emails, setEmails] = useState([]);
  const navigate = useNavigate();

  // 🔥 Fetch all emails from backend
  useEffect(() => {
    fetchAllEmails()
      .then((data) => {
        setEmails(data);
        console.log("All emails:", data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <DashboardNavbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#0F172A]">All Emails</h1>
          <p className="text-slate-500 mt-1">
            View and manage all AI summarized emails
          </p>
        </div>

        {/* Email List Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

          {/* Header */}
          <div className="px-8 py-5 border-b bg-slate-50">
            <h3 className="font-bold text-lg text-[#0F172A]">Inbox</h3>
          </div>

          {/* Emails */}
          <div className="p-4 space-y-2">

            {emails.length === 0 && (
              <p className="text-center text-slate-400 py-10">
                No emails found
              </p>
            )}

            {emails.map((email) => (
              <div
                key={email.id}
                className="flex justify-between items-center p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <Mail className="text-blue-600 w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-[#0F172A]">
                        {email.subject}
                      </h4>

                      {email.isImportant === "Yes" && (
                        <Star className="text-yellow-500 w-4 h-4" />
                      )}
                    </div>

                    <p className="text-slate-400 text-sm">
                      {email.sender}
                    </p>

                    <p className="text-slate-500 text-xs mt-1 line-clamp-1">
                      {email.summary}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-6">

                  {/* Time */}
                  <div className="hidden md:flex items-center gap-2 text-slate-400 text-sm">
                    <Clock size={14} />
                    {new Date(email.createdAt).toLocaleString("en-IN", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </div>

                  {/* View Button */}
                  <button
                    onClick={() => navigate(`/viewemail/${email.id}`)}
                    className="bg-[#0F172A] text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-600"
                  >
                    View
                    <ChevronRight size={16} />
                  </button>

                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

export default AllEmails;