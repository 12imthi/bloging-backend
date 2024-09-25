import User from "../Models/userSchema.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import generateToken from '../Middleware/authenticateToken.js';



// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { email, password, username, role } = req.body;

        // Convert email to lowercase before checking
        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            username,
            role,
        });

        res.status(201).json({ message: 'User registered successfully' ,newUser});
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Registration failed" });
    }
};

// Login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Convert email to lowercase and trim spaces before querying
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            console.log("User not found for email:", email); // Debugging
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = await generateToken(user._id);

        // Optionally set token in cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure cookie in production
            sameSite: 'None'
        });

        // Send response with user info and token
        res.status(200).json({ 
            message: 'Login successful', 
            token,
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role 
            } 
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Login failed" });
    }
};



export const logoutUser = (req,res) => {
    
    try {

        res.clearCookie('token')
        res.status(200).json({message: 'logout is successfully'})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "logout is failed"})
    }


}

export const getAllUsers = async(req,res) => {
    
    try {
        const users = await User.find({},'id email role')
        res.status(200).json({message: "get users successfully ",users: users})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "failed to fetch users"})
    }
}

export const deleteUsers = async(req,res) => {
    
    try {
       const {id} = req.params;
       const user = await User.findByIdAndDelete(id);

       if(!user) {
        return res.status(404).json({message: "User deleted successfully"})
       }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Erorr from delete user"})
    }
}

export const updateUserByRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        // Ensure role is provided
        if (!role) {
            return res.status(400).json({ message: "Role is required." });
        }

        // Find and update the user
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });

        // Check if the user was found
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Respond with success message
        res.status(200).send( user );

    } catch (error) {
        // Log error details
        console.error("Error from updateUserByRole:", error);
        // Respond with error message
        res.status(500).json({ message: "Error from updateUserByRole" });
    }
};



