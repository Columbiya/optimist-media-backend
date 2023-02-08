"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectsRouter = void 0;
const express_1 = require("express");
const subjects_controller_1 = require("../subjects/subjects.controller");
exports.subjectsRouter = (0, express_1.Router)();
exports.subjectsRouter.get('/', subjects_controller_1.SubjectsController.findAll);
exports.subjectsRouter.post('/', subjects_controller_1.SubjectsController.create);
