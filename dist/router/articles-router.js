"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articlesRouter = void 0;
const express_1 = require("express");
const articles_controller_1 = require("../articles/articles.controller");
exports.articlesRouter = (0, express_1.Router)();
exports.articlesRouter.get('/', articles_controller_1.ArticlesController.findAll);
exports.articlesRouter.get('/:id', articles_controller_1.ArticlesController.findOne);
exports.articlesRouter.post('/', articles_controller_1.ArticlesController.create);
exports.articlesRouter.post('/like', articles_controller_1.ArticlesController.likeArticle);
exports.articlesRouter.post('/get-likes-amount/:articleId', articles_controller_1.ArticlesController.getLikesForArticle);
exports.articlesRouter.post('/unlike', articles_controller_1.ArticlesController.unlikeArticle);
exports.articlesRouter.post('/get-like', articles_controller_1.ArticlesController.getLike);
exports.articlesRouter.put('/:id', articles_controller_1.ArticlesController.viewArticle);
exports.articlesRouter.post('/set-articles-image', articles_controller_1.ArticlesController.writeArticleImage);
exports.articlesRouter.delete('/:id', articles_controller_1.ArticlesController.delete);
