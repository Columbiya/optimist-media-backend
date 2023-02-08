export class ApiError extends Error {
    declare status: number
    declare message: string
    
    constructor(message: string, status: number) {
        super()
        this.message = message
        this.status = status
    }
    
    static notFound(message: string) {
        return new ApiError(message, 404)
    }

    static badRequest(message: string) {
        return new ApiError(message, 400)
    } 

    static internalError(message: string) {
        return new ApiError(message, 500)
    }

    static unauthorized(message: string) {
        return new ApiError(message, 403)
    }
}