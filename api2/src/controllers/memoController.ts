import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req: Request, res: Response) => {
    if (typeof req.query.keyword === "string") {
        if (req.query.keyword) {
            const memos = await prisma.learning_list.findMany({
                where: {
                    subject_name: {
                        contains: req.query.keyword
                    }
                }
            });
            res.json({ memos });
        }
    } else {
        const memos = await prisma.learning_list.findMany();
        res.json({ memos });
    }
});

router.post("/", async (req: Request, res: Response) => {
    const { category, subject_name, used_time, study_date, remarks } = req.body;
    const user = await prisma.learning_list.create({
        data: { category, subject_name, used_time, study_date, remarks },
    });
    res.json({ user });
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
