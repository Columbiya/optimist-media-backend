import { Router } from "express";
import { CheckLinkController } from "../check-link/check-link.controller";

export const checkLinkRouter = Router()

checkLinkRouter.get('/check', CheckLinkController.check)