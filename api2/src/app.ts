import express from "express";
import memoController from "./controllers/memoController";

const app = express();
app.use(express.json());
app.use("/memo", memoController);

export default app;
