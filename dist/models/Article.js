"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const Subject_1 = require("./Subject");
const User_1 = require("./User");
class Article extends sequelize_1.Model {
}
exports.Article = Article;
Article.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    text: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    subjectId: { type: sequelize_1.DataTypes.INTEGER, references: { model: Subject_1.Subject, key: "subjectId" }, field: 'subjectId' },
    userId: { type: sequelize_1.DataTypes.INTEGER, references: { model: User_1.User, key: "userId" }, field: 'userId' }
}, { sequelize: db_1.sequelize });
