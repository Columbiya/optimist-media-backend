"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAssociations = void 0;
const Article_1 = require("./models/Article");
const Subject_1 = require("./models/Subject");
const User_1 = require("./models/User");
const makeAssociations = () => {
    User_1.User.hasMany(Article_1.Article);
    Article_1.Article.belongsTo(User_1.User, { foreignKey: 'userId' });
    Subject_1.Subject.hasMany(Article_1.Article);
    Article_1.Article.belongsTo(Subject_1.Subject, { foreignKey: 'subjectId' });
};
exports.makeAssociations = makeAssociations;
