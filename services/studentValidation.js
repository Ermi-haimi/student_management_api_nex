import students from "../data/students.js";
import {
  buildPatchUpdates,
  checkBodyType,
  checkDuplicateEmail,
  checkInvalidFields,
  checkStudentFields,
  checkValidId,
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

function checkPutInfo(req, res, next) {
  try {
    const newInfo = req.body;
    checkBodyType(newInfo);
    checkStudentFields(newInfo);
    checkInvalidFields(newInfo);
    checkValidId(req.params.id);
    checkDuplicateEmail(students, newInfo, Number(req.params.id));
    next();
  } catch (err) {
    next(err);
  }
}

function checkPatchInfo(req, res, next) {
  try {
    const newInfo = req.body;
    checkBodyType(newInfo);
    checkInvalidFields(newInfo);
    checkValidId(req.params.id);

    const update = buildPatchUpdates(req.body, students, Number(req.params.id));
    req.patchedInfo = update;

    next();
  } catch (err) {
    next(err);
  }
}

export { checkNewInfo, checkPutInfo, checkPatchInfo };
