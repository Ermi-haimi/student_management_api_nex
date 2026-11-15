import express from "express";
import {
  addStudent,
  getAllStudents,
} from "../controllers/studentController.js";
import { checkNewInfo } from "../services/studentValidation.js";

const router = express.Router();

router.get("/", getAllStudents);

router.post("/", checkNewInfo, addStudent);

export default router;
