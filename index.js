import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/config.js";
import blogsRouter from "./Routers/BlogRoutes.js";
import commentsRouter from "./Routers/CommentsRouter.js";
import userRouter from "./Routers/authUserRoutes.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://glistening-dragon-43dc39.netlify.app", // Production domain for frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Database Connection
connectDB();

// API Routes
app.get("/", (req, res) => {
  res.status(200).send("app is running");
});

app.use("/api/auth", userRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/comments", commentsRouter);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

// 404 Route
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
