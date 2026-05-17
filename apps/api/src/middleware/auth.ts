import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
    userId?: string;
    userRole?: string;
}

export const verifyToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            error: { code: "UNAUTHORIZED", message: "No token provided" },
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
            userId: string;
            role: string;
        };
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            error: { code: "INVALID_TOKEN", message: "Invalid token" },
        });
    }
};

export const adminGuard = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    if (!req.userRole || !["ADMIN", "SUPER_ADMIN"].includes(req.userRole)) {
        return res.status(403).json({
            success: false,
            error: { code: "FORBIDDEN", message: "Admin access required" },
        });
    }
    next();
};
