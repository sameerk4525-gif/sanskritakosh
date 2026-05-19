import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { logError } from "../utils/logger.js";

const router = Router();
const prisma = new PrismaClient();

// Get all songs with pagination
router.get("/", async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 20, category } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        let where: any = {};
        if (category) where.category = category;

        const [songs, total] = await Promise.all([
            prisma.song.findMany({
                where,
                skip,
                take: parseInt(limit as string),
                orderBy: { createdAt: "desc" },
            }),
            prisma.song.count({ where }),
        ]);

        res.json({
            success: true,
            data: songs,
            meta: { page: parseInt(page as string), total, limit: parseInt(limit as string) },
        });
    } catch (error) {
        logError("GET /api/v1/songs", error);
        res.status(500).json({
            success: false,
            error: { code: "INTERNAL_ERROR", message: "Failed to fetch songs" },
        });
    }
});

// Get single song by slug
router.get("/:slug", async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const song = await prisma.song.findUnique({
            where: { slug },
        });

        if (!song) {
            return res.status(404).json({
                success: false,
                error: { code: "NOT_FOUND", message: "Song not found" },
            });
        }

        // Increment view count
        await prisma.song.update({
            where: { slug },
            data: { viewCount: { increment: 1 } },
        });

        res.json({
            success: true,
            data: song,
        });
    } catch (error) {
        logError("GET /api/v1/songs/:slug", error);
        res.status(500).json({
            success: false,
            error: { code: "INTERNAL_ERROR", message: "Failed to fetch song" },
        });
    }
});

// Get featured/popular songs
router.get("/trending/popular", async (_req: Request, res: Response) => {
    try {
        const songs = await prisma.song.findMany({
            orderBy: { viewCount: "desc" },
            take: 6,
        });

        res.json({
            success: true,
            data: songs,
        });
    } catch (error) {
        logError("GET /api/v1/songs/trending/popular", error);
        res.status(500).json({
            success: false,
            error: { code: "INTERNAL_ERROR", message: "Failed to fetch popular songs" },
        });
    }
});

export default router;
