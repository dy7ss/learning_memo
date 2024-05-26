import express from "express";
import memoController from "./controllers/memoController";
import authController from "./controllers/authController";

const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors())

app.use("/memo", memoController);
app.use("/login", authController);


export default app;
