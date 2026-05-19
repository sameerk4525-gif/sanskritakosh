import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { logError } from "../utils/logger.js";

const router = Router();
const prisma = new PrismaClient();

// Get all stories with pagination
router.get("/", async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 20, category, difficulty } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        let where: any = {};
        if (category) where.category = category;
        if (difficulty) where.difficulty = difficulty;

        const [stories, total] = await Promise.all([
            prisma.story.findMany({
                where,
                skip,
                take: parseInt(limit as string),
                orderBy: { createdAt: "desc" },
            }),
            prisma.story.count({ where }),
        ]);

        res.json({
            success: true,
            data: stories,
            meta: { page: parseInt(page as string), total, limit: parseInt(limit as string) },
        });
    } catch (error) {
        logError("GET /api/v1/stories", error);
        res.status(500).json({
            success: false,
            error: { code: "INTERNAL_ERROR", message: "Failed to fetch stories" },
        });
    }
});

// Get single story by slug
router.get("/:slug", async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const story = await prisma.story.findUnique({
            where: { slug },
        });

        if (!story) {
            return res.status(404).json({
                success: false,
                error: { code: "NOT_FOUND", message: "Story not found" },
            });
        }

        // Increment view count
        await prisma.story.update({
            where: { slug },
            data: { viewCount: { increment: 1 } },
        });

        res.json({
            success: true,
            data: story,
        });
    } catch (error) {
        logError("GET /api/v1/stories/:slug", error);
        res.status(500).json({
            success: false,
            error: { code: "INTERNAL_ERROR", message: "Failed to fetch story" },
        });
    }
});

// Get featured stories
router.get("/featured/stories", async (_req: Request, res: Response) => {
    try {
        const stories = await prisma.story.findMany({
            orderBy: { viewCount: "desc" },
            take: 5,
        });

        res.json({
            success: true,
            data: stories,
        });
    } catch (error) {
        logError("GET /api/v1/stories/featured/stories", error);
        res.status(500).json({
            success: false,
            error: { code: "INTERNAL_ERROR", message: "Failed to fetch featured stories" },
        });
    }
});

export default router;
