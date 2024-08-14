"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _userSchema = _interopRequireDefault(require("../Models/userSchema.js"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); // Load environment variables


var JWT_SECRET = process.env.JWT_SECRET_KEY; // Generate a JWT token for a user

var generateToken = function generateToken(userId) {
  var user, token;
  return regeneratorRuntime.async(function generateToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (userId) {
            _context.next = 2;
            break;
          }

          throw new Error("Invalid user ID");

        case 2:
          _context.prev = 2;
          console.log("Searching for user with ID:", userId);
          _context.next = 6;
          return regeneratorRuntime.awrap(_userSchema["default"].findById(userId));

        case 6:
          user = _context.sent;

          if (user) {
            _context.next = 9;
            break;
          }

          throw new Error("User not found");

        case 9:
          // Create token with user information
          token = _jsonwebtoken["default"].sign({
            userId: user._id,
            role: user.role
          }, JWT_SECRET, {
            expiresIn: '1h'
          }); // console.log("Token generated:", token);

          return _context.abrupt("return", token);

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](2);
          console.error("Error generating token:", _context.t0);
          throw _context.t0;

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 13]]);
};

var _default = generateToken;
exports["default"] = _default;