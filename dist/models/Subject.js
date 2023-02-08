"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
class Subject extends sequelize_1.Model {
}
exports.Subject = Subject;
Subject.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    subject: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
}, { sequelize: db_1.sequelize });
