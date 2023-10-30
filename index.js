import express from "express";
import cors from "cors";
import authRoutes from "./routes/Auth.js";
import postRouter from './routes/post.js'
import commentRouter from './routes/comment.js'
import likesRouter from './routes/likes.js'
import userRoutes from './routes/user.js'
import followRoutes from './routes/follow.js'
import fileRoutes from './routes/uploadFile.js'
import cookieParser from "cookie-parser";

const app = express();

//Middlewares
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Credentials', true)
  next()
})
app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173"
}));
app.use(cookieParser())

app.listen(8800, () => {
  console.log("connected to backend");
});

app.get("/", (req, res) => {
  res.json("hello backend");
});

app.use("/auth", authRoutes);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/like", likesRouter);
app.use("/user", userRoutes);
app.use("/follow", followRoutes);
app.use("/file", fileRoutes)
