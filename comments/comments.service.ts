import { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/ApiError";
import models from "../models/models";

export class CommentsService {
    static async findAllComments(articleId: number) {
        return models.Comment.findAll({where: {articleId}})
    }
}