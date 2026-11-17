import express from "express";
import {
  addStudent,
  changeStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  searchStudent,
  updatePatchStudent,
} from "../controllers/studentController.js";
import {
  checkNewInfo,
  checkPatchInfo,
  checkPutInfo,
  searchValidation,
} from "../services/studentValidation.js";

const router = express.Router();

router.get("/", getAllStudents);

router.get("/search", searchValidation, searchStudent);

router.get("/:id", getStudentById);

router.post("/", checkNewInfo, addStudent);

router.put("/:id", checkPutInfo, changeStudent);

router.patch("/:id", checkPatchInfo, updatePatchStudent);

router.delete("/:id", deleteStudent);

export default router;
