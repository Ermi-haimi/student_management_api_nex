import students from "../data/students.js";
import CreateError from "./creatError.js";
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

function searchValidation(req, res, next) {
  const searchTerms = req.query;
  if (Object.keys(searchTerms).length === 0) {
    return next(new CreateError("search query must not be empty", 400));
  }

  if (Object.keys(searchTerms).length > 1) {
    return next(new CreateError("search term must be only one trem", 400));
  }

  const allowedSearchTerms = ["name", "email"];
  const key = Object.keys(searchTerms)[0];
  const term = searchTerms[key];

  if (!allowedSearchTerms.includes(key)) {
    return next(
      new CreateError("search term should be either name or email", 400),
    );
  }

  if (Object.hasOwn(searchTerms, key)) {
    if (
      typeof searchTerms[key] !== "string" ||
      searchTerms[key].trim() === ""
    ) {
      return next(
        new CreateError("search term should be non empty string", 400),
      );
    }
    req.validatedQuery = {
      field: key,
      term: term,
    };
  }
  next();
}

export { checkNewInfo, checkPutInfo, checkPatchInfo, searchValidation };
