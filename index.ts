import './config'
import Express, { json, NextFunction, Request, Response } from 'express'
import { router } from './router'
import { sequelize } from './db'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import { ApiError } from './error/ApiError'
import * as path from 'path'

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ApiError) {
        res.status(error.status).json({message: error.message})
    }
    else {
        res.status(500).json({message: error.message})
    }
}

const app = Express()

app.use(fileUpload())
app.use(cors())
app.use(json())
app.use(Express.static(path.join(__dirname, "../static/profile")))
app.use(Express.static(path.join(__dirname, "../static/articles")))
app.use('/api', router)
app.use(errorHandler)

const port = process.env.PORT

app.listen(port, async () => {
    await sequelize.authenticate()
    await sequelize.sync()

    console.log(`server started on port ${port}`)
})
