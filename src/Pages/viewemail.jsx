import React, { useEffect, useState } from "react";
import { Mail, Clock, User, Star, ArrowLeft } from "lucide-react";
import DashboardNavbar from "../Components/DashboardNavbar";
import { fetchEmailById } from "../Services/EmailService";
import { useParams, useNavigate } from "react-router-dom";

function ViewEmail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const data = await fetchEmailById(id);
        setEmail(data);
      } catch (error) {
        console.error("Error fetching email:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg sm:text-xl font-semibold">
        Loading email...
      </div>
    );
  }

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-sm sm:text-base">
        Email not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0F172A]">
      <DashboardNavbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 sm:mb-6 text-slate-600 hover:text-blue-600 font-medium text-sm sm:text-base"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl sm:rounded-xl shadow-sm p-5 sm:p-8 border">

          {/* Subject */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-6">
            
            <h2 className="text-lg sm:text-2xl font-bold flex items-start gap-2 break-words">
              <Mail size={20} className="mt-1 shrink-0" />
              <span className="break-words">{email.subject}</span>
            </h2>

            {email.isImportant === "Yes" && (
              <span className="w-fit flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                <Star size={14} />
                Important
              </span>
            )}
          </div>

          {/* Sender */}
          <div className="flex items-start gap-3 mb-3 text-gray-700 text-sm sm:text-base">
            <User size={16} />
            <span className="font-medium">From:</span>
            <span className="break-all">{email.sender}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3 mb-6 text-gray-500 text-xs sm:text-sm">
            <Clock size={16} />
            <span>
              {new Date(email.createdAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>

          <hr className="my-5 sm:my-6" />

          {/* Summary */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3">
              AI Summary
            </h3>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-5 leading-relaxed text-sm sm:text-base break-words whitespace-pre-wrap">
              {email.summary.split(" ").map((word, i) =>
                word.startsWith("http") ? (
                  <a
                    key={i}
                    href={word}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline mr-1 break-all"
                  >
                    {word}
                  </a>
                ) : (
                  word + " "
                )
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
              Mark as Read
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg font-medium"
            >
              Dashboard
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewEmail;