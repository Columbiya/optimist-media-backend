"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? +process.env.DB_PORT : 0,
    storage: ':memory:',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});
