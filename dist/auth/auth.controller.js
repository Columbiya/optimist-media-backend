"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const users_service_1 = require("../users/users.service");
const jwt_service_1 = require("../utils/jwt.service");
const ROLES_1 = require("../utils/ROLES");
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
            const user = jwt_service_1.JwtService.decode(token);
            const candidate = await users_service_1.UsersService.findOne(user.id);
            res.json({ status: true, user: { ...user, isAdmin: candidate.role === ROLES_1.ROLES.ADMIN } });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.AuthController = AuthController;
