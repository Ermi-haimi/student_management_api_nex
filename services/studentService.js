import students from "../data/students.js";
import CreateError from "./creatError.js";

function checkBodyType(body) {
  if (typeof body !== "object" || Array.isArray(body) || body === null) {
    throw new CreateError("Request body must be a student object", 400);
  }
  return true;
}

function checkStudentFields(newStudent) {
  if (
    !Object.hasOwn(newStudent, "name") ||
    !Object.hasOwn(newStudent, "email") ||
    !Object.hasOwn(newStudent, "course") ||
    !Object.hasOwn(newStudent, "age") ||
    !Object.hasOwn(newStudent, "gpa") ||
    !Object.hasOwn(newStudent, "status")
  ) {
    throw new CreateError("all fields must be filled,missing value", 400);
  }
  const age = Number(newStudent.age);
  const gpa = Number(newStudent.gpa);
  if (
    typeof newStudent.name !== "string" ||
    newStudent.name.trim() === "" ||
    typeof newStudent.email !== "string" ||
    newStudent.email.trim() === "" ||
    typeof newStudent.course !== "string" ||
    newStudent.course.trim() === "" ||
    typeof newStudent.status !== "string" ||
    newStudent.course.trim() === ""
  ) {
    throw new CreateError(
      "Name, email, course and status must be non-empty strings",
      400,
    );
  } else if (!Number.isFinite(gpa) || (gpa > 4 && gpa < 0)) {
    throw new CreateError("GPA should be between one and four", 400);
  }
  return true;
}

function checkInvalidFields(product) {
  const allowedFields = ["name", "email", "age", "course", "gpa", "status"];
  const invalidFields = Object.keys(product).filter(
    (key) => !allowedFields.includes(key),
  );

  if (invalidFields.length > 0) {
    throw new CreateError(`invalid fields: ${invalidFields.join(", ")}`, 400);
  }
  return true;
}

function generateId(students) {
  const idsArr = students.map((stud) => {
    return stud.id;
  });

  return idsArr.length > 0 ? Math.max(...idsArr) + 1 : 1;
}

function checkDuplicateEmail(students, newInfo, studId = -1) {
  let newEmail = newInfo.email;
  newEmail = newEmail.trim().toLowerCase();
  let student;
  if (studId !== -1) {
    student = students.find(
      (stud) => stud.id !== studId && stud.email === newEmail,
    );
  } else {
    student = students.find((stud) => stud.email === newEmail);
  }

  if (student) {
    throw new CreateError("a duplicate email", 409);
  }
  return true;
}

function creatStudent(newStudent) {
  const stud = {
    id: generateId(students),
    name: newStudent.name.trim(),
    email: newStudent.email.trim().toLowerCase(),
    age: newStudent.age,
    course: newStudent.course.trim(),
    gpa: newStudent.gpa,
    status: newStudent.status,
  };

  return stud;
}

function checkValidId(id) {
  const studId = Number(id);

  if (!Number.isInteger(studId) || studId <= 0) {
    throw new CreateError("an id must be positive integer number", 400);
  }
}

function findStudent(id) {
  const student = students.find((stud) => stud.id === id);

  if (!student) {
    throw new CreateError("student not found", 404);
  }
  return student;
}

export {
  checkBodyType,
  checkStudentFields,
  checkInvalidFields,
  generateId,
  checkDuplicateEmail,
  creatStudent,
  checkValidId,
  findStudent,
};
