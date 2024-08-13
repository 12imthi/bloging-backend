"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// TODO: modify this after user created
var CommentSchema = new _mongoose["default"].Schema({
  comment: {
    type: String,
    required: true
  },
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  // user : String,
  postId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Blog",
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});

var Comment = _mongoose["default"].model("Comment", CommentSchema);

var _default = Comment;
exports["default"] = _default;