"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config(); // Load environment variables
// const JWT_SECRET = process.env.JWT_SECRET_KEY;
var isAdmin = function isAdmin(req, res, next) {
  console.log(req.role);

  if (req.role !== "admin") {
    return res.status(402).json({
      success: false,
      message: "you are not allowed to perform this action,please try to  as an admin"
    });
  }

  next();
};

var _default = isAdmin;
exports["default"] = _default;