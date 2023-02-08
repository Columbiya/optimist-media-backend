"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jwt_service_1 = require("../utils/jwt.service");
const auth_service_1 = require("./auth.service");
class AuthController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            console.log(email, password);
            const response = await auth_service_1.AuthService.login(email, password);
            res.json({ status: true, ...response });
        }
        catch (e) {
            next(e);
        }
    }
    static async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await auth_service_1.AuthService.register(email, password);
            res.json(result);
        }
        catch (e) {
            next(e);
        }
    }
    static async refresh(req, res, next) {
        try {
            const authorization = req.headers.authorization;
            const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1];
            const newPair = auth_service_1.AuthService.refresh(token);
            res.json(newPair);
        }
        catch (e) {
            next(e);
        }
    }
    static async check(req, res, next) {
        try {
            const authorization = req.headers.authorization;
            const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1];
            console.log(token, authorization);
            jwt_service_1.JwtService.verify(token || "");
            res.json({ status: true, user: jwt_service_1.JwtService.decode(token) });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.AuthController = AuthController;
