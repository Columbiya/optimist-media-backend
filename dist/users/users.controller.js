"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const users_service_1 = require("./users.service");
class UsersController {
    static async findAll(req, res, next) {
        res.json(await users_service_1.UsersService.findAll());
    }
    static async findOneByPk(req, res, next) {
        try {
            const { id } = req.params;
            const foundUser = await users_service_1.UsersService.findOneByPk(+id);
            res.json(foundUser);
        }
        catch (e) {
            next(e);
        }
    }
    static async create(req, res, next) {
        try {
            const { email, password } = req.body;
            const newUser = await users_service_1.UsersService.create(email, password);
            res.json(newUser);
        }
        catch (e) {
            console.log(e.message);
            next(e);
        }
    }
    static async findOne(req, res, next) {
        try {
            const { email, password } = req.params;
            const newUser = await users_service_1.UsersService.create(email, password);
            res.json(newUser);
        }
        catch (e) {
            console.log(e.message);
            next(e);
        }
    }
    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const newUser = await users_service_1.UsersService.delete(+id);
            res.json(newUser);
        }
        catch (e) {
            next(e);
        }
    }
    static async setImage(req, res, next) {
        try {
            const { image } = req.files;
            const { id } = req.params;
            const userWithNewImage = await users_service_1.UsersService.setImage(image, +id);
            res.json(userWithNewImage);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.UsersController = UsersController;
