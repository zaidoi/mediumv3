import express from 'express'
import tokenValidationMiddleware from '../middleware/token.middleware.js';
import { commentGetController, commentPostController } from '../controllers/features.controller.js';

const commentRouter = express.Router();

commentRouter.post("/",tokenValidationMiddleware,commentPostController)
commentRouter.get("/:id",tokenValidationMiddleware,commentGetController)

export default commentRouter