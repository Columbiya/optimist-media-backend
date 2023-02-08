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
exports.ArticlesService = void 0;
const ApiError_1 = require("../error/ApiError");
const models_1 = __importDefault(require("../models/models"));
const files_service_1 = require("../utils/files.service");
const path = __importStar(require("path"));
const users_service_1 = require("../users/users.service");
class ArticlesService {
    static async findAll(subjectId) {
        const foundArticle = subjectId ?
            await models_1.default.Article.findAll({ where: { subjectId }, attributes: ['id', 'title', 'subjectId', 'userId', 'articleImage'] }) :
            await models_1.default.Article.findAll({ attributes: ['id', 'title', 'subjectId', 'userId', 'articleImage'] });
        return foundArticle;
    }
    static async findOne(id) {
        const foundArticle = await models_1.default.Article.findByPk(id);
        if (!foundArticle) {
            throw ApiError_1.ApiError.badRequest("Статьи с таким id не существует");
        }
        return foundArticle;
    }
    static async viewArticle(id) {
        if (!id) {
            throw ApiError_1.ApiError.badRequest("Не указан id");
        }
        const foundArticle = await ArticlesService.findOne(id);
        foundArticle.views += 1;
        foundArticle.save();
        return foundArticle.views;
    }
    static async likeArticle(articleId, userId) {
        if (!articleId || !userId) {
            throw ApiError_1.ApiError.badRequest("Не указан id статьи или id пользователя");
        }
        const articleToLike = await ArticlesService.findOne(articleId);
        const userLiking = await users_service_1.UsersService.findOne(userId);
        await models_1.default.ArticlesLikes.create({ userId: userLiking.id, articleId: articleToLike.id });
        return true;
    }
    static async getLike(articleId, userId) {
        if (!articleId || !userId) {
            throw ApiError_1.ApiError.badRequest("Не указан id статьи или id пользователя");
        }
        const articleToLike = await ArticlesService.findOne(articleId);
        const userLiking = await users_service_1.UsersService.findOne(userId);
        const candidate = await models_1.default.ArticlesLikes.findOne({ where: { userId: userLiking.id, articleId: articleToLike.id } });
        if (!candidate) {
            throw ApiError_1.ApiError.badRequest("Для данного пользователя лайка не существует");
        }
        return candidate;
    }
    static async unlikeArticle(articleId, userId) {
        const foundLike = await ArticlesService.getLike(articleId, userId);
        foundLike.destroy();
        return true;
    }
    static async getLikesForArticle(articleId) {
        await ArticlesService.findOne(articleId);
        const likesAmount = await models_1.default.ArticlesLikes.findAndCountAll({ where: { articleId } });
        return likesAmount.count;
    }
    static async create(title, text, subjectId, userId, articleImage) {
        const candidate = await models_1.default.Article.findOne({ where: { title } });
        if (candidate) {
            throw ApiError_1.ApiError.badRequest("There's already an article with the specified title");
        }
        let createdArticle;
        if (!articleImage) {
            createdArticle = await models_1.default.Article.create({ text, title, subjectId, userId });
        }
        else {
            const fileName = await files_service_1.FilesService.writeFile(articleImage, path.resolve(__dirname, "../../static/articles"));
            createdArticle = await models_1.default.Article.create({ text, title, subjectId, userId, articleImage: fileName });
        }
        return createdArticle;
    }
    static async edit(article) {
        if (!article.id) {
            throw ApiError_1.ApiError.badRequest("No id specified");
        }
        const candidate = await models_1.default.Article.findByPk(article.id);
        if (!candidate) {
            throw ApiError_1.ApiError.badRequest("No article found with the specified id");
        }
        await candidate.update({ ...article });
        return candidate;
    }
    static async delete(id) {
        if (!id) {
            throw ApiError_1.ApiError.badRequest("no id specified");
        }
        const candidate = await models_1.default.Article.findByPk(id);
        if (!candidate) {
            throw ApiError_1.ApiError.badRequest("No candidate with the specified id found");
        }
        candidate.destroy();
        return candidate;
    }
}
exports.ArticlesService = ArticlesService;
