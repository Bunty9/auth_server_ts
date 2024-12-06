export class ApiError extends Error {
    status: number;
    errors: string[];

    constructor(status: number, message: string, errors: string[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        Object.setPrototypeOf(this, ApiError.prototype); // Ensures the error is an instance of ApiError
    }

    static UnauthorizedError(error: string): ApiError {
        return new ApiError(401,  `User is not authorized ${[error]}`);
    }

    static BadRequest(message: string, errors: string[] = []): ApiError {
        return new ApiError(400, message, errors);
    }
}
