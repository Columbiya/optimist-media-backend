"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const ApiError_1 = require("../error/ApiError");
const models_1 = __importDefault(require("../models/models"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const files_service_1 = require("../utils/files.service");
const path = __importStar(require("path"));
const ROLES_1 = require("../utils/ROLES");
class UsersService {
    static async findAll() {
        return models_1.default.User.findAll();
    }
    static async findOneByPk(id) {
        if (!id) {
            throw ApiError_1.ApiError.badRequest("Не указан ID пользователя");
        }
        const candidate = await models_1.default.User.findByPk(id, { attributes: ['username', 'email', 'id', 'profilePhoto'], include: [{
                    model: models_1.default.Article,
                    as: 'articles'
                }] });
        if (!candidate) {
            throw ApiError_1.ApiError.badRequest("Пользователя с таким ID не существует");
        }
        return candidate;
    }
    static async create(email, password) {
        if (!email || !password) {
            throw ApiError_1.ApiError.badRequest("Нужно указать email и пароль");
        }
        const candidate = await models_1.default.User.findOne({ where: { email } });
        if (candidate) {
            throw ApiError_1.ApiError.badRequest("Такой email уже зарегистрирован");
        }
        const salt = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const newUser = await models_1.default.User.create({ email, password: hashedPassword });
        return { id: newUser.id, email: newUser.email, isAdmin: newUser.role === ROLES_1.ROLES.ADMIN };
    }
    static async findOne(id) {
        if (!id) {
            throw ApiError_1.ApiError.badRequest("Не указан id пользователя");
        }
        const candidate = await models_1.default.User.findByPk(id);
        if (!candidate) {
            throw ApiError_1.ApiError.badRequest("такого пользователя не существует");
        }
        return candidate;
    }
    static async findOneByEmail(email) {
        if (!email) {
            throw ApiError_1.ApiError.badRequest("Не указан email пользователя");
        }
        const candidate = await models_1.default.User.findOne({ where: { email } });
        if (!candidate) {
            throw ApiError_1.ApiError.badRequest("Пользовать с указанным email не найден");
        }
        return candidate;
    }
    static async delete(id) {
        if (!id) {
            throw ApiError_1.ApiError.badRequest("Нужно уточнить id пользователя, который нужно удалить");
        }
        const candidate = await models_1.default.User.findByPk(id);
        if (!candidate) {
            throw ApiError_1.ApiError.badRequest("Пользователя с таким id не существует");
        }
        candidate.destroy();
        return candidate;
    }
    static async setImage(image, id) {
        if (!image) {
            throw ApiError_1.ApiError.badRequest("Не прикреплен файл");
        }
        const candidate = await models_1.default.User.findByPk(id);
        if (!candidate) {
            throw ApiError_1.ApiError.badRequest("Пользователя с таким id не существует");
        }
        const profileImagesPath = path.resolve(__dirname, "../../static/profile");
        const fileName = await files_service_1.FilesService.writeFile(image, profileImagesPath);
        candidate.set({
            profilePhoto: fileName
        });
        candidate.save();
        return candidate;
    }
}
exports.UsersService = UsersService;
