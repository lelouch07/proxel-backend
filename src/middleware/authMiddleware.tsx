import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthenticatedRequest } from '../Interfaces/userReqInteface';
import dynamodb from '../models/dynamoDBConfig';
import { MyJwtPayload } from '../Interfaces/myJwtPayloadInterface';
import { getUser } from '../models/user';

// Secret key for JWT
const secretOrPrivateKey = "45c33959ea49730f3ab4e92583c0812104c6dec0a23949cbbb451d90fe56cca2925da4c7777263612fe7fd7a53412e4f74aff2975d637617b779d91d22f86084"

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
            jwt.verify(token, secretOrPrivateKey, async (err, user) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const decoded = jwt.decode(token, { complete: true }) as unknown as MyJwtPayload;
                    const payload = decoded?.payload;

                    // Now you can access the user property without TypeScript errors
                    
                    // User is authenticated. Now, check if the user exists and is verified in DynamoDB.
                    
                    const userID = payload?.user?.id;
                     // Retrieve the user ID from the JWT payload.

                    // Query the DynamoDB table to retrieve the user details.

                    try {
                        const data = await getUser(userID);
                        // console.log(data);
                        if (data) {
                            (req as AuthenticatedRequest).user = data; // Attach the user data to the request
                            next();
                        }
                        
                    } catch (error) {
                        console.error('Error querying DynamoDB:', error);
                        res.status(500).json({ message: 'Internal server error' });
                    }
            }});    
        } catch (error) {
            console.error('Error during JWT verification:', error);
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        console.error("Access token is not defined");
        res.status(500).json({ message: 'Internal server error' }); // Or handle it appropriately
    }
}
