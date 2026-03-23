import React, { useEffect, useState } from "react";
import { Mail, Clock, User, Star, ArrowLeft } from "lucide-react";
import DashboardNavbar from "../Components/DashboardNavbar";
import { fetchEmailById } from "../Services/EmailService";
import { useParams, useNavigate } from "react-router-dom";

function ViewEmail() {
  const { id } = useParams(); // ✅ get id from URL
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
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading email...
      </div>
    );
  }

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Email not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0F172A]">
      <DashboardNavbar />

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-slate-600 hover:text-blue-600 font-medium"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Email Card */}
        <div className="bg-white rounded-xl shadow-sm p-8 border">

          {/* Subject */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Mail size={22} />
              {email.subject}
            </h2>

            {email.isImportant === "Yes" && (
              <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                <Star size={16} />
                Important
              </span>
            )}
          </div>

          {/* Sender */}
          <div className="flex items-center gap-3 mb-3 text-gray-700">
            <User size={18} />
            <span className="font-medium">From:</span>
            <span>{email.sender}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3 mb-6 text-gray-500">
            <Clock size={18} />
            <span>
              {new Date(email.createdAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>

          <hr className="my-6" />

          {/* Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-3">AI Summary</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 leading-relaxed break-words whitespace-pre-wrap">
              {email.summary.split(" ").map((word, i) =>
                word.startsWith("http") ? (
                  <a key={i} href={word} target="_blank" className="text-blue-600 underline mr-1">
                    {word}
                  </a>
                ) : (
                  word + " "
                )
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
              Mark as Read
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg font-medium"
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