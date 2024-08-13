import User from "../Models/userSchema.js";
import bcrypt from "bcrypt";

export const registerUser = async(req,res) => {
    try {

        const {username,email,password} = req.body

           // Hashing the password before saving the user
           const saltRounds = 10; // You can adjust this value, but 10 is a good standard.
           const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({username,email,password: hashedPassword});

        // console.log(newUser);

        await newUser.save();

        res.status(202).json({message:"user registered successfully",user: newUser})

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Registration failed" });
    }
}

