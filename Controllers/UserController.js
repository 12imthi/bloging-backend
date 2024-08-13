import User from "../Models/userSchema.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import generateToken from '../Middleware/authenticateToken.js';


export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' }); // Bad Request
        }

        // Check for existing users with the same email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registered' }); // Conflict
        }

        // Hashing the password before saving the user
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ username, email, password: hashedPassword });

        console.log("New User Object:", newUser);

        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        console.error("Error during registration:", error); // More specific logging
        res.status(500).json({ message: "Registration failed" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Use 404 for not found
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' }); // 401 for invalid credentials
        }

        // Generate a JWT token
        const token = await generateToken(user._id); // Await token generation
        console.log("Generated Token:", token); // Log the generated token

        // Optionally set token in cookies (uncomment if desired)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true
        });

        // Send response with user info and token
        res.status(200).json({ 
            message: 'Login successful', 
            token, // Include the generated token
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role 
            } 
        });
    } catch (error) {
        console.error(error); // Better logging of the error
        res.status(500).json({ message: "Login failed" });
    }
};

