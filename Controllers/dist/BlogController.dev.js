"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserPosts = exports.relatedPost = exports.deletePost = exports.updatePostById = exports.getById = exports.getBlogs = exports.createBlog = void 0;

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
  var _req$query, search, category, location, query, blogs;

  return regeneratorRuntime.async(function getBlogs$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$query = req.query, search = _req$query.search, category = _req$query.category, location = _req$query.location;
          query = {}; // Search by title or content using regex

          if (search) {
            query.$or = [{
              title: {
                $regex: search,
                $options: "i"
              }
            }, {
              content: {
                $regex: search,
                $options: "i"
              }
            }];
          } // Match exact category (can be changed to regex for partial match)


          if (category) {
            query.category = {
              $regex: category,
              $options: "i"
            };
          } // Match exact location (can be changed to regex for partial match)


          if (location) {
            query.location = {
              $regex: location,
              $options: "i"
            };
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(_blogSchema["default"].find(query).populate('author', 'email').sort({
            createdAt: -1
          }));

        case 8:
          blogs = _context2.sent;
          res.status(200).json({
            message: "All posts retrieved successfully",
            blogs: blogs
          });
          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.error("Error fetching blogs:", _context2.t0);
          res.status(500).json({
            message: "Error fetching blogs"
          });

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.getBlogs = getBlogs;

var getById = function getById(req, res) {
  var postId, post, comments;
  return regeneratorRuntime.async(function getById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          postId = req.params.id; // Check if postId is a valid ObjectId

          if (_mongoose["default"].Types.ObjectId.isValid(postId)) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: "Invalid Post ID"
          }));

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(_blogSchema["default"].findById(postId));

        case 6:
          post = _context3.sent;

          if (post) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "Post not found"
          }));

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(_commentSchema["default"].find({
            postId: postId
          }).populate('user', 'username email'));

        case 11:
          comments = _context3.sent;
          res.status(202).json({
            post: post,
            comments: comments
          });
          _context3.next = 19;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).json({
            message: "Error fetching single post"
          });

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 15]]);
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
          res.status(202).send(_relatedPost);
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

var getUserPosts = function getUserPosts(req, res) {
  var userId, userPosts;
  return regeneratorRuntime.async(function getUserPosts$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          // Assuming `req.userId` is set in the verifyToken middleware
          userId = req.userId; // Fetch the logged-in user's ID
          // console.log("getUserPostsID : ",userId);

          _context7.next = 4;
          return regeneratorRuntime.awrap(_blogSchema["default"].find({
            author: userId
          }).populate('author', 'email').sort({
            createdAt: -1
          }));

        case 4:
          userPosts = _context7.sent;
          console.log('userpost : ', userPosts);

          if (userPosts.length) {
            _context7.next = 8;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            message: "No posts found for this user"
          }));

        case 8:
          res.status(200).json({
            message: "User posts retrieved successfully",
            posts: userPosts
          });
          _context7.next = 15;
          break;

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          console.error("Error fetching user posts:", _context7.t0);
          res.status(500).json({
            message: "Error fetching user posts"
          });

        case 15:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getUserPosts = getUserPosts;