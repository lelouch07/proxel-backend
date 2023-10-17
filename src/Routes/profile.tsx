import { authenticateToken } from '../middleware/authMiddleware';
import express from 'express';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../Interfaces/userReqInteface';

const profileRouter = express.Router();
profileRouter.get('/', authenticateToken, (req:Request, res:Response) => {
    // User is authenticated, you can access req.user for user data
    const user = (req as AuthenticatedRequest).user;
    res.json({ user });
});


export default profileRouter;   