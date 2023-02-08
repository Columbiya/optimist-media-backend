"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_controller_1 = require("../users/users.controller");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get('/', users_controller_1.UsersController.findAll);
exports.usersRouter.post('/', users_controller_1.UsersController.create);
exports.usersRouter.delete('/:id', users_controller_1.UsersController.delete);
exports.usersRouter.post('/set-image/:id', users_controller_1.UsersController.setImage);
