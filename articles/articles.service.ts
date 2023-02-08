import { ApiError } from "../error/ApiError";
import models, { ArticleAttributes } from "../models/models";
import { FilesService } from "../utils/files.service";
import * as path from 'path'
import { UsersService } from "../users/users.service";

export class ArticlesService {
    static async findAll(subjectId?: number) {
        const foundArticle = subjectId ? 
            await models.Article.findAll({where: { subjectId }, attributes: ['id', 'title', 'subjectId', 'userId', 'articleImage']}):
            await models.Article.findAll({attributes: ['id', 'title', 'subjectId', 'userId', 'articleImage']})

        return foundArticle
    }

    static async findOne(id?: number) {
        const foundArticle = await models.Article.findByPk(id)

        if (!foundArticle) {
            throw ApiError.badRequest("Статьи с таким id не существует")
        }

        return foundArticle
    }

    static async viewArticle(id: number) {
        if (!id) {
            throw ApiError.badRequest("Не указан id")
        }

        const foundArticle = await ArticlesService.findOne(id)

        foundArticle.views += 1
        foundArticle.save()

        return foundArticle.views
    }

    static async likeArticle(articleId: number, userId: number) {
        if (!articleId || !userId) {
            throw ApiError.badRequest("Не указан id статьи или id пользователя")
        }

        const articleToLike = await ArticlesService.findOne(articleId)
        const userLiking = await UsersService.findOne(userId)

        await models.ArticlesLikes.create({userId: userLiking.id, articleId: articleToLike.id})

        return true
    }

    static async getLike(articleId: number, userId: number) {
        if (!articleId || !userId) {
            throw ApiError.badRequest("Не указан id статьи или id пользователя")
        }

        const articleToLike = await ArticlesService.findOne(articleId)
        const userLiking = await UsersService.findOne(userId)

        const candidate = await models.ArticlesLikes.findOne({where: {userId: userLiking.id, articleId: articleToLike.id}})

        if (!candidate) {
            throw ApiError.badRequest("Для данного пользователя лайка не существует")
        }

        return candidate
    }

    static async unlikeArticle(articleId: number, userId: number) {
        const foundLike = await ArticlesService.getLike(articleId, userId)

        foundLike.destroy()

        return true
    }

    static async getLikesForArticle(articleId: number) {
        await ArticlesService.findOne(articleId) 

        const likesAmount = await models.ArticlesLikes.findAndCountAll({where: {articleId}})

        return likesAmount.count
    }

    static async create(title: string, text: string, subjectId: number, userId: number, articleImage: File) {
        const candidate = await models.Article.findOne({where: {title}})

        if (candidate) {
            throw ApiError.badRequest("There's already an article with the specified title")
        }

        let createdArticle

        if (!articleImage) {
            createdArticle = await models.Article.create({text, title, subjectId, userId})
        }
        else {
            const fileName = await FilesService.writeFile(articleImage, path.resolve(__dirname, "../../static/articles"))
            createdArticle = await models.Article.create({text, title, subjectId, userId, articleImage: fileName})
        }

        return createdArticle
    }

    static async edit(article: Partial<ArticleAttributes>) {
        if (!article.id) {
            throw ApiError.badRequest("No id specified")
        }

        const candidate = await models.Article.findByPk(article.id)

        if (!candidate) {
            throw ApiError.badRequest("No article found with the specified id")
        }

        await candidate.update({...article})
        return candidate
    }

    static async delete(id: number) {
        if (!id) {
            throw ApiError.badRequest("no id specified")
        }

        const candidate = await models.Article.findByPk(id)

        if (!candidate) {
            throw ApiError.badRequest("No candidate with the specified id found")
        }

        candidate.destroy()
        return candidate
    }
}