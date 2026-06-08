import express from "express";
import tokenValidationMiddleware from "../middleware/token.middleware.js";
import {
  blogDeleteController,
  blogGetController,
  blogGetWithIdController,
  blogPostController,
  blogUpdateController,
} from "../controllers/blog.controller.js";

const blogRouter = express.Router();

blogRouter.post("/", tokenValidationMiddleware, blogPostController);
blogRouter.get("/:id", tokenValidationMiddleware, blogGetWithIdController);
blogRouter.get("/", tokenValidationMiddleware, blogGetController);
blogRouter.put("/:id", tokenValidationMiddleware, blogUpdateController);
blogRouter.delete("/:id", tokenValidationMiddleware, blogDeleteController);

export default blogRouter;
