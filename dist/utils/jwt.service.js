"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtService {
    static async sign(email, id, refresh) {
        const payload = { email, id };
        const twoDays = 1000 * 60 * 48;
        const month = 1000 * 60 * 24 * 30;
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: refresh ? month : twoDays });
    }
    static async verify(token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    static decode(token) {
        return jsonwebtoken_1.default.decode(token);
    }
}
exports.JwtService = JwtService;
