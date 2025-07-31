import mongoose from "mongoose";

const validAgeGroups = ["<18", "18-30", "31-45", "46-60", "60+"];
const validBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const validConditions = [
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Arthritis",
  "Thyroid",
  "Cancer",
  "Migrane",
  "Obesity",
];
const nameRegex = /^[A-Za-z\s'-]+$/;

const feedbackSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters long"],
      match: [
        nameRegex,
        "First name can only contain letters, spaces, apostrophes, or hyphens",
      ],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters long"],
      match: [
        nameRegex,
        "Last name can only contain letters, spaces, apostrophes, or hyphens",
      ],
    },
    ageGroup: {
      type: String,
      required: [true, "Age group is required"],
      enum: {
        values: validAgeGroups,
        message: '"{VALUE}" is not a valid age group',
      },
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      enum: {
        values: validBloodGroups,
        message: '"{VALUE}" is not a valid blood group',
      },
    },
    medicalConditions: {
      type: [String],
      enum: {
        values: validConditions,
        message: '"{VALUE}" is not a recognized medical condition',
      },
      default: [],
    },
    submissionDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Feedback =
  mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

export default Feedback;
