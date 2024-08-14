"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relatedPost = exports.deletePost = exports.updatePostById = exports.getById = exports.getBlogs = exports.createBlog = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _blogSchema = _interopRequireDefault(require("../Models/blogSchema.js"));

var _commentSchema = _interopRequireDefault(require("../Models/commentSchema.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createBlog = function createBlog(req, res) {
  var newPost;
  return regeneratorRuntime.async(function createBlog$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // console.log("blogs start : ",req.body);
          newPost = new _blogSchema["default"](_objectSpread({}, req.body, {
            author: req.userId
          })); // use author: req.userId, when you have token 

          _context.next = 4;
          return regeneratorRuntime.awrap(newPost.save());

        case 4:
          res.status(201).json({
            message: "post created successfully",
            post: newPost
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            message: "error creating post"
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.createBlog = createBlog;

var getBlogs = function getBlogs(req, res) {
  var _req$query, search, category, location, query, _getBlogs;

  return regeneratorRuntime.async(function getBlogs$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$query = req.query, search = _req$query.search, category = _req$query.category, location = _req$query.location;
          console.log(search);
          query = {};

          if (search) {
            query = _objectSpread({}, query, {
              $or: [{
                title: {
                  $regex: search,
                  $options: "i"
                }
              }, {
                content: {
                  $regex: search,
                  $options: "i"
                }
              }]
            });
          }

          if (category) {
            query = _objectSpread({}, query, {
              category: category
            });
          }

          if (location) {
            query = _objectSpread({}, query, {
              location: location
            });
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(_blogSchema["default"].find(query).populate('author', 'email').sort({
            createdAt: -1
          }));

        case 9:
          _getBlogs = _context2.sent;
          res.status(201).json({
            message: "All postes retervie successfully",
            data: _getBlogs
          });
          _context2.next = 17;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json({
            message: "Error getBlogs post"
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.getBlogs = getBlogs;

var getById = function getById(req, res) {
  var postId, post, comment;
  return regeneratorRuntime.async(function getById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // console.log(req.params.id);
          postId = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_blogSchema["default"].findById(postId));

        case 4:
          post = _context3.sent;

          if (post) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "Post not found"
          }));

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(_commentSchema["default"].find({
            postId: postId
          }).populate('user', "username email"));

        case 9:
          comment = _context3.sent;
          res.status(202).json({
            message: "Post retrieved successfully",
            data: post
          });
          _context3.next = 17;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).json({
            message: "Error fetching singel  post"
          });

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.getById = getById;

var updatePostById = function updatePostById(req, res) {
  var postId, updatedPost;
  return regeneratorRuntime.async(function updatePostById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          postId = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_blogSchema["default"].findByIdAndUpdate(postId, _objectSpread({}, req.body), {
            "new": true
          }));

        case 4:
          updatedPost = _context4.sent;

          if (updatedPost) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "post not found"
          }));

        case 7:
          res.status(202).json({
            message: "updated post successfully",
            data: updatedPost
          });
          _context4.next = 14;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).json({
            message: "Error updated  post"
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.updatePostById = updatePostById;

var deletePost = function deletePost(req, res) {
  var postId, _deletePost;

  return regeneratorRuntime.async(function deletePost$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          postId = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_blogSchema["default"].findByIdAndDelete(postId));

        case 4:
          _deletePost = _context5.sent;

          if (_deletePost) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: "post not found"
          }));

        case 7:
          _context5.next = 9;
          return regeneratorRuntime.awrap(_commentSchema["default"].deleteMany({
            postId: postId
          }));

        case 9:
          res.status(202).json({
            message: "Deleted post successfully",
            data: _deletePost
          });
          _context5.next = 16;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).json({
            message: "Error deleted  post"
          });

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.deletePost = deletePost;

var relatedPost = function relatedPost(req, res) {
  var id, blog, titelRegex, relatedQuery, _relatedPost;

  return regeneratorRuntime.async(function relatedPost$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;

          if (id) {
            _context6.next = 4;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: "Post Id is required"
          }));

        case 4:
          _context6.next = 6;
          return regeneratorRuntime.awrap(_blogSchema["default"].findById(id));

        case 6:
          blog = _context6.sent;

          if (blog) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: "Post is not found "
          }));

        case 9:
          titelRegex = new RegExp(blog.title.split(' ').join('|'), 'i');
          relatedQuery = {
            _id: {
              $ne: id
            },
            // exclude the current blog by id
            title: {
              $regex: titelRegex
            }
          };
          _context6.next = 13;
          return regeneratorRuntime.awrap(_blogSchema["default"].find(relatedQuery));

        case 13:
          _relatedPost = _context6.sent;
          res.status(202).json({
            message: "Related post found ",
            post: _relatedPost
          });
          _context6.next = 21;
          break;

        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.status(500).json({
            message: "Error RelatedPost  post"
          });

        case 21:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

exports.relatedPost = relatedPost;