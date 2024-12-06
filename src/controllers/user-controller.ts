import { Request,Response,NextFunction  } from "express";
import userService from "../service/user-service";
import { AuthenticatedRequest } from "../middleware/auth-middleware";
import { ApiError } from "../exceptions/api-error";



class UserController{

    async getuser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any>{
        try {
            if (!req.user) {
                throw ApiError.UnauthorizedError("User data is missing.");
            }
            const userid = req.user._id
            const userData = await userService.getuser(userid)
            return res.json({
                ...userData,
                user: {
                    first_name: userData.user.first_name,
                    last_name: userData.user.last_name,
                    email: userData.user.email,
                    verified: userData.user.verified,
                },
            })
        } catch (error) {
            next(error)
        }
    }
}


export default new UserController()