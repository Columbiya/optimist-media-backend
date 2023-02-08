"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectsService = void 0;
const ApiError_1 = require("../error/ApiError");
const models_1 = __importDefault(require("../models/models"));
class SubjectsService {
    static async findAll() {
        return models_1.default.Subject.findAll();
    }
    static async create(subject) {
        const candidate = await models_1.default.Subject.findOne({ where: { subject } });
        if (candidate) {
            throw ApiError_1.ApiError.badRequest("There's already a subject with the specified title");
        }
        const createdSubject = await models_1.default.Subject.create({ subject });
        return createdSubject;
    }
}
exports.SubjectsService = SubjectsService;
