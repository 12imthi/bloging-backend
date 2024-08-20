
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/config.js";
import blogsRouter from "./Routers/BlogRoutes.js"
import commentsRouter from "./Routers/CommentsRouter.js"
import userRouter from "./Routers/authUserRoutes.js"
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';



dotenv.config();

const app = express();

app.use(cookieParser())
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({limit: '10mb',extended: true}))
app.use(
  cors({
   origin: [
    "http://localhost:5173",
    "https://glistening-dragon-43dc39.netlify.app"
   ],
    methods: ["GET", "POST", "PUT",'PATCH', "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;




app.get("/", (req, res) => {
  res.status(200).send("app is running");
});

app.use("/api/auth",userRouter)
app.use("/api/blogs",blogsRouter)
app.use("/api/comments",commentsRouter)


app.listen(PORT, () => {
  console.log(`app is running ${PORT}`);
});
