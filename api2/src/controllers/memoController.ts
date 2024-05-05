import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";
const memoService = require("../services/memoService")
const commonUtil = require("../commonFunctions/util")
const factory = require("../mappers/memoModelFactory")
const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const result = await memoService.getList(req.query.keyword)
    res.json({ result })
});

router.post("/", async (req: Request, res: Response) => {
    const registerQueryInfo = factory.toRegisterQueryInfo(req)
    const result = await memoService.register(registerQueryInfo)
    res.json({ result })
});

router.put("/:id", async (req: Request, res: Response) => {
    const updateQueryInfo = factory.toUpdateQueryInfo(req);
    const result = await memoService.update(updateQueryInfo);
    res.json({ result })
});

router.delete("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await memoService.cancel(id);
    res.json({ result });
});

export default router
