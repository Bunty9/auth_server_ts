import { Router, Request, Response } from 'express'
import authMiddleware from '../middleware/auth-middleware';
import userController from '../controllers/user-controller';

//home route
//get current user details
//change user details

const userRouter = Router()

userRouter.get('/getuser', authMiddleware, userController.getuser);


export default userRouter;