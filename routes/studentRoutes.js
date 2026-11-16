import express from "express";
import {
  addStudent,
  getAllStudents,
  getStudentById,
} from "../controllers/studentController.js";
import { checkNewInfo } from "../services/studentValidation.js";

const router = express.Router();

router.get("/", getAllStudents);

router.get("/:id", getStudentById);

router.post("/", checkNewInfo, addStudent);

export default router;
