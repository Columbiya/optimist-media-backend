import { NextFunction, Request, Response } from "express";
import { CommentsService } from "./comments.service";

export class CommentsController {
    static async findAllComments(req: Request, res: Response, next: NextFunction) {
        try {
            const { articleId } = req.params

            res.json(await CommentsService.findAllComments(+articleId))
        } catch(e) {
            next(e)
        }
    }
}