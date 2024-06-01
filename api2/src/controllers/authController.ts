import { Router, Request, Response, response } from "express";
import { nextTick } from "process";
const { body, param, validationResult } = require('express-validator');
const commonUtil = require("../commonFunctions/util")
const authService = require("../services/authService")
const router = Router();

router.post("/login", async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const authInfo = await authService.login(body)
        res.json(authInfo)
    } catch (e) {
        console.log(e)
    }
});

export default router
