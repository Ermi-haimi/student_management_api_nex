import express from "express";
import {
  addStudent,
  changeStudent,
  getAllStudents,
  getStudentById,
  updatePatchStudent,
} from "../controllers/studentController.js";
import {
  checkNewInfo,
  checkPatchInfo,
  checkPutInfo,
} from "../services/studentValidation.js";

const router = express.Router();

router.get("/", getAllStudents);

router.get("/:id", getStudentById);

router.post("/", checkNewInfo, addStudent);

router.put("/:id", checkPutInfo, changeStudent);

router.patch("/:id", checkPatchInfo, updatePatchStudent);

export default router;
