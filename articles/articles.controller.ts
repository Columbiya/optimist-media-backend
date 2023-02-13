import { NextFunction, Request, Response } from "express";
import { ArticlesService } from "./articles.service";

export class ArticlesController {
    static async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const subjectId = req.query.subjectId
            const foundArticles = await ArticlesService.findAll(subjectId ? +subjectId: undefined)
            res.json(foundArticles)
            
        } catch(e) {
            next(e)
        }
    }

    static async findOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id

            const foundArticle = await ArticlesService.findOne(id ? +id: undefined)
            
            res.json(foundArticle)
        } catch(e) {
            next(e)
        }
    }

    static async viewArticle(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string
            const views = await ArticlesService.viewArticle(+id)

            res.json({views})
        } catch(e) {
            next(e)
        }
    }

    static async likeArticle(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, articleId } = req.body
            await ArticlesService.likeArticle(articleId, userId)

            res.json({status: true})
        } catch(e) {
            next(e)
        } 
    }

    static async getLike(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, articleId } = req.body
            await ArticlesService.getLike(articleId, userId)

            res.json({status: true})
        } catch(e) {
            next(e)
        } 
    }

    static async getLikesForArticle(req: Request, res: Response, next: NextFunction) {
        try {
            const { articleId } = req.params
            const amount = await ArticlesService.getLikesForArticle(+articleId)

            res.json({likesAmount: amount})
        } catch(e) {
            next(e)
        } 
    }

    static async unlikeArticle(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, articleId } = req.body
            await ArticlesService.unlikeArticle(articleId, userId)

            res.json({status: true})
        } catch(e) {
            next(e)
        } 
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { text, title, userId, subjectId } = req.body
            const { image } = req.files as any

            const createdArticle = await ArticlesService.create(title, text, subjectId, userId, image)
            res.json(createdArticle)
        } catch(e) {
            next(e)
        }
    }

    static async writeArticleImage(req: Request, res: Response, next: NextFunction) {
        try {
            const { image } = req.files as any

            const fileName = await ArticlesService.writeArticleImage(image)
            res.json({success: true, file: {url: `http://localhost:5000/${fileName}`}})
        } catch(e) {
            next(e)
        }
    }

    static async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const { text, title, userId, subjectId } = req.body

            const editedArticle = await ArticlesService.edit({title, text, subjectId, userId})
            res.json(editedArticle)
        } catch(e) {
            next(e)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const deletedArticle = await ArticlesService.delete(+id)
            res.json(deletedArticle)
        } catch(e) {
            next(e)
        }
    }
}