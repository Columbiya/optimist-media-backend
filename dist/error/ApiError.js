"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
    static notFound(message) {
        return new ApiError(message, 404);
    }
    static badRequest(message) {
        return new ApiError(message, 400);
    }
    static internalError(message) {
        return new ApiError(message, 500);
    }
    static unauthorized(message) {
        return new ApiError(message, 403);
    }
}
exports.ApiError = ApiError;
