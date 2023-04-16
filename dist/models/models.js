"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const ROLES_1 = require("../utils/ROLES");
class User extends sequelize_1.Model {
}
User.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    username: { type: sequelize_1.DataTypes.STRING, allowNull: true, unique: true },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    profilePhoto: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    role: { type: sequelize_1.DataTypes.STRING, defaultValue: ROLES_1.ROLES.USER }
}, { sequelize: db_1.sequelize });
class Subject extends sequelize_1.Model {
}
Subject.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    subject: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false }
}, { sequelize: db_1.sequelize });
class Article extends sequelize_1.Model {
}
Article.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    text: { type: sequelize_1.DataTypes.TEXT('long'), allowNull: false },
    subjectId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, references: { model: Subject, key: 'id' } },
    userId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
    articleImage: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    views: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 }
}, { sequelize: db_1.sequelize });
class ArticlesLikes extends sequelize_1.Model {
}
ArticlesLikes.init({
    userId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
    articleId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, references: { model: Article, key: 'id' } }
}, { sequelize: db_1.sequelize });
class Comment extends sequelize_1.Model {
}
Comment.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
    replyToId: { type: sequelize_1.DataTypes.INTEGER, allowNull: true, references: { model: User, key: 'id' } },
    authorId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
    text: { type: sequelize_1.DataTypes.TEXT('long'), allowNull: false },
    articleId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, references: { model: Article, key: 'id' } }
}, { sequelize: db_1.sequelize });
User.hasMany(Article, { foreignKey: 'userId', as: 'articles' });
Article.belongsTo(User, { foreignKey: 'userId' });
Subject.hasMany(Article, { foreignKey: 'subjectId' });
Article.belongsTo(Subject, { foreignKey: 'subjectId' });
User.hasMany(ArticlesLikes, { foreignKey: 'userId' });
ArticlesLikes.belongsTo(ArticlesLikes, { foreignKey: 'userId' });
Article.hasMany(ArticlesLikes, { foreignKey: 'articleId' });
ArticlesLikes.belongsTo(ArticlesLikes, { foreignKey: 'articleId' });
Article.hasMany(Comment, { foreignKey: 'articleId' });
Comment.belongsTo(Article, { foreignKey: 'articleId' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'authorId' });
exports.default = {
    Article,
    Subject,
    User,
    ArticlesLikes,
    Comment
};
