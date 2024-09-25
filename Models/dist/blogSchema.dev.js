"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// TODO: modify this after user created
var BlogSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  content: {
    type: Object,
    required: true
  },
  coverImg: String,
  category: String,
  author: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    // ref: "User",
    required: true
  },
  rating: Number,
  createdAt: {
    type: Date,
    "default": Date.now
  }
});

var Blog = _mongoose["default"].model("Blog", BlogSchema);

var _default = Blog;
exports["default"] = _default;