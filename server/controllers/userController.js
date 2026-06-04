import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Resume from '../models/Resume.js';

const generateToken = (userId) => {
    // Implementation for generating JWT token
    // You can use libraries like jsonwebtoken to create a token
    // Example: return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' }); // Replace with actual token generation logic
    return token;
}

// Controller for user registration
// POST /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email, and password' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Return success response with token
        const token = generateToken(newUser._id);
        newUser.password = undefined; // Hide password in response

        // Return user data along with token
        return res.status(201).json({ message: 'User registered successfully', token, user: newUser });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Controller for user login
// POST /api/users/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if required fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password is correct
        if (!user.comparePassword(password)) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Return success response with token
        const token = generateToken(user._id);
        user.password = undefined; // Hide password in response

        // Return user data along with token
        return res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Controller for getting user by ID
// GET /api/users/:id
export const getUserById = async (req, res) => {
    try {
        const userId = req.userId;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user data
        user.password = undefined; // Hide password in response

        // Return user data
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Controller for getting user resume data
// GET /api/users/:id/resume
export const getUserResume = async (req, res) => {
    try {
        const userId = req.userId;

        const resume = await Resume.findOne({ userId });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Return user resume data (you can customize this based on your schema)
        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};