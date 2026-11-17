import students from "../data/students.js";
import CreateError from "../services/creatError.js";
import {
  creatStudent,
  findStudent,
  checkValidId,
  updateStudent,
  averageGpa,
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
    students.push(student);
    res.status(201).json({
      success: true,
      data: student,
    });
  } catch (err) {
    next(err);
  }
}

function changeStudent(req, res, next) {
  try {
    const studentWithIndex = findStudent(Number(req.params.id));
    const index = studentWithIndex[1];
    const student = updateStudent(req.body, index);

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (err) {
    next(err);
  }
}

function updatePatchStudent(req, res, next) {
  try {
    const id = Number(req.params.id);
    const stId = findStudent(id);
    const index = stId[1];

    Object.assign(students[index], req.patchedInfo);

    res.status(200).json({
      success: true,
      data: students[index],
    });
  } catch (err) {
    next(err);
  }
}

function deleteStudent(req, res, next) {
  try {
    const studId = Number(req.params.id);

    checkValidId(studId);

    const student = students.findIndex((stud) => stud.id === studId);
    if (student === -1) {
      return next(new CreateError("student is not found", 404));
    }
    students.splice(student, 1);
    res.status(200).json({
      success: true,
      message: "student deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

function searchStudent(req, res, next) {
  const key = req.validatedQuery.field;
  const term = req.validatedQuery.term;
  const result = students.filter((stud) =>
    stud[key].toLowerCase().includes(term),
  );

  res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  });
}

function showStat(req, res, next) {
  const average = averageGpa(students);
  const totalStudent = students.length;

  res.status(200).json({
    success: true,
    data: {
      studentsCount: totalStudent,
      averageGpa: average,
    },
  });
}

export {
  getAllStudents,
  addStudent,
  getStudentById,
  changeStudent,
  updatePatchStudent,
  deleteStudent,
  searchStudent,
  showStat,
};
