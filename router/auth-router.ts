import { Router } from "express";
import { AuthController } from "../auth/auth.controller";

export const authRouter = Router()

authRouter.post('/login', AuthController.login)
authRouter.post('/register', AuthController.register)
authRouter.post('/refresh', AuthController.refresh)
authRouter.post('/check', AuthController.check)