"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserController = require("../Controllers/UserController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { authenticateToken } from '../Middleware/authenticateToken.js';
var router = _express["default"].Router();

router.post('/register', _UserController.registerUser);
router.post('/login', _UserController.loginUser);
router.post('/logout', _UserController.logoutUser);
router.get('/users', _UserController.getAllUsers);
router["delete"]('/users/:id', _UserController.deleteUsers);
var _default = router;
exports["default"] = _default;