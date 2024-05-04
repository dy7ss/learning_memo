import express from "express";
import memoController from "./controllers/memoController";

const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors())

app.use("/memo", memoController);


export default app;
