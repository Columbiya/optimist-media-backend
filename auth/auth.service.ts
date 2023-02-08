import { UsersService } from "../users/users.service";
import { JwtPayload, JwtService } from "../utils/jwt.service";
import bcrypt from 'bcrypt'
import { ApiError } from "../error/ApiError";

export class AuthService {
    static async login(email: string, password: string) {
        const candidate = await UsersService.findOneByEmail(email)

        try {
            const isMatch = await bcrypt.compare(password, candidate.password)
            const token = await JwtService.sign(candidate.email, candidate.id)
            const refreshToken = await JwtService.sign(candidate.email, candidate.id, true)

            return {
                user: {
                    id: candidate.id,
                    email: candidate.email
                },
                token, refreshToken
            }
        } catch(e) {
            throw ApiError.badRequest("Неправильный логин или пароль")
        }
    }

    static async register(email: string, password: string) {
        const createdUser = await UsersService.create(email, password)

        const token = await JwtService.sign(createdUser.email, createdUser.id)
        const refreshToken = await JwtService.sign(createdUser.email, createdUser.id, true)

        console.log(token, refreshToken)

        return {user: {id: createdUser.id, email: createdUser.email}, token, refreshToken}
    }

    static async refresh(token: string) {
        await JwtService.verify(token)
        const user = await JwtService.decode(token) as JwtPayload

        return {
            token: await JwtService.sign(user.username, user.id),
            refreshToken: await JwtService.sign(user.username, user.id, true)
        }
    }
}