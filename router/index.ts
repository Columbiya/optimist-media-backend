import { Router } from "express";
import { articlesRouter } from "./articles-router";
import { authRouter } from "./auth-router";
import { checkLinkRouter } from "./check-link-router";
import { subjectsRouter } from "./subjects-router";
import { usersRouter } from "./users-router";
import { commentsRouter } from "./comments-router";

export const router = Router()

router.use('/users', usersRouter)
router.use('/auth', authRouter)
router.use('/subjects', subjectsRouter)
router.use('/articles', articlesRouter)
router.use('/check-link', checkLinkRouter)
router.use('/comments', commentsRouter)