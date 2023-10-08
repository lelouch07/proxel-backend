// import { profile } from 'console';
import { authenticateToken } from '../middleware/authMiddleware';
import express from 'express';
const profileRouter = express.Router();
profileRouter.get('/', authenticateToken, (req, res) => {
    // User is authenticated, you can access req.user for user data
    const user = req.user;
    res.json({ user });
});


export default profileRouter;   