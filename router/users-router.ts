import { Router } from "express";
import { UsersController } from "../users/users.controller";

export const usersRouter = Router()

usersRouter.get('/', UsersController.findAll)
usersRouter.get('/:id', UsersController.findOneByPk)
usersRouter.post('/', UsersController.create)
usersRouter.delete('/:id', UsersController.delete)
usersRouter.post('/set-image/:id', UsersController.setImage)