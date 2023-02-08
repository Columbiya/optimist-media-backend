"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const ApiError_1 = require("../error/ApiError");
const jwt_service_1 = require("../utils/jwt.service");
function authMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    try {
        jwt_service_1.JwtService.verify(token);
        const payload = jwt_service_1.JwtService.decode(token);
        req.user = payload;
    }
    catch (e) {
        next(ApiError_1.ApiError.unauthorized("Unauthorized"));
    }
}
exports.authMiddleware = authMiddleware;
