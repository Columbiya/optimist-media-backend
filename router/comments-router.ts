import { Router } from "express";
import { CommentsController } from "../comments/comments.controller";

export const commentsRouter = Router()

commentsRouter.get('/:articleId', CommentsController.findAllComments)