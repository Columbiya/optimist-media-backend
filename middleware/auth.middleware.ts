import { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/ApiError";
import { JwtPayload, JwtService } from "../utils/jwt.service";

export function authMiddleware(req: Request & {user: JwtPayload}, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1] as string

    try {
        JwtService.verify(token)
        const payload = JwtService.decode(token) as JwtPayload

        req.user = payload
    } catch(e) {
        next(ApiError.unauthorized("Unauthorized"))
    }
}