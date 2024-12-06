import { Router, Request, Response } from 'express'

const publicRouter = Router()

publicRouter.get('/home', (req: Request,res:Response) => {
    res.status(200).json({message:'Welcome to auth api, this is a public route!'})
})
publicRouter.get('/about', (req: Request,res:Response) => {
    res.status(200).json({message:'Welcome to about page route, this is a public route!', version: '0.1.1'})
})


export default publicRouter

