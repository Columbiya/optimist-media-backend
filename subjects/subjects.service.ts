import { ApiError } from "../error/ApiError";
import models from "../models/models";

export class SubjectsService {
    static async findAll() {
        return models.Subject.findAll()
    }

    static async create(subject: string) {
        const candidate = await models.Subject.findOne({where: {subject}})

        if (candidate) {
            throw ApiError.badRequest("There's already a subject with the specified title")
        }

        const createdSubject = await models.Subject.create({subject})
        return createdSubject
    }
}