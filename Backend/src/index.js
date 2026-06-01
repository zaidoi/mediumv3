import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/dbConnection.js";
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
import likeRouter from "./routes/like.routes.js";
import commentRouter from "./routes/comment.routes.js";

const app = express();

connectDB();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);
app.use("/api/like", likeRouter);

app.listen(3000, () => {
  console.log("Server is running at PORT 3000");
});
