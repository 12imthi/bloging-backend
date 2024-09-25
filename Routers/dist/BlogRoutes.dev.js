"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _BlogController = require("../Controllers/BlogController.js");

var _verifyToken = _interopRequireDefault(require("../Middleware/verifyToken.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Routes for both users and admins


router.post("/create-post", _verifyToken["default"], _BlogController.createBlog);
router.patch('/update-post/:id', _verifyToken["default"], _BlogController.updatePostById);
router["delete"]('/delete-post/:id', _verifyToken["default"], _BlogController.deletePost); // Public routes

router.get('/', _BlogController.getBlogs);
router.get('/:id', _BlogController.getById);
router.get('/related/:id', _BlogController.relatedPost);
router.get('/user-posts', _verifyToken["default"], _BlogController.getUserPosts);
var _default = router;
exports["default"] = _default;