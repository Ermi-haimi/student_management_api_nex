import students from "../data/students.js";
import {
  creatStudent,
  findStudent,
  checkValidId,
} from "../services/studentService.js";

function getAllStudents(req, res) {
  res.status(200).json({
    success: true,
    data: students,
  });
}

function getStudentById(req, res, next) {
  try {
    checkValidId(req.params.id);
    const student = findStudent(Number(req.params.id));

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (err) {
    next(err);
  }
}

function addStudent(req, res) {
  try {
    const student = creatStudent(req.body);
    res.status(201).json({
      success: true,
      data: student,
    });
  } catch (err) {
    next(err);
  }
}

export { getAllStudents, addStudent, getStudentById };
