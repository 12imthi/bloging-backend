"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserByRole = exports.deleteUsers = exports.getAllUsers = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;

var _userSchema = _interopRequireDefault(require("../Models/userSchema.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _authenticateToken = _interopRequireDefault(require("../Middleware/authenticateToken.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import jwt from "jsonwebtoken";
// Register a new user
var registerUser = function registerUser(req, res) {
  var _req$body, email, password, username, role, existingUser, hashedPassword, newUser;

  return regeneratorRuntime.async(function registerUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password, username = _req$body.username, role = _req$body.role; // Convert email to lowercase before checking

          _context.next = 4;
          return regeneratorRuntime.awrap(_userSchema["default"].findOne({
            email: email.toLowerCase().trim()
          }));

        case 4:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'User already exists'
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, 10));

        case 9:
          hashedPassword = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(_userSchema["default"].create({
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            username: username,
            role: role
          }));

        case 12:
          newUser = _context.sent;
          res.status(201).json({
            message: 'User registered successfully',
            newUser: newUser
          });
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.error("Error during registration:", _context.t0);
          res.status(500).json({
            message: "Registration failed"
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
}; // Login user


exports.registerUser = registerUser;

var loginUser = function loginUser(req, res) {
  var _req$body2, email, password, user, isMatch, token;

  return regeneratorRuntime.async(function loginUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // Convert email to lowercase and trim spaces before querying

          _context2.next = 4;
          return regeneratorRuntime.awrap(_userSchema["default"].findOne({
            email: email.toLowerCase().trim()
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 8;
            break;
          }

          console.log("User not found for email:", email); // Debugging

          return _context2.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, user.password));

        case 10:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            message: 'Invalid credentials'
          }));

        case 13:
          _context2.next = 15;
          return regeneratorRuntime.awrap((0, _authenticateToken["default"])(user._id));

        case 15:
          token = _context2.sent;
          // Optionally set token in cookies
          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            // Secure cookie in production
            sameSite: 'None'
          }); // Send response with user info and token

          res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
              _id: user._id,
              email: user.email,
              username: user.username,
              role: user.role
            }
          });
          _context2.next = 24;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          console.error("Error during login:", _context2.t0);
          res.status(500).json({
            message: "Login failed"
          });

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

exports.loginUser = loginUser;

var logoutUser = function logoutUser(req, res) {
  try {
    res.clearCookie('token');
    res.status(200).json({
      message: 'logout is successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "logout is failed"
    });
  }
};

exports.logoutUser = logoutUser;

var getAllUsers = function getAllUsers(req, res) {
  var users;
  return regeneratorRuntime.async(function getAllUsers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_userSchema["default"].find({}, 'id email role'));

        case 3:
          users = _context3.sent;
          res.status(200).json({
            message: "get users successfully ",
            users: users
          });
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).json({
            message: "failed to fetch users"
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAllUsers = getAllUsers;

var deleteUsers = function deleteUsers(req, res) {
  var id, user;
  return regeneratorRuntime.async(function deleteUsers$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_userSchema["default"].findByIdAndDelete(id));

        case 4:
          user = _context4.sent;

          if (user) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "User deleted successfully"
          }));

        case 7:
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).json({
            message: "Erorr from delete user"
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.deleteUsers = deleteUsers;

var updateUserByRole = function updateUserByRole(req, res) {
  var id, role, user;
  return regeneratorRuntime.async(function updateUserByRole$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          role = req.body.role; // Ensure role is provided

          if (role) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            message: "Role is required."
          }));

        case 5:
          _context5.next = 7;
          return regeneratorRuntime.awrap(_userSchema["default"].findByIdAndUpdate(id, {
            role: role
          }, {
            "new": true
          }));

        case 7:
          user = _context5.sent;

          if (user) {
            _context5.next = 10;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: "User not found."
          }));

        case 10:
          // Respond with success message
          res.status(200).send(user);
          _context5.next = 17;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](0);
          // Log error details
          console.error("Error from updateUserByRole:", _context5.t0); // Respond with error message

          res.status(500).json({
            message: "Error from updateUserByRole"
          });

        case 17:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.updateUserByRole = updateUserByRole;