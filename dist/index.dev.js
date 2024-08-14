"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = _interopRequireDefault(require("./Database/config.js"));

var _BlogRoutes = _interopRequireDefault(require("./Routers/BlogRoutes.js"));

var _CommentsRouter = _interopRequireDefault(require("./Routers/CommentsRouter.js"));

var _authUserRoutes = _interopRequireDefault(require("./Routers/authUserRoutes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(_express["default"].json());
(0, _config["default"])();
var PORT = 5000 || process.env.PORT;
app.get("/", function (req, res) {
  res.status(200).send("app is running");
});
app.use("/api/auth", _authUserRoutes["default"]);
app.use("/api/blogs", _BlogRoutes["default"]);
app.use("/api/comments", _CommentsRouter["default"]);
app.listen(PORT, function () {
  console.log("app is running ".concat(PORT));
});