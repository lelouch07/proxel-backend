import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthenticatedRequest } from '../Interfaces/userReqInteface';

// Secret key for JWT
const secretOrPrivateKey = "45c33959ea49730f3ab4e92583c0812104c6dec0a23949cbbb451d90fe56cca2925da4c7777263612fe7fd7a53412e4f74aff2975d637617b779d91d22f86084"

// Middleware to check if the user is authenticated
// Middleware to check if the user is authenticated
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token'); // Get the JWT token from the request header
    // console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    if (secretOrPrivateKey) {
        try {
            // Verify the JWT token and specify the expected type for 'decoded'
            jwt.verify(token, secretOrPrivateKey, (err, user) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    // If verification is successful, you can attach the user data to the request.
                    (req as AuthenticatedRequest).user = user;
                    next();
                }
            });
        } catch (error) {
            console.error('Error during JWT verification:', error);
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        console.error("Access token is not defined");
        res.status(500).json({ message: 'Internal server error' }); // Or handle it appropriately
    }
}
