import express, { Request, Response } from 'express';
import { createProject } from '../models/projects'; // Import the createProject function
import { authenticateToken } from '../middleware/authMiddleware';
import { AuthenticatedRequest } from '../Interfaces/userReqInteface';

// Define an interface for the expected request body structure
interface ProjectData {
    projectName: string;
    domain: string;
    projectDescription: string;
    selectedSkills: string[];
    selectedCategory: string;
    additionalSkills: string[];
    Requirements: string;
    WorkingModel: string;
    Planning: string;
    startDate: Date; // Adjust the data type as needed
    endDate: Date;   // Adjust the data type as needed
}

const projectRouter = express.Router();

// Use the express.json() middleware to parse the JSON request body
projectRouter.use(express.json());

projectRouter.post('/', authenticateToken,async (req: Request, res: Response) => {
    // User is authenticated, you can access req.user for user data
    const user = (req as AuthenticatedRequest).user;
    const UserID=user.UserID;
    console.log(UserID);
    // Extract parameters from the request body
    const projectData: ProjectData = req.body;

    // Call the createProject function with the extracted projectData
    await createProject(projectData,UserID)
        .then((projectID) => {
            console.log(`Project created with ID: ${projectID}`);
            // Handle success, e.g., send a response to the client
            res.status(201).json({ message: 'Project created', projectID });
        })
        .catch((error) => {
            console.error('Error creating project:', error);
            // Handle error, e.g., send an error response to the client
            res.status(500).json({ message: 'Error creating project' });
        });
});

export default projectRouter;
