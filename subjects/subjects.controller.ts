import { NextFunction, Request, Response } from "express";
import { SubjectsService } from "./subjects.service";

export class SubjectsController {
    static async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(await SubjectsService.findAll())
        } catch(e) {
            next(e)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { subject } = req.body

            const createdSubject = await SubjectsService.create(subject)
            res.json(createdSubject)
        } catch(e) {
            next(e)
        }
    }
}