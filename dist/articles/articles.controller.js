"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesController = void 0;
const articles_service_1 = require("./articles.service");
class ArticlesController {
    static async findAll(req, res, next) {
        try {
            const subjectId = req.query.subjectId;
            const foundArticles = await articles_service_1.ArticlesService.findAll(subjectId ? +subjectId : undefined);
            res.json(foundArticles);
        }
        catch (e) {
            next(e);
        }
    }
    static async findOne(req, res, next) {
        try {
            const id = req.params.id;
            const foundArticle = await articles_service_1.ArticlesService.findOne(id ? +id : undefined);
            res.json(foundArticle);
        }
        catch (e) {
            next(e);
        }
    }
    static async viewArticle(req, res, next) {
        try {
            const id = req.params.id;
            const views = await articles_service_1.ArticlesService.viewArticle(+id);
            res.json({ views });
        }
        catch (e) {
            next(e);
        }
    }
    static async likeArticle(req, res, next) {
        try {
            const { userId, articleId } = req.body;
            await articles_service_1.ArticlesService.likeArticle(articleId, userId);
            res.json({ status: true });
        }
        catch (e) {
            next(e);
        }
    }
    static async getLike(req, res, next) {
        try {
            const { userId, articleId } = req.body;
            await articles_service_1.ArticlesService.getLike(articleId, userId);
            res.json({ status: true });
        }
        catch (e) {
            next(e);
        }
    }
    static async getLikesForArticle(req, res, next) {
        try {
            const { articleId } = req.params;
            const amount = await articles_service_1.ArticlesService.getLikesForArticle(+articleId);
            res.json({ likesAmount: amount });
        }
        catch (e) {
            next(e);
        }
    }
    static async unlikeArticle(req, res, next) {
        try {
            const { userId, articleId } = req.body;
            await articles_service_1.ArticlesService.unlikeArticle(articleId, userId);
            res.json({ status: true });
        }
        catch (e) {
            next(e);
        }
    }
    static async create(req, res, next) {
        try {
            const { text, title, userId, subjectId } = req.body;
            const { image } = req.files;
            const createdArticle = await articles_service_1.ArticlesService.create(title, text, subjectId, userId, image);
            res.json(createdArticle);
        }
        catch (e) {
            next(e);
        }
    }
    static async writeArticleImage(req, res, next) {
        try {
            const { image } = req.files;
            const fileName = await articles_service_1.ArticlesService.writeArticleImage(image);
            res.json({ success: true, file: { url: `http://localhost:5000/${fileName}` } });
        }
        catch (e) {
            next(e);
        }
    }
    static async edit(req, res, next) {
        try {
            const { text, title, userId, subjectId } = req.body;
            const editedArticle = await articles_service_1.ArticlesService.edit({ title, text, subjectId, userId });
            res.json(editedArticle);
        }
        catch (e) {
            next(e);
        }
    }
    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deletedArticle = await articles_service_1.ArticlesService.delete(+id);
            res.json(deletedArticle);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.ArticlesController = ArticlesController;
