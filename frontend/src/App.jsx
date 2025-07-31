import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import FeedbackForm from "./pages/FeedbackForm";
import ThankYou from "./pages/ThankYou";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}
