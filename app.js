import express from "express";
import router from "./routes/studentRoutes.js";

const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/api/students", router);

function errorHandler(req, res, next, err) {
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
