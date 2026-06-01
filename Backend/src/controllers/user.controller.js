import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.schema.js";
import { SignupZod, LoginZod } from "../zod/user.validation.js";

async function signUpController(req, res) {
    console.log("controller")
  const body = req.body;
  const result = SignupZod.safeParse(body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid Inputs",
      result:result.success,
      error: result.error,
    });
  }

  const { username, email, password } = body;
  const hashedPassword = await bcryptjs.hash(password, 10);


  try {
    const alreadyExist = await User.findOne({
      email: email,
    });



    if (alreadyExist) {
      return res.status(400).json({
        message: "User already Exits",
      });
    }



    await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    res.status(200).json({
      message: "User Created",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function loginController(req, res) {
  const body = req.body;
  const result = LoginZod.safeParse(body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid Inputs",
      error: result.error,
    });
  }

  const { email, password } = body;

  try {
    const alreadyExist = await User.findOne({
      email: email,
    });
    if (!alreadyExist) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    const comparePassword = await bcryptjs.compare(
      password,
      alreadyExist.password,
    );

    if (!comparePassword) {
      return res.status(400).json({
        message: "Password is Incorrect",
      });
    }

    const token = await jwt.sign({ User_id:alreadyExist._id }, process.env.JWT_SECRET);

    if (!token) {
      return res.status(400).json({
        message: "Please Login Again",
      });
    }
    res.status(200).json({
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export { signUpController, loginController };
