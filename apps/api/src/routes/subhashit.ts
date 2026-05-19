import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { logError } from "../utils/logger.js";

const router = Router();
const prisma = new PrismaClient();

// Get all subhashits
router.get("/", async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 20, tag, category } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        let where: any = { isPublished: true };
        if (tag) where.tags = { hasSome: [tag as string] };
        if (category) where.category = category;

        const [subhashits, total] = await Promise.all([
            prisma.subhashit.findMany({
                where,
                skip,
                take: parseInt(limit as string),
            }),
            prisma.subhashit.count({ where }),
        ]);

        res.json({
            success: true,
            data: subhashits,
            meta: { page: parseInt(page as string), total },
        });
    } catch (error) {
        logError("GET /api/v1/subhashit", error);
        res.status(500).json({
            success: false,
            error: { code: "INTERNAL_ERROR", message: "Failed to fetch subhashits" },
        });
    }
});

// Get featured subhashit
router.get("/featured", async (_req: Request, res: Response) => {
    try {
        const subhashit = await prisma.subhashit.findFirst({
            where: { isPublished: true, isFeatured: true },
        });

        res.json({
            success: true,
            data: subhashit,
        });
    } catch (error) {
        logError("GET /api/v1/subhashit/featured", error);
        res.status(500).json({
            success: false,
            error: { code: "INTERNAL_ERROR", message: "Failed to fetch featured" },
        });
    }
});

// Get single subhashit
router.get("/:slug", async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const subhashit = await prisma.subhashit.findUnique({
            where: { slug },
        });

        if (!subhashit) {
            return res.status(404).json({
                success: false,
                error: { code: "NOT_FOUND", message: "Subhashit not found" },
            });
        }

        return res.json({
            success: true,
            data: subhashit,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: { code: "INTERNAL_ERROR", message: "Failed to fetch subhashit" },
        });
    }
});

export default router;
