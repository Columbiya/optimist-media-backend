"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const users_service_1 = require("../users/users.service");
const jwt_service_1 = require("../utils/jwt.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const ApiError_1 = require("../error/ApiError");
const ROLES_1 = require("../utils/ROLES");
class AuthService {
    static async login(email, password) {
        const candidate = await users_service_1.UsersService.findOneByEmail(email);
        try {
            const isMatch = await bcrypt_1.default.compare(password, candidate.password);
            const token = await jwt_service_1.JwtService.sign(candidate.email, candidate.id);
            const refreshToken = await jwt_service_1.JwtService.sign(candidate.email, candidate.id, true);
            return {
                user: {
                    id: candidate.id,
                    email: candidate.email,
                    isAdmin: candidate.role === ROLES_1.ROLES.ADMIN
                },
                token, refreshToken
            };
        }
        catch (e) {
            throw ApiError_1.ApiError.badRequest("Неправильный логин или пароль");
        }
    }
    static async register(email, password) {
        const createdUser = await users_service_1.UsersService.create(email, password);
        const token = await jwt_service_1.JwtService.sign(createdUser.email, createdUser.id);
        const refreshToken = await jwt_service_1.JwtService.sign(createdUser.email, createdUser.id, true);
        console.log(token, refreshToken);
        return { user: { id: createdUser.id, email: createdUser.email }, token, refreshToken };
    }
    static async refresh(token) {
        await jwt_service_1.JwtService.verify(token);
        const user = await jwt_service_1.JwtService.decode(token);
        return {
            token: await jwt_service_1.JwtService.sign(user.email, user.id),
            refreshToken: await jwt_service_1.JwtService.sign(user.email, user.id, true)
        };
    }
}
exports.AuthService = AuthService;
