import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters long"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters long"],
    },
    ageGroup: {
      type: String,
      required: [true, "Age group is required"],
      enum: {
        values: ["<18", "18-30", "31-45", "46-60", "60+"],
        message: '"{VALUE}" is not a valid age group',
      },
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: '"{VALUE}" is not a valid blood group',
      },
    },
    medicalConditions: {
      type: [String],
      default: [],
    },
    submissionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
