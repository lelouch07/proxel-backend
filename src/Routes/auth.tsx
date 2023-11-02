
import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import { createUser, getUser } from '../models/user';
// import user from '../models/user';
const app=express();

const authRouter = express.Router();


// Secret key for JWT
const secretOrPrivateKey ="45c33959ea49730f3ab4e92583c0812104c6dec0a23949cbbb451d90fe56cca2925da4c7777263612fe7fd7a53412e4f74aff2975d637617b779d91d22f86084"

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


        // Generate a JWT token
        const payload = {
            user: {
                id: userId,
                // Add other user data as needed
            },
        };
        if (secretOrPrivateKey) {
            jwt.sign(payload, secretOrPrivateKey, { expiresIn: 36000 }, (err, Token) => {
                if (err) throw err;
                
                // Set the JWT token as a cookie
                res.cookie('token', Token, {
                    httpOnly: false, // access from JavaScript
                    expires: new Date(Date.now() + 36000 * 1000), // Expires in 10 hour
                });
                const tokenPayLoad={
                    token:Token,
                    options:{
                    httpOnly: false, // access from JavaScript
                    expires: new Date(Date.now() + 36000 * 1000), // Expires in 10 hour
                    }


                }
                res.json({ tokenPayLoad });
            });
        }else
        {
            console.error("Access token is not defined");
        }

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'An error occurred during login' });
    }
});


authRouter.post('/signup', async (req, res) => {
    try {
        // console.log(req.body);
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


        // Generate a JWT token
        const payload = {
            user: {
                id: userId,
            },
        };
        if(secretOrPrivateKey)
        {

            jwt.sign(payload, secretOrPrivateKey, { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;
    
                // Set the JWT token as a cookie
                res.cookie('token', token, {
                    httpOnly: false, // Prevent access from JavaScript
                    expires: new Date(Date.now() + 36000 * 1000), // Expires in 10 hour
                });
                console.log("signup successful")
                // Redirect to the profile page after successful login
                res.json({ message: 'Signup successful' });
            });

        }
        else
        {
            console.error("Access token is not specified");
        }    

    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'An error occurred during signup' });
    }
});


export default authRouter;