"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: { primaryKey: true, autoIncrement: true, type: sequelize_1.DataTypes.INTEGER },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    username: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    profilePhoto: { type: sequelize_1.DataTypes.STRING, allowNull: true }
}, { sequelize: db_1.sequelize });
