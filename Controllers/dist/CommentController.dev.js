"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.totalComments = exports.postComments = void 0;

var _commentSchema = _interopRequireDefault(require("../Models/commentSchema.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var postComments = function postComments(req, res) {
  var newComment;
  return regeneratorRuntime.async(function postComments$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          newComment = new _commentSchema["default"](req.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(newComment.save());

        case 4:
          res.status(202).json({
            message: "Comment created successfully",
            comment: newComment
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            message: "Error postComments"
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.postComments = postComments;

var totalComments = function totalComments(req, res) {
  var _totalComments;

  return regeneratorRuntime.async(function totalComments$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_commentSchema["default"].countDocuments({}));

        case 3:
          _totalComments = _context2.sent;
          res.status(200).json({
            message: 'Total comments count',
            totalComments: _totalComments
          });
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json({
            message: "Error allComments"
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.totalComments = totalComments;