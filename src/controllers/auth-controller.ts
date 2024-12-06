import { Request,Response,NextFunction  } from "express";

import authService from "../service/auth-service";
import { ApiError } from "../exceptions/api-error";
import { loginValidation, signupValidation } from "../validators/auth-validator";


  

class AuthController{

    async signup(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const result = signupValidation.safeParse(req.body)
            if (!result.success) {
                return next(ApiError.BadRequest("Error validation", result.error as any));
            }
            const userData = await authService.signup(result.data)
            res.cookie('accessToken', userData.accessToken,{ expires: new Date(Date.now() + (50 * 60 * 1000)), httpOnly: true })  //50 minutes
            res.cookie('refreshToken', userData.refreshToken,{ expires: new Date(Date.now() + (30 * 24 * 60 * 60 *1000)), httpOnly: true }) //30 days
            return res.json({
                ...userData,
                user: {
                    first_name: userData.user.first_name,
                    last_name: userData.user.last_name,
                    email: userData.user.email,
                    verified: userData.user.verified,
                },
            });
        } catch (error) {
            next(error);
        }

    }

    async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const result = loginValidation.safeParse(req.body)
            if (!result.success) {
                return next(ApiError.BadRequest("Error validation", result.error as any));
            }
            const userData = await authService.login(result.data)
            res.cookie('accessToken', userData.accessToken,{ expires: new Date(Date.now() + (50 * 60 * 1000)), httpOnly: true })  //50 minutes
            res.cookie('refreshToken', userData.refreshToken,{ expires: new Date(Date.now() + (30 * 24 * 60 * 60 *1000)), httpOnly: true }) //30 days
            return res.json({
                ...userData,
                user: {
                    first_name: userData.user.first_name,
                    last_name: userData.user.last_name,
                    email: userData.user.email,
                    verified: userData.user.verified,
                },
            });
        } catch (error) {
            next(error)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { refreshToken } = req.cookies
            const token = authService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (error) {
            next(error)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<any>{
        try{
            const {refreshToken} = req.cookies;
            const userData = await authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);  
        } catch(e) {
            next(e);
        }
    }

    async verify(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const activationLink = req.params.link;
            await authService.verify(activationLink);
            return res.redirect(process.env.CLIENT_URL as string);
        } catch (error) {
            next(error)
        }
    }
}

export default new AuthController();
