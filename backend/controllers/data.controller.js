import Feedback from "../models/data.model.js";

export const createFeedback = async (req, res) => {
  try {
    const { firstName, lastName, ageGroup, bloodGroup, medicalConditions } =
      req.body;

    if (typeof firstName !== "string" || typeof lastName !== "string") {
      return res.status(400).json({ message: "Names must be text strings." });
    }
    if (!firstName.trim() || !lastName.trim()) {
      return res
        .status(400)
        .json({ message: "First and last name cannot be empty." });
    }

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      ageGroup,
      bloodGroup,
      medicalConditions: Array.isArray(medicalConditions)
        ? medicalConditions
        : [],
    };

    // Create & save
    const newFeedback = new Feedback(payload);
    const saved = await newFeedback.save();
    res
      .status(201)
      .json({ message: "Feedback submitted successfully", data: saved });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res
        .status(400)
        .json({ message: "Validation Error", errors: messages });
    }
    console.error("CreateFeedback Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({ count: feedbacks.length, data: feedbacks });
  } catch (error) {
    console.error("GetAllFeedback Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
