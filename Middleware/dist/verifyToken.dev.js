"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); // Load environment variables


var JWT_SECRET = process.env.JWT_SECRET_KEY;

var verifyToken = function verifyToken(req, res, next) {
  try {
    // const token = req.headers.authorization?.split(' ')[1]
    var token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    var decoded = _jsonwebtoken["default"].verify(token, JWT_SECRET);

    if (!decoded.userId) {
      return res.status(401).json({
        message: "Invalied token provided"
      });
    }

    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.log("error verify token", error);
    res.status(402).json({
      message: "Invailed Token"
    });
  }
};

var _default = verifyToken;
exports["default"] = _default;