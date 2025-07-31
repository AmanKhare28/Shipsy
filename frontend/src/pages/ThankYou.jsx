import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const ThankYou = () => {
  const { state } = useLocation();
  const data = state?.formData || {};

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen flex items-center justify-center bg-gray-900 p-6"
    >
      <main className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 text-center space-y-6">
        <FaCheckCircle className="text-purple-400 text-6xl mx-auto" />
        <h1 className="text-3xl text-purple-300 font-medium">Thank You</h1>
        <p className="text-purple-400">We received your feedback.</p>

        {Object.keys(data).length > 0 && (
          <div className="text-left bg-gray-700 p-4 rounded-lg border border-gray-600 space-y-2">
            <p className="flex gap-1">
              <strong className="text-purple-300">Name:</strong>{" "}
              <div className="text-[#ffffff80]">
                {data.firstName} {data.lastName}
              </div>
            </p>
            <p className="flex gap-1">
              <strong className="text-purple-300">Age:</strong>{" "}
              <div className="text-[#ffffff80]">{data.ageGroup}</div>
            </p>
            <p className="flex gap-1">
              <strong className="text-purple-300">Blood:</strong>{" "}
              <div className="text-[#ffffff80]">{data.bloodGroup}</div>
            </p>
            <p className="flex gap-1">
              <strong className="text-purple-300">Conditions:</strong>{" "}
              <div className="text-[#ffffff80]">
                {data.medicalConditions?.join(", ") || "None"}
              </div>
            </p>
          </div>
        )}

        <Link
          to="/"
          className="inline-block mt-4 py-2 px-6 rounded-full bg-purple-500 text-white font-medium hover:bg-purple-600 focus:ring-2 focus:ring-purple-400 transition"
        >
          New Survey
        </Link>
      </main>
    </div>
  );
};

export default ThankYou;
