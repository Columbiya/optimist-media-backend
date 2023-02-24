import { DataTypes, ForeignKey, Model, Optional } from 'sequelize'
import { sequelize } from "../db";
import { ROLES } from '../utils/ROLES';

interface UserAttributes {
    id: number
    username?: string
    password: string
    profilePhoto?: string
    email: string
    role: ROLES
}

class User extends Model<UserAttributes, Optional<UserAttributes, 'id' | 'role'>> {
    declare id: number
    declare username: string 
    declare password: string 
    declare profilePhoto: string 
    declare email: string
    declare role: ROLES
}

User.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    username: {type: DataTypes.STRING, allowNull: true, unique: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    profilePhoto: {type: DataTypes.STRING, allowNull: true},
    role: {type: DataTypes.STRING, defaultValue: ROLES.USER}
}, {sequelize})

//Subject

interface SubjectAttributes {
    id: number
    subject: string
}

class Subject extends Model<SubjectAttributes, Optional<SubjectAttributes, 'id'>> {
    declare id: number
    declare subject: string 
}

Subject.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    subject: {type: DataTypes.STRING, unique: true, allowNull: false}
}, {sequelize})

//Article

export interface ArticleAttributes {
    id: number
    title: string
    text: string
    subjectId: number
    userId: number
    articleImage?: string
    views: number
}

class Article extends Model<ArticleAttributes, Optional<ArticleAttributes, 'id' | 'articleImage' | 'views'>> {
    declare id: number
    declare title: string 
    declare text: string
    declare articleImage: string
    declare subjectId: ForeignKey<Subject['id']> 
    declare userId: ForeignKey<User['id']>
    declare views: number
}

Article.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false, unique: true},
    text: {type: DataTypes.TEXT('long'), allowNull: false},
    subjectId: {type: DataTypes.INTEGER, allowNull: false, references: {model: Subject, key: 'id'}},
    userId: {type: DataTypes.INTEGER, allowNull: false, references: {model: User, key: 'id'}},
    articleImage: {type: DataTypes.STRING, allowNull: true},
    views: {type: DataTypes.INTEGER, defaultValue: 0}
}, {sequelize})

interface ArticlesLikesAttributes {
    userId: ForeignKey<User['id']>
    articleId: ForeignKey<Article['id']>
}

class ArticlesLikes extends Model<ArticlesLikesAttributes, ArticlesLikesAttributes> {
    declare userId: number
    declare articleId: number
}

ArticlesLikes.init({
    userId: {type: DataTypes.INTEGER, allowNull: false, references: {model: User, key: 'id'}},
    articleId: {type: DataTypes.INTEGER, allowNull: false, references: {model: Article, key: 'id'}}
}, {sequelize})


User.hasMany(Article, {foreignKey: 'userId', as: 'articles'})
Article.belongsTo(User, {foreignKey: 'userId'})

Subject.hasMany(Article, {foreignKey: 'subjectId'})
Article.belongsTo(Subject, {foreignKey: 'subjectId'})

User.hasMany(ArticlesLikes, {foreignKey: 'userId'})
ArticlesLikes.belongsTo(ArticlesLikes, {foreignKey: 'userId'})

Article.hasMany(ArticlesLikes, {foreignKey: 'articleId'})
ArticlesLikes.belongsTo(ArticlesLikes, {foreignKey: 'articleId'})

export default {
    Article,
    Subject,
    User,
    ArticlesLikes
}