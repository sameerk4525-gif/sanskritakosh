import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import { publicLimiter } from "./middleware/rateLimiter.js";

// Routes
import grammarRoutes from "./routes/grammar.js";
import dictionaryRoutes from "./routes/dictionary.js";
import subhashitRoutes from "./routes/subhashit.js";
import songsRoutes from "./routes/songs.js";
import storiesRoutes from "./routes/stories.js";
import dailyRoutes from "./routes/daily.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(publicLimiter);

// Health check
app.get("/api/v1/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.get("/api/v1/", (req, res) => {
    res.json({ message: "SanskritKosh API v1" });
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
