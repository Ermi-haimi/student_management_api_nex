import students from "../data/students.js";

function getAllStudents(req, res) {
  res.status(200).json({
    success: true,
    data: students,
  });
}

export { getAllStudents };
