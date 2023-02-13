import { NextFunction, Request, Response } from "express";
import { UsersService } from "./users.service";

export class UsersController {
    static async findAll(req: Request, res: Response, next: NextFunction) {
        res.json(await UsersService.findAll())
    }

    static async findOneByPk(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const foundUser = await UsersService.findOneByPk(+id)

            res.json(foundUser)
        } catch(e) {
            next(e)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            
            const newUser = await UsersService.create(email, password)

            res.json(newUser)
        } catch(e: any) {
            console.log(e.message)
            next(e)
        }
    }

    static async findOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.params
            
            const newUser = await UsersService.create(email, password)

            res.json(newUser)
        } catch(e: any) {
            console.log(e.message)
            next(e)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            
            const newUser = await UsersService.delete(+id)

            res.json(newUser)
        } catch(e: any) {
            next(e)
        }
    }

    static async setImage(req: Request, res: Response, next: NextFunction) {
        try {
            const { image } = req.files as any
            const { id } = req.params
            
            const userWithNewImage = await UsersService.setImage(image, +id)

            res.json(userWithNewImage)
        } catch(e: any) {
            next(e)
        }
    }
}