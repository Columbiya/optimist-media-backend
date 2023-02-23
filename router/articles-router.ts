import { Router } from "express";
import { ArticlesController } from "../articles/articles.controller";

export const articlesRouter = Router()

articlesRouter.get('/', ArticlesController.findAll)
articlesRouter.get('/:id', ArticlesController.findOne)
articlesRouter.post('/', ArticlesController.create)
articlesRouter.post('/like', ArticlesController.likeArticle)
articlesRouter.post('/get-likes-amount/:articleId', ArticlesController.getLikesForArticle)
articlesRouter.post('/unlike', ArticlesController.unlikeArticle)
articlesRouter.post('/get-like', ArticlesController.getLike)
articlesRouter.put('/:id', ArticlesController.viewArticle)
articlesRouter.post('/set-articles-image', ArticlesController.writeArticleImage)
articlesRouter.delete('/:id', ArticlesController.delete)