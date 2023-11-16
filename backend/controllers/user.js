import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';


const userControllers = {
    register: async (req, res) => {
        try {
            const { email, password, rePassword } = req.body;
            const userExist = await User.findOne(
                { email: email },
                'email password'
            );

            //Check if email exist
            if (userExist) {
                return res.status(400).json({
                    success: false,
                    error: 'This email already exists'
                });
            }
            // Validate email and password
            if (
                !validateEmail(email) ||
                !validatePassword(password) ||
                !matchPasswords(password, rePassword)
            ) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid email or password format'
                });
            }
            // Hash the password
            const hashPassword = await bcrypt.hash(password, 10);
            // Create a new user

            const newUser = await User.create({
                email,
                password: hashPassword
            });
            return res.status(201).json({
                success: true,
                message: `User with ${email} has been created`
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: err.message || 'Error while adding a user'
            });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // Check if the email exists
            const userExist = await User.findOne(
                { email: email },
                'email password'
            );
            if (!userExist) {
                return res.status(400).json({
                    success: false,
                    error: 'User not found. Please sign up first'
                });
            }

            // Compare passwords
            const passwordsMatch = bcrypt.compare(password, userExist.password);

            if (passwordsMatch) {
                // Generate a JWT token
                const token = jwt.sign(
                    { user: userExist },
                    process.env.TOKEN_ACCESS_SECRET
                );

                // Set cookies
                res.cookie('id', userExist._id, {
                    secure: true
                });
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true
                });

                return res
                    .status(200)
                    .json({ success: true, token, id: userExist._id });
            } else {
                return res.status(401).json({
                    success: false,
                    error: 'Email or password is incorrect'
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: err.message || 'Error while logging in'
            });
        }
    },
    logout: async (req, res) => {
        // Clear cookies
        res.clearCookie('token');
        res.clearCookie('id');
        return res
            .status(200)
            .json({ success: true, message: 'User logged out successfully' });
    }
};

export default userControllers;
