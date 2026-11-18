import express from "express";
import {
  addStudent,
  changeStudent,
  deleteStudent,
  filterStudent,
  getStudentById,
  searchStudent,
  showStat,
  updatePatchStudent,
} from "../controllers/studentController.js";
import {
  checkNewInfo,
  checkPatchInfo,
  checkPutInfo,
  filterValidation,
  searchValidation,
} from "../services/studentValidation.js";

const router = express.Router();

router.get("/", filterValidation, filterStudent);

router.get("/search", searchValidation, searchStudent);

router.get("/stats", showStat);

router.get("/:id", getStudentById);

router.post("/", checkNewInfo, addStudent);

router.put("/:id", checkPutInfo, changeStudent);

router.patch("/:id", checkPatchInfo, updatePatchStudent);

router.delete("/:id", deleteStudent);

export default router;
