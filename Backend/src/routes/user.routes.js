import { loginController, signUpController } from "../controllers/user.controller.js";
import express from 'express';

const userRouter = express.Router()

userRouter.post("/signup",signUpController)

userRouter.post("/login",loginController)

export default userRouter