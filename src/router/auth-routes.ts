import { Router, Request, Response } from 'express'
import authController from '../controllers/auth-controller';

//login
//signup
//logout
//email verify
//refresh

const authRouter = Router()

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/logout", authController.logout);
authRouter.post("/verify", authController.verify);

export default authRouter;
