import { NextFunction, Request, Response } from "express";
import { JwtService } from "../utils/jwt.service";
import { AuthService } from "./auth.service";

export class AuthController {
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body

            console.log(email, password)

            const response = await AuthService.login(email, password)

            res.json({status: true, ...response})
        } catch(e) {
            next(e)
        }
    }

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body

            const result = await AuthService.register(email, password)

            res.json(result)
        } catch(e) {
            next(e)
        }
    }

    static async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const authorization = req.headers.authorization
            const token = authorization?.split(' ')[1]
    
            const newPair = AuthService.refresh(token as string)
    
            res.json(newPair)
        } catch(e) {
            next(e)
        } 
    }
    
    static async check(req: Request, res: Response, next: NextFunction) {
        try {
            const authorization = req.headers.authorization
            const token = authorization?.split(' ')[1]

            console.log(token, authorization)

            JwtService.verify(token || "")

            res.json({status: true, user: JwtService.decode(token as string)})
        } catch(e) {
            next(e)
        }
    }
}