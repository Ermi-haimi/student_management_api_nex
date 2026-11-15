import students from "../data/students.js";
import { creatStudent } from "../services/studentService.js";

function getAllStudents(req, res) {
  res.status(200).json({
    success: true,
    data: students,
  });
}

function addStudent(req, res) {
  try {
    const student = creatStudent(req.body);
    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (err) {
    next(err);
  }
}

export { getAllStudents, addStudent };
