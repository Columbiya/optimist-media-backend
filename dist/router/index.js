"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const articles_router_1 = require("./articles-router");
const auth_router_1 = require("./auth-router");
const subjects_router_1 = require("./subjects-router");
const users_router_1 = require("./users-router");
exports.router = (0, express_1.Router)();
exports.router.use('/users', users_router_1.usersRouter);
exports.router.use('/auth', auth_router_1.authRouter);
exports.router.use('/subjects', subjects_router_1.subjectsRouter);
exports.router.use('/articles', articles_router_1.articlesRouter);