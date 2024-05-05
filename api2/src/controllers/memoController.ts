import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";
import { register } from "../models/memoModel";
const memoService = require("../services/memoService")
const commonUtil = require("../commonFunctions/util")
const factory = require("../mappers/memoModelFactory")
const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const result = await memoService.getList(req.query.keyword)
    res.json(result)
});

router.post("/", async (req: Request, res: Response) => {
    const registerQueryInfo = factory.toRegisterQueryInfo(req)
    const result = await memoService.register(registerQueryInfo)
    res.json({ result })
});

router.put("/:id", async (req: Request, res: Response) => {
    const { category, subject_name, used_time, study_date, remarks } = req.body;
    const user = await prisma.learning_list.update({
        where: { memo_id: parseInt(req.params?.id) },
        data: { category, subject_name, used_time, study_date, remarks },
    });
    res.json({ user });
});

router.delete("/:id", async (req: Request, res: Response) => {
    const user = await prisma.learning_list.delete({
        where: { memo_id: parseInt(req.params?.id) },
    });
    res.json({ user });
});

export default router
