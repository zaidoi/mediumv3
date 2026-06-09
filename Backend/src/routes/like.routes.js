import express from "express";
import tokenValidationMiddleware from "../middleware/token.middleware.js";
import { likeController, userLikeCheck } from "../controllers/features.controller.js";

const likeRouter = express.Router();

likeRouter.get("/:id",tokenValidationMiddleware,likeController)
likeRouter.get("/usercheck/:id",tokenValidationMiddleware,userLikeCheck)

export default likeRouter