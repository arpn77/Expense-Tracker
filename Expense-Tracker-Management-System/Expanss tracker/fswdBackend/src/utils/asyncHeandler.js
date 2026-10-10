import { ApiError } from "./ApiError.js";

const asyncHandler = (requestHandler) => async (req, res, next) => {
    try {
        const result = await requestHandler(req, res, next);
        return result;
    } catch (error) {
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => ({
                field: err.path,
                message: err.message
            }));
            return res.status(422).json({
                success: false,
                message: "Validation failed",
                errors,
                code: "VALIDATION_ERROR"
            });
        }

        // Handle duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(409).json({
                success: false,
                message: `${field} already exists`,
                code: "DUPLICATE_ERROR"
            });
        }

        // Handle file upload errors
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({
                success: false,
                message: "File size too large",
                code: "FILE_SIZE_ERROR"
            });
        }

        // Handle JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid authentication token",
                code: "INVALID_TOKEN"
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token has expired",
                code: "TOKEN_EXPIRED"
            });
        }

        // Handle API errors
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errors: error.errors,
                code: error.code
            });
        }

        // Default error response
        console.error("Unhandled error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            code: "SERVER_ERROR",
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
        });
    }
};

export { asyncHandler };
