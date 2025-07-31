import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import feedbackRoutes from "./routes/data.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.DATABASE_URI;

if (!MONGODB_URI) {
  console.error(
    "Error: DATABASE_URI is not defined in your .env file. Please check your .env file."
  );
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("Backend API is running and connected to MongoDB!");
});

// Use the feedback routes
app.use("/api/feedback", feedbackRoutes); // All routes defined in feedbackRoutes will be prefixed with /api/feedback

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access it at: http://localhost:${PORT}`);
});
