import { Request } from 'express'; // Import the Request type from Express

declare module 'express-serve-static-core' {
    interface Request {
        user?: any; // Define the type of the user property here
    }
}