import students from "../data/students.js";
import {
  checkBodyType,
  checkDuplicateEmail,
  checkInvalidFields,
  checkStudentFields,
} from "./studentService.js";

function checkNewInfo(req, res, next) {
  try {
    const newStudent = req.body;
    checkBodyType(newStudent);
    checkStudentFields(newStudent);
    checkInvalidFields(newStudent);
    checkDuplicateEmail(students, newStudent);
    next();
  } catch (err) {
    next(err);
  }
}

export { checkNewInfo };
