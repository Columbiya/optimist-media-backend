import { Router } from "express";
import { articlesRouter } from "./articles-router";
import { authRouter } from "./auth-router";
import { subjectsRouter } from "./subjects-router";
import { usersRouter } from "./users-router";

export const router = Router()

router.use('/users', usersRouter)
router.use('/auth', authRouter)
router.use('/subjects', subjectsRouter)
router.use('/articles', articlesRouter)