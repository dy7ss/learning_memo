import { Router, Request, Response, response } from "express";
import { nextTick } from "process";
const { body, param, validationResult } = require('express-validator');
const commonUtil = require("../commonFunctions/util")
const authService = require("../services/authService")
const router = Router();

router.post("/login", async (req: Request, res: Response) => {
    try {
        const user_id = req?.body?.user_id;
        const password = req?.body?.password;
        const authInfo = await authService.login(user_id, password)
        res.json({ result: authInfo })
    } catch (e) {
        console.log(e)
        res.json({ error: "invalid auth info." })
    }
});

router.post("/register", async (req: Request, res: Response) => {
    try {
        const user_id = req?.body?.user_id;
        const password = req?.body?.password;

        const result = await authService.register(user_id, password)
        res.json(result)
    } catch (e) {
        console.log(e)
        res.json({ error: "register user failed" })
    }
})

export default router
