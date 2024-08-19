"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = _interopRequireDefault(require("./Database/config.js"));

var _BlogRoutes = _interopRequireDefault(require("./Routers/BlogRoutes.js"));

var _CommentsRouter = _interopRequireDefault(require("./Routers/CommentsRouter.js"));

var _authUserRoutes = _interopRequireDefault(require("./Routers/authUserRoutes.js"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].json({
  limit: "10mb"
}));
app.use(_bodyParser["default"].urlencoded({
  limit: "10mb",
  extended: true
}));
var allowedOrigins = ["http://localhost:5173", // Local development
"https://glistening-dragon-43dc39.netlify.app/" // Production domain for frontend
];
app.use((0, _cors["default"])({
  origin: function origin(_origin, callback) {
    if (!_origin || allowedOrigins.indexOf(_origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));
app.use(_express["default"].json());
(0, _config["default"])();
var PORT = process.env.PORT || 5000;
app.get("/", function (req, res) {
  res.status(200).send("app is running");
});
app.use("/api/auth", _authUserRoutes["default"]);
app.use("/api/blogs", _BlogRoutes["default"]);
app.use("/api/comments", _CommentsRouter["default"]); // Serve static files in production

if (process.env.NODE_ENV === "production") {
  var _dirname = _path["default"].resolve();

  app.use(_express["default"]["static"](_path["default"].join(_dirname, "/frontend/build")));
  app.get("*", function (req, res) {
    return res.sendFile(_path["default"].resolve(_dirname, "frontend", "build", "index.html"));
  });
} // 404 Route


app.use(function (req, res, next) {
  res.status(404).send("Route not found");
});
app.listen(PORT, function () {
  console.log("app is running on port ".concat(PORT));
});