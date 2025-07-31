import express from "express";
import {
  createFeedback,
  getAllFeedback,
} from "../controllers/data.controller.js";

const router = express.Router();

router.post("/", createFeedback);

router.get("/", getAllFeedback);

export default router;
