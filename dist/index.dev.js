"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors2 = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = _interopRequireDefault(require("./Database/config.js"));

var _BlogRoutes = _interopRequireDefault(require("./Routers/BlogRoutes.js"));

var _CommentsRouter = _interopRequireDefault(require("./Routers/CommentsRouter.js"));

var _authUserRoutes = _interopRequireDefault(require("./Routers/authUserRoutes.js"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].json({
  limit: '10mb'
}));
app.use(_bodyParser["default"].urlencoded({
  limit: '10mb',
  extended: true
}));
app.use((0, _cors2["default"])((_cors = {
  origin: "http://localhost:5173"
}, _defineProperty(_cors, "origin", "https://bloging-backend-d8fr.onrender.com"), _defineProperty(_cors, "methods", ["GET", "POST", "PUT", 'PATCH', "DELETE"]), _defineProperty(_cors, "credentials", true), _cors)));
app.use(_express["default"].json());
(0, _config["default"])();
var PORT = process.env.PORT || 5000;
app.get("/", function (req, res) {
  res.status(200).send("app is running");
});
app.use("/api/auth", _authUserRoutes["default"]);
app.use("/api/blogs", _BlogRoutes["default"]);
app.use("/api/comments", _CommentsRouter["default"]);
app.listen(PORT, function () {
  console.log("app is running ".concat(PORT));
});