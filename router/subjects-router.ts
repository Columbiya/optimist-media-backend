import { Router } from "express";
import { SubjectsController } from "../subjects/subjects.controller";

export const subjectsRouter = Router()

subjectsRouter.get('/', SubjectsController.findAll)
subjectsRouter.post('/', SubjectsController.create)