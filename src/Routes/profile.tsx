import { authenticateToken } from '../middleware/authMiddleware';
import express from 'express';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../Interfaces/userReqInteface';
import projectRouter from './projectRoute';

const profileRouter = express.Router();
profileRouter.use('/project',projectRouter);
profileRouter.get('/', authenticateToken, (req:Request, res:Response) => {
    // User is authenticated, you can access req.user for user data
    const user = (req as AuthenticatedRequest).user;
    res.json({ user });
});


export default profileRouter;   