// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config(); // Load environment variables

// const JWT_SECRET = process.env.JWT_SECRET_KEY;

const isAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res
      .status(402)
      .json({
        success: false,
        message:
          "you are not allowed to perform this action,please try to to login as an admin",
      });
  }

  next()
};

export default isAdmin;
