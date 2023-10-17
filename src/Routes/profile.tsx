// import { profile } from 'console';
import { authenticateToken } from '../middleware/authMiddleware';
import express from 'express';
import { Request, Response } from 'express';

// Define a custom interface for the request object
interface AuthenticatedRequest extends Request {
    user: any; // Replace 'any' with the actual type of your user data
}
const profileRouter = express.Router();
profileRouter.get('/', authenticateToken, (req:Request, res:Response) => {
    // User is authenticated, you can access req.user for user data
    const user = (req as AuthenticatedRequest).user;
    res.json({ user });
});


export default profileRouter;   