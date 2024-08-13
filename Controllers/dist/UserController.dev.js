"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerUser = void 0;

var _userSchema = _interopRequireDefault(require("../Models/userSchema.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var registerUser = function registerUser(req, res) {
  var _req$body, username, email, password, saltRounds, hashedPassword, newUser;

  return regeneratorRuntime.async(function registerUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password; // Hashing the password before saving the user

          saltRounds = 10; // You can adjust this value, but 10 is a good standard.

          _context.next = 5;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, saltRounds));

        case 5:
          hashedPassword = _context.sent;
          newUser = new _userSchema["default"]({
            username: username,
            email: email,
            password: hashedPassword
          }); // console.log(newUser);

          _context.next = 9;
          return regeneratorRuntime.awrap(newUser.save());

        case 9:
          res.status(202).json({
            message: "user registered successfully",
            user: newUser
          });
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            message: "Registration failed"
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.registerUser = registerUser;