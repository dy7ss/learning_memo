import { Router, Request, Response } from "express";
const { body, param, validationResult } = require('express-validator');
const commonUtil = require("../commonFunctions/util")
const memoService = require("../services/memoService")
const verifyAccessToken = require("../middlewares/verifyAccessToken");
const router = Router();

router.get("/", verifyAccessToken, async (req: Request, res: Response) => {
    const result = await memoService.getList(req)
    res.json({ result })
});

router.post("/", [body("used_time").isInt(), body("study_date").custom((value: string) => commonUtil.isRFC3339DateTime(value))], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const result = await memoService.register(req)
    res.json({ result })
});

router.put("/:id", [body("used_time").isInt(), body("study_date").custom((value: string) => commonUtil.isRFC3339DateTime(value))], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const result = await memoService.update(req);
    res.json({ result })
});

router.delete("/:id", async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const result = await memoService.cancel(req);
    res.json({ result });
});

export default router
