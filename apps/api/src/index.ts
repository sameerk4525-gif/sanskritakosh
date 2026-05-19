import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import { publicLimiter } from "./middleware/rateLimiter.js";
import { PrismaClient } from "@prisma/client";

// Routes
import grammarRoutes from "./routes/grammar.js";
import dictionaryRoutes from "./routes/dictionary.js";
import subhashitRoutes from "./routes/subhashit.js";
import songsRoutes from "./routes/songs.js";
import storiesRoutes from "./routes/stories.js";
import dailyRoutes from "./routes/daily.js";

dotenv.config();

console.log("SanskritKosh API starting...");
console.log("NODE_ENV:", process.env.NODE_ENV || "not set");
console.log("PORT:", process.env.PORT || 4000);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL || "not set");
console.log("NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL || "not set");
console.log("DATABASE_URL is", process.env.DATABASE_URL ? "set (length: " + process.env.DATABASE_URL.length + ")" : "MISSING - this will cause all routes to fail");

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason instanceof Error ? reason.stack : reason);
});

process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error.stack || error);
    process.exit(1);
});

// Test Prisma connection at startup
const prisma = new PrismaClient();

(async () => {
    try {
        console.log("Testing Prisma/Database connection...");
        await prisma.$connect();
        console.log("✅ Prisma connected successfully");
    } catch (error) {
        console.error("❌ CRITICAL: Failed to connect to database");
        console.error("Error:", error instanceof Error ? error.message : error);
        console.error("Stack:", error instanceof Error ? error.stack : "no stack");
        // Don't exit - let it fail per-request so we can see the error in logs
    }
})();

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 4000;


// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
    });
    next();
});

// Rate limiting
app.use(publicLimiter);

// Health check
app.get("/api/v1/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Database health check
app.get("/api/v1/health/db", async (req, res) => {
    try {
        console.log("[DB Health Check] Testing connection...");
        const result = await prisma.$queryRawUnsafe("SELECT 1");
        console.log("[DB Health Check] ✅ Success");
        res.json({
            status: "ok",
            database: "connected",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("[DB Health Check] ❌ Failed:");
        console.error("Error:", error instanceof Error ? error.message : error);
        console.error("Stack:", error instanceof Error ? error.stack : "no stack");
        res.status(503).json({
            status: "error",
            database: "disconnected",
            error: error instanceof Error ? error.message : String(error),
            timestamp: new Date().toISOString(),
        });
    }
});

// Routes
app.get("/api/v1/", (req, res) => {
    res.json({ message: "SanskritKosh API v1" });
});

// Debug endpoint - shows database tables
app.get("/api/v1/debug/tables", async (req, res) => {
    try {
        console.log("[Debug] Checking database tables...");
        const tables = await prisma.$queryRawUnsafe(`
            SELECT table_name FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log("[Debug] Tables found:", tables);

        // Test each main table
        const grammarCount = await prisma.grammarTopic.count().catch(e => ({ error: e.message }));
        const dictCount = await prisma.dictionaryWord.count().catch(e => ({ error: e.message }));
        const subCount = await prisma.subhashit.count().catch(e => ({ error: e.message }));
        const dailyCount = await prisma.dailyContent.count().catch(e => ({ error: e.message }));

        res.json({
            status: "ok",
            tables: tables,
            tableCounts: {
                grammarTopic: grammarCount,
                dictionaryWord: dictCount,
                subhashit: subCount,
                dailyContent: dailyCount,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("[Debug] Failed:", error);
        res.status(500).json({
            status: "error",
            error: error instanceof Error ? error.message : String(error),
            timestamp: new Date().toISOString(),
        });
    }
});

app.use("/api/v1/grammar", grammarRoutes);
app.use("/api/v1/dictionary", dictionaryRoutes);
app.use("/api/v1/subhashit", subhashitRoutes);
app.use("/api/v1/songs", songsRoutes);
app.use("/api/v1/stories", storiesRoutes);
app.use("/api/v1/daily", dailyRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Endpoint not found" },
    });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🕉️  SanskritKosh API running on port ${PORT}`);
});
