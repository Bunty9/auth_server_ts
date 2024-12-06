import { Request, Response, NextFunction } from "express";
import { ApiError } from "../exceptions/api-error";
import tokenService, {UserJwtPayload } from "../service/token-service";
import { ObjectId } from "mongoose";

export interface AuthenticatedRequest extends Request {
    user?: {
        _id: string | ObjectId;
        email: string;
        verified: boolean;
        [key: string]: any;
    }
}

export default function authMiddleware(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void {
    try {
        const {accessToken} = req.cookies
        if (!accessToken) {
            return next(ApiError.UnauthorizedError(`Invalid Access Token.`));
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError(`Invalid Access Token.`));
        }

        req.user = userData; // Attach user data to the request object
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError(`Authorization Error: ${e}.`));
    }
}
