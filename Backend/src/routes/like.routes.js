import express from "express";
import tokenValidationMiddleware from "../middleware/token.middleware.js";
import { likeController } from "../controllers/features.controller.js";

const likeRouter = express.Router();

likeRouter.get("/:id",tokenValidationMiddleware,likeController)

export default likeRouter