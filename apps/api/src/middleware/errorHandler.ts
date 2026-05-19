import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
    constructor(
        public statusCode: number,
        public code: string,
        message: string
    ) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (
    err: AppError | Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const timestamp = new Date().toISOString();
    const requestPath = `${req.method} ${req.path}`;

    console.error(`[${timestamp}] ERROR on ${requestPath}`);
    console.error("Error Type:", err.constructor.name);
    console.error("Error Message:", err.message);
    console.error("Stack Trace:", err.stack);

    if (err instanceof AppError) {
        console.error(`[${timestamp}] AppError Response: ${err.statusCode} ${err.code}`);
        return res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code,
                message: err.message,
            },
        });
    }

    console.error(`[${timestamp}] Generic 500 Response`);
    res.status(500).json({
        success: false,
        error: {
            code: "INTERNAL_ERROR",
            message: "Internal server error",
        },
    });
};
