"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _BlogController = require("../Controllers/BlogController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/create-post", _BlogController.createBlog);
router.get('/', _BlogController.getBlogs);
router.get('/:id', _BlogController.getById);
router.patch('/update-post/:id', _BlogController.updatePostById);
router["delete"]('/delete-post/:id', _BlogController.deletePost);
router.get('/related/:id', _BlogController.relatedPost);
var _default = router;
exports["default"] = _default;