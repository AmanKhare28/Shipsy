import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URI = import.meta.env.VITE_API_URI;
const medicalConditions = [
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Arthritis",
  "Thyroid",
  "Cancer",
  "Migrane",
  "Obesity",
];

const FeedbackForm = () => {
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleConditionToggle = (cond) =>
    setSelectedConditions((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond]
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value.trim();
    const lastName = e.target.lastName.value.trim();
    const ageGroup = e.target.ageGroup.value;
    const bloodGroup = e.target.bloodGroup.value;

    if (firstName.length < 2) {
      toast.error("First name must be at least 2 characters.");
      return;
    }
    if (lastName.length < 2) {
      toast.error("Last name must be at least 2 characters.");
      return;
    }
    if (!ageGroup) {
      toast.error("Please select an age group.");
      return;
    }
    if (!bloodGroup) {
      toast.error("Please select a blood group.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.medicalConditions = selectedConditions;

    try {
      const res = await fetch(API_URI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Server error.");
        return;
      }

      navigate("/thank-you", { state: { formData: result.data } });
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Connection failed. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen flex items-center justify-center bg-gray-900 p-6"
    >
      <ToastContainer
        position="top-right"
        theme="dark"
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <main className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-purple-300">Feedback</h1>
          <p className="mt-2 text-purple-400">Share your health details</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-2xl shadow-lg space-y-6 border border-gray-700"
          noValidate
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: "firstName", label: "First Name" },
              { id: "lastName", label: "Last Name" },
            ].map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block mb-1 text-purple-200"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  placeholder={field.label}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            ))}

            {[
              {
                id: "ageGroup",
                label: "Age Group",
                options: ["", "<18", "18-30", "31-45", "46-60", "60+"],
              },
              {
                id: "bloodGroup",
                label: "Blood Group",
                options: ["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
              },
            ].map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block mb-1 text-purple-200"
                >
                  {field.label}
                </label>
                <select
                  id={field.id}
                  name={field.id}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt || `Select ${field.label}`}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <fieldset>
            <legend className="text-purple-200 mb-2">
              Existing Conditions?
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {medicalConditions.map((cond) => {
                const isSelected = selectedConditions.includes(cond);
                return (
                  <div
                    key={cond}
                    onClick={() => handleConditionToggle(cond)}
                    className={`text-center p-2 border rounded-lg cursor-pointer transition transform ${
                      isSelected
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "bg-gray-700 border-gray-600 text-purple-200 hover:bg-gray-600"
                    }`}
                  >
                    {cond}
                  </div>
                );
              })}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 font-medium rounded-full text-white bg-purple-500 hover:bg-purple-600 focus:ring-2 focus:ring-purple-400 transition disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default FeedbackForm;
