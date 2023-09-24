// server.ts
import dynamodb from'../models/dynamoDBConfig';
const AWS=require('aws-sdk');
import * as bcrypt from 'bcryptjs';
import * as uuid from 'uuid';
import express from 'express';
const authRouter = express.Router();

// Define the Users table name
const tableName = 'Users';

// Define routes for user authentication
authRouter.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const { userId, password } = req.body;

        // Check if the user exists
        const user = await getUser(userId);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.PasswordHash);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Return success
        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'An error occurred during login' });
    }
    // res.status(200);
});

authRouter.post('/signup', async (req, res) => {
    try {
        console.log(req.body);
        const { userId, email, age, password } = req.body;

        // Check if the user already exists
        
        const existingUser = await getUser(userId);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        await createUser(userId, email, age, hashedPassword);

        // Return success
        return res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'An error occurred during signup' });
    }
});

// Helper function to get a user by ID
async function getUser(userId: string) {
    const params = {
        TableName: tableName,
        Key: { UserID: { S: userId }},
    };
    const result = await dynamodb.getItem(params).promise();
    return result.Item ? AWS.DynamoDB.Converter.unmarshall(result.Item) : null;
}

// Helper function to create a new user
async function createUser(userId: string, email: string, age: number, passwordHash: string) {
    const params = {
        TableName: tableName,
        Item: AWS.DynamoDB.Converter.marshall({ UserID: userId, Email: email, Age: age, PasswordHash: passwordHash }),
    };
    try {
        await dynamodb.putItem(params).promise();
    }
    catch(error){
        console.log("inside the create user sign up block");
        // console.error();
    }
}


export default authRouter;