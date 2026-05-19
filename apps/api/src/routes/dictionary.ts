import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { logError } from "../utils/logger.js";

const router = Router();
const prisma = new PrismaClient();

// Get dictionary words with pagination
router.get("/", async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 20, search } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        let where: any = {};
        if (search) {
            where.OR = [
                { word: { contains: search as string, mode: "insensitive" } },
                { wordLatin: { contains: search as string, mode: "insensitive" } },
                { meanings: { hasSome: [search as string] } },
            ];
        }

        const [words, total] = await Promise.all([
            prisma.dictionaryWord.findMany({
                where,
                skip,
                take: parseInt(limit as string),
            }),
            prisma.dictionaryWord.count({ where }),
        ]);

        res.json({
            success: true,
            data: words,
            meta: {
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                total,
            },
        });
    } catch (error) {
        logError("GET /api/v1/dictionary", error);
        res.status(500).json({
            success: false,
            error: { code: "INTERNAL_ERROR", message: "Failed to fetch words" },
        });
    }
});

// Search dictionary
router.get("/search", async (req: Request, res: Response) => {
    try {
        const { q } = req.query;
        if (!q || typeof q !== "string" || q.length < 2) {
            return res.status(400).json({
                success: false,
                error: { code: "INVALID_QUERY", message: "Query must be at least 2 characters" },
            });
        }

        const words = await prisma.dictionaryWord.findMany({
            where: {
                OR: [
                    { word: { contains: q } },
                    { transliteration: { contains: q } },
                    { englishMeaning: { contains: q } },
                ],
            },
            take: 20,
        });

        res.json({
            success: true,
            data: words,
        });
    } catch (error) {
        logError("GET /api/v1/dictionary/search", error);
        res.status(500).json({
            success: false,
            error: { code: "INTERNAL_ERROR", message: "Search failed" },
        });
    }
});

// Get single word
router.get("/:word", async (req: Request, res: Response) => {
    try {
        const { word } = req.params;
        const dictionaryWord = await prisma.dictionaryWord.findUnique({
            where: { word },
        });

        if (!dictionaryWord) {
            return res.status(404).json({
                success: false,
                error: { code: "NOT_FOUND", message: "Word not found" },
            });
        }

        res.json({
            success: true,
            data: dictionaryWord,
        });
    } catch (error) {
        logError("GET /api/v1/dictionary/:word", error);
        res.status(500).json({
            success: false,
            error: { code: "INTERNAL_ERROR", message: "Failed to fetch word" },
        });
    }
});

export default router;
