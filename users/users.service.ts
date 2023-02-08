import { ApiError } from "../error/ApiError";
import models from "../models/models";
import bcrypt from 'bcrypt'
import { FilesService } from "../utils/files.service";
import * as path from 'path'

export class UsersService {
    static async findAll() {
        return models.User.findAll()
    }

    static async create(email: string, password: string) {
        if (!email || !password) {
            throw ApiError.badRequest("Нужно указать email и пароль")
        }

        const candidate = await models.User.findOne({where: { email }})

        if (candidate) {
            throw ApiError.badRequest("Такой email уже зарегистрирован")
        }

        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await models.User.create({email, password: hashedPassword})

        return {id: newUser.id, email: newUser.email}
    }

    static async findOne(id?: number) {
        if (!id) {
            throw ApiError.badRequest("Не указан id пользователя")
        }

        const candidate = await models.User.findByPk(id)

        if (!candidate) {
            throw ApiError.badRequest("такого пользователя не существует")
        }

        return candidate
    }

    static async findOneByEmail(email: string) {
        if (!email) {
            throw ApiError.badRequest("Не указан email пользователя")
        }

        const candidate = await models.User.findOne({where: {email}})

        if (!candidate) {
            throw ApiError.badRequest("Пользовать с указанным email не найден")
        }

        return candidate
    }

    static async delete(id: number) {
        if (!id) {
            throw ApiError.badRequest("Нужно уточнить id пользователя, который нужно удалить")
        }

        const candidate = await models.User.findByPk(id)

        if (!candidate) {
            throw ApiError.badRequest("Пользователя с таким id не существует")
        }

        candidate.destroy()
        return candidate
    }

    static async setImage(image: File, id: number) {
        if (!image) {
            throw ApiError.badRequest("Не прикреплен файл")
        }

        const candidate = await models.User.findByPk(id)

        if (!candidate) {
            throw ApiError.badRequest("Пользователя с таким id не существует")
        }

        const profileImagesPath = path.resolve(__dirname, "../../static/profile")
        const fileName = await FilesService.writeFile(image, profileImagesPath)

        candidate.set({
            profilePhoto: fileName
        })

        candidate.save()
        
        return candidate
    }
}