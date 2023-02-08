"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectsController = void 0;
const subjects_service_1 = require("./subjects.service");
class SubjectsController {
    static async findAll(req, res, next) {
        try {
            res.json(await subjects_service_1.SubjectsService.findAll());
        }
        catch (e) {
            next(e);
        }
    }
    static async create(req, res, next) {
        try {
            const { subject } = req.body;
            const createdSubject = await subjects_service_1.SubjectsService.create(subject);
            res.json(createdSubject);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.SubjectsController = SubjectsController;
