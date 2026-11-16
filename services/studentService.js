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
    newStudent.status.trim() === ""
  ) {
    throw new CreateError(
      "Name, email, course and status must be non-empty strings",
      400,
    );
  } else if (!Number.isFinite(gpa) || gpa > 4 || gpa < 0) {
    throw new CreateError("GPA should be a number between one and four", 400);
  } else if (!Number.isInteger(age) || age < 16) {
    throw new CreateError(
      "age should be a positive number greater than 16",
      400,
    );
  } else if (
    newStudent.status.trim().toLowerCase() !== "active" &&
    newStudent.status.trim().toLowerCase() !== "inactive"
  ) {
    throw new CreateError("staus musst be either active or inavtive", 400);
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
    age: Number(newStudent.age),
    course: newStudent.course.trim(),
    gpa: Number(newStudent.gpa),
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
  let studIndex = -1;

  const student = students.find((stud, index) => {
    if (stud.id === id) {
      studIndex = index;
      return true;
    }
    return false;
  });

  if (!student) {
    throw new CreateError("student not found", 404);
  }
  return [student, studIndex];
}

function updateStudent(newInfo, index) {
  const updates = {
    name: newInfo.name.trim().toLowerCase(),
    email: newInfo.email.trim().toLowerCase(),
    age: Number(newInfo.age),
    course: newInfo.course.trim().toLowerCase(),
    gpa: Number(newInfo.gpa),
    status: newInfo.status.trim(),
  };

  Object.assign(students[index], updates);
  return students[index];
}

function buildPatchUpdates(newInfo, students, studId) {
  checkBodyType(newInfo);
  if (Object.keys(newInfo).length === 0) {
    throw new CreateError("patch body cannot be empty", 400);
  }
  let updates = {};

  if (Object.hasOwn(newInfo, "name")) {
    if (typeof newInfo.name !== "string" || newInfo.name.trim() === "") {
      throw new CreateError("name cannot be empty", 400);
    }
    updates.name = newInfo.name.trim();
  }

  if (Object.hasOwn(newInfo, "email")) {
    if (typeof newInfo.email !== "string" || newInfo.email.trim() === "") {
      throw new CreateError("email cannot be empty", 400);
    }

    checkDuplicateEmail(students, newInfo, studId);

    let newEmail = newInfo.email;
    newEmail = newEmail.trim().toLowerCase();
    updates.email = newEmail;
  }

  if (Object.hasOwn(newInfo, "course")) {
    if (typeof newInfo.course !== "string" || newInfo.course.trim() === "") {
      throw new CreateError("course cannot be empty", 400);
    }
    updates.course = newInfo.course.trim();
  }

  if (Object.hasOwn(newInfo, "age")) {
    const age = Number(newInfo.age);
    if (!Number.isInteger(age) || age < 16) {
      throw new CreateError(
        "a student must be integer of at least 16 years old",
        400,
      );
    }
    updates.age = age;
  }
  if (Object.hasOwn(newInfo, "gpa")) {
    const gpa = Number(newInfo.gpa);
    if (!Number.isFinite(gpa) || gpa > 4 || gpa < 0) {
      throw new CreateError("GPA should be a number between one and four", 400);
    }
    updates.gpa = gpa;
  }

  if (Object.hasOwn(newInfo, "status")) {
    if (typeof newInfo.status !== "string" || newInfo.status.trim() === "") {
      throw new CreateError("status cannot be empty", 400);
    } else if (
      newInfo.status.trim().toLowerCase() !== "active" &&
      newInfo.status.trim().toLowerCase() !== "inactive"
    ) {
      throw new CreateError("staus musst be either active or inavtive", 400);
    }
    updates.status = newInfo.status.trim();
  }

  return updates;
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
  updateStudent,
  buildPatchUpdates,
};
