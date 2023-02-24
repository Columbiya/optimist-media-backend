import { NextFunction, Request, Response } from "express";
import { CheckLinkService } from "./check-link.service";

export class CheckLinkController {
    static async check(req: Request, res: Response, next: NextFunction) {
        try {
            const { url } = req.query

            const response = await CheckLinkService.check(url as string)

            res.json({success: true, meta: response})
        } catch(e) {
            next(e)
        }
    }
}