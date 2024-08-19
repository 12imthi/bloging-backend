import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = (req,res,next) => {
    try {

        // const token = req.headers.authorization?.split(' ')[1]



        // const token = req.cookies.token;

        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if(!token) {
            return res.status(401).json({message: "No token provided"})
        }

        const decoded = jwt.verify(token,JWT_SECRET)

        if(!decoded.userId) {
            return res.status(401).json({message: "Invalied token provided"})
        }

        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
      
        
    } catch (error) {
        console.log("error verify token", error);
        res.status(402).json({message: "Invailed Token"})
    }
}

export default verifyToken;