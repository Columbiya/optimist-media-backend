import jwt from 'jsonwebtoken'

export interface JwtPayload {
    email: string
    id: number
}

export class JwtService {
    static async sign(email: string, id: number, refresh?: boolean) {
        const payload = { email, id }

        const twoDays = 1000 * 60 * 48
        const month = 1000 * 60 * 24 * 30 

        return jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: refresh ? month: twoDays})
    } 

    static async verify(token: string) {
        jwt.verify(token, process.env.JWT_SECRET as string)
    }

    static decode(token: string) {
        return jwt.decode(token)
    }
} 