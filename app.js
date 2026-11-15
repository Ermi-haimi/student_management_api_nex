import express from "express";
import router from "./routes/studentRoutes.js";

const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/api/students", router);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
