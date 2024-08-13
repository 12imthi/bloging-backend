import jwt from 'jsonwebtoken';
import User from '../Models/userSchema.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Generate a JWT token for a user
const generateToken = async (userId) => {
    if (!userId) {
        throw new Error("Invalid user ID");
    }

    try {
        console.log("Searching for user with ID:", userId);
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        // Create token with user information
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log("Token generated:", token);
        return token;

    } catch (error) {
        console.error("Error generating token:", error);
        throw error; // Rethrow to allow the calling function to handle the error
    }
};

export default generateToken;
