class ApiError extends Error {
    constructor(statusCode, message, errors = [], code = "ERROR") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
        this.code = code;

        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message) {
        return new ApiError(400, message, [], "BAD_REQUEST");
    }

    static notFound(message) {
        return new ApiError(404, message, [], "NOT_FOUND");
    }

    static unauthorized(message = "Unauthorized access") {
        return new ApiError(401, message, [], "UNAUTHORIZED");
    }

    static forbidden(message = "Forbidden access") {
        return new ApiError(403, message, [], "FORBIDDEN");
    }

    static serverError(message = "Internal server error") {
        return new ApiError(500, message, [], "SERVER_ERROR");
    }

    static validationError(errors) {
        return new ApiError(422, "Validation failed", errors, "VALIDATION_ERROR");
    }
}

export { ApiError };
