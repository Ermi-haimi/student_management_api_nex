import students from "../data/students.js";
import {
  creatStudent,
  findStudent,
  checkValidId,
  updateStudent,
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
    const studentWithIndex = findStudent(Number(req.params.id));
    const student = studentWithIndex[0];
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

function changeStudent(req, res) {
  try {
    const studentWithIndex = findStudent(Number(req.params.id));
    const index = studentWithIndex[1];
    const student = updateStudent(req.body, index);

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {}
}

export { getAllStudents, addStudent, getStudentById, changeStudent };
