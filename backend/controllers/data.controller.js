import Feedback from "../models/data.model.js";

export const createFeedback = async (req, res) => {
  try {
    const { firstName, lastName, ageGroup, bloodGroup, medicalConditions } =
      req.body;

    if (!firstName || !lastName || !ageGroup || !bloodGroup) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields." });
    }

    const newFeedback = new Feedback({
      firstName,
      lastName,
      ageGroup,
      bloodGroup,
      medicalConditions: medicalConditions || [],
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json({
      message: "Feedback submitted successfully!",
      data: savedFeedback,
    });
  } catch (error) {
    // Handle Mongoose validation errors or other server errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res
        .status(400)
        .json({ message: "Validation Error", errors: messages });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    res.status(200).json({ count: feedbacks.length, data: feedbacks });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
