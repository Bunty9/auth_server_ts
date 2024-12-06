import { Router, Request, Response } from 'express'
import authController from '../controllers/auth-controller';
import authMiddleware from '../middleware/auth-middleware';

//login
//signup
//logout
//email verify
//refresh

const authRouter = Router()

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.get("/refresh", authController.refresh);
authRouter.post("/logout", authController.logout);
authRouter.get("/verify", authController.verify);
authRouter.get("/sendlink",authMiddleware,authController.sendlink)

export default authRouter;
