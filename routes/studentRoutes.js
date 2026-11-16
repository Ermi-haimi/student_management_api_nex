import express from "express";
import {
  addStudent,
  changeStudent,
  getAllStudents,
  getStudentById,
} from "../controllers/studentController.js";
import { checkNewInfo, checkPatchInfo } from "../services/studentValidation.js";

const router = express.Router();

router.get("/", getAllStudents);

router.get("/:id", getStudentById);

router.post("/", checkNewInfo, addStudent);

router.put("/:id", checkPatchInfo, changeStudent);

export default router;
