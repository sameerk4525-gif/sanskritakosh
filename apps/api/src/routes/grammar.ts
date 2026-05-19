import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { logError } from "../utils/logger.js";

const router = Router();
const prisma = new PrismaClient();

// Get all grammar topics
router.get("/topics", async (req: Request, res: Response) => {
    try {
        const { category, level, page = 1, limit = 20 } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        let where: any = { isPublished: true };
        if (category) where.category = category;
        if (level) where.level = level;

        const [topics, total] = await Promise.all([
            prisma.grammarTopic.findMany({
                where,
                skip,
                take: parseInt(limit as string),
            }),
            prisma.grammarTopic.count({ where }),
        ]);

        res.json({
            success: true,
            data: topics,
            meta: { page: parseInt(page as string), total },
        });
    } catch (error) {
        logError("GET /api/v1/grammar/topics", error);
        res.status(500).json({
            success: false,
            error: { code: "INTERNAL_ERROR", message: "Failed to fetch topics" },
        });
    }
});

// Get single topic
router.get("/topics/:slug", async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const topic = await prisma.grammarTopic.findUnique({
            where: { slug },
        });

        if (!topic) {
            return res.status(404).json({
                success: false,
                error: { code: "NOT_FOUND", message: "Topic not found" },
            });
        }

        return res.json({
            success: true,
            data: topic,
        });
    } catch (error) {
        logError("GET /api/v1/grammar/topics/:slug", error);
        return res.status(500).json({
            success: false,
            error: { code: "INTERNAL_ERROR", message: "Failed to fetch topic" },
        });
    }
});

export default router;
