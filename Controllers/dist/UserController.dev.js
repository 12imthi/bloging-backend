"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUsers = exports.getAllUsers = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;

var _userSchema = _interopRequireDefault(require("../Models/userSchema.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _authenticateToken = _interopRequireDefault(require("../Middleware/authenticateToken.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import jwt from "jsonwebtoken";
var registerUser = function registerUser(req, res) {
  var _req$body, username, email, password, existingUser, saltRounds, hashedPassword, newUser;

  return regeneratorRuntime.async(function registerUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password; // Check if the required fields are provided

          if (!(!username || !email || !password)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'All fields are required'
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(_userSchema["default"].findOne({
            email: email
          }));

        case 6:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            message: 'Email is already registered'
          }));

        case 9:
          // Hashing the password before saving the user
          saltRounds = 10;
          _context.next = 12;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, saltRounds));

        case 12:
          hashedPassword = _context.sent;
          newUser = new _userSchema["default"]({
            username: username,
            email: email,
            password: hashedPassword
          });
          console.log("New User Object:", newUser);
          _context.next = 17;
          return regeneratorRuntime.awrap(newUser.save());

        case 17:
          res.status(201).json({
            message: "User registered successfully",
            user: newUser
          });
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          console.error("Error during registration:", _context.t0); // More specific logging

          res.status(500).json({
            message: "Registration failed"
          });

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

exports.registerUser = registerUser;

var loginUser = function loginUser(req, res) {
  var _req$body2, email, password, user, isMatch, token;

  return regeneratorRuntime.async(function loginUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // Check if user exists by email

          _context2.next = 4;
          return regeneratorRuntime.awrap(_userSchema["default"].findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, user.password));

        case 9:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            message: 'Invalid credentials'
          }));

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap((0, _authenticateToken["default"])(user._id));

        case 14:
          token = _context2.sent;
          // Await token generation
          console.log("Generated Token:", token); // Log the generated token
          // Optionally set token in cookies (uncomment if desired)

          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true
          }); // Send response with user info and token

          res.status(200).json({
            message: 'Login successful',
            token: token,
            // Include the generated token
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
          console.error(_context2.t0); // Better logging of the error

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