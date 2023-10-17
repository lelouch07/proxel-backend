import { Request } from 'express';

// Define a custom interface for the request object
interface AuthenticatedRequest extends Request {
    user: any; // Replace 'any' with the actual type of your user data
}

export { AuthenticatedRequest };