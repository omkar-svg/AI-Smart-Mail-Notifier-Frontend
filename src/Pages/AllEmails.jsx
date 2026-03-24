import React, { useEffect, useState } from "react";
import { Mail, Star, Clock, ChevronRight } from "lucide-react";
import DashboardNavbar from "../Components/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import { fetchAllEmails } from "../Services/EmailService";

function AllEmails() {
  const [emails, setEmails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllEmails()
      .then((data) => {
        setEmails(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <DashboardNavbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* Heading */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            All Emails
          </h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            View and manage all AI summarized emails
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

          {/* Header */}
          <div className="px-5 sm:px-8 py-4 sm:py-5 border-b bg-slate-50">
            <h3 className="font-bold text-base sm:text-lg text-[#0F172A]">
              Inbox
            </h3>
          </div>

          {/* Emails */}
          <div className="p-3 sm:p-4 space-y-3">

            {emails.length === 0 && (
              <p className="text-center text-slate-400 py-10">
                No emails found
              </p>
            )}

            {emails.map((email) => (
              <div
                key={email.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
              >
                {/* LEFT */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-[#0F172A] text-sm sm:text-base truncate">
                        {email.subject}
                      </h4>

                      {email.isImportant === "Yes" && (
                        <Star className="text-yellow-500 w-4 h-4 shrink-0" />
                      )}
                    </div>

                    <p className="text-slate-400 text-xs sm:text-sm truncate">
                      {email.sender}
                    </p>

                    <p className="text-slate-500 text-xs mt-1 line-clamp-2">
                      {email.summary}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">

                  {/* Time */}
                  <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
                    <Clock size={14} />
                    {new Date(email.createdAt).toLocaleString("en-IN", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => navigate(`/viewemail/${email.id}`)}
                    className="w-full sm:w-auto bg-[#0F172A] text-white px-4 py-2 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-600"
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