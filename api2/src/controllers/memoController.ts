import { Router, Request, Response } from "express";
const memoService = require("../services/memoService")
const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const result = await memoService.getList(req)
    res.json({ result })
});

router.post("/", async (req: Request, res: Response) => {

    const result = await memoService.register(req)
    res.json({ result })
});

router.put("/:id", async (req: Request, res: Response) => {
    const result = await memoService.update(req);
    res.json({ result })
});

router.delete("/:id", async (req: Request, res: Response) => {
    const result = await memoService.cancel(req);
    res.json({ result });
});

export default router
