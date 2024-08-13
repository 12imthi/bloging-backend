"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _CommentController = require("../Controllers/CommentController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/post-comment', _CommentController.postComments);
router.get('/total-comment', _CommentController.totalComments);
var _default = router;
exports["default"] = _default;