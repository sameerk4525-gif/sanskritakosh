import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { logError } from "../utils/logger.js";

const router = Router();
const prisma = new PrismaClient();

// Get today's Sanskrit content
router.get("/", async (_req: Request, res: Response) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const dailyContent = await prisma.dailyContent.findFirst({
            where: {
                isActive: true,
                scheduledDate: {
                    gte: today,
                    lt: tomorrow,
                },
            },
        });

        if (!dailyContent) {
            return res.status(404).json({
                success: false,
                error: { code: "NOT_FOUND", message: "No daily content available today" },
            });
        }

        // Increment view count
        await prisma.dailyContent.update({
            where: { id: dailyContent.id },
            data: { viewCount: { increment: 1 } },
        });

        res.json({
            success: true,
            data: dailyContent,
        });
    } catch (error) {
        logError("GET /api/v1/daily", error);
        res.status(500).json({
            success: false,
            error: { code: "INTERNAL_ERROR", message: "Failed to fetch daily content" },
        });
    }
});

// Get daily content by type
router.get("/type/:type", async (req: Request, res: Response) => {
    try {
        const { type } = req.params;
        const { limit = 7 } = req.query;

        // Get last N days of content
        const days = parseInt(limit as string);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const dailyContents = await prisma.dailyContent.findMany({
            where: {
                contentType: type.toUpperCase(),
                isActive: true,
                scheduledDate: {
                    gte: startDate,
                },
            },
            orderBy: { scheduledDate: "desc" },
            take: days,
        });

        res.json({
            success: true,
            data: dailyContents,
            meta: { count: dailyContents.length, type },
        });
    } catch (error) {
        logError("GET /api/v1/daily/type/:type", error);
        res.status(500).json({
            success: false,
            error: { code: "INTERNAL_ERROR", message: "Failed to fetch daily content by type" },
        });
    }
});

// Get history of daily content
router.get("/history/:days", async (req: Request, res: Response) => {
    try {
        const { days } = req.params;
        const numDays = parseInt(days as string) || 30;

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - numDays);

        const history = await prisma.dailyContent.findMany({
            where: {
                isActive: true,
                scheduledDate: {
                    gte: startDate,
                },
            },
            orderBy: { scheduledDate: "desc" },
        });

        res.json({
            success: true,
            data: history,
            meta: { days: numDays, count: history.length },
        });
    } catch (error) {
        logError("GET /api/v1/daily/history/:days", error);
        res.status(500).json({
            success: false,
            error: { code: "INTERNAL_ERROR", message: "Failed to fetch daily content history" },
        });
    }
});

export default router;
