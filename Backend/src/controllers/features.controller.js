import { Comment, Like } from "../models/features.schema.js";
import CommentZod from "../zod/comment.validation.js";

async function commentPostController(req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(403).json({
      message: "Id not provided",
    });
  }
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      message: "Invalid Inputs",
    });
  }
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({
      message: "Unauthorized",
    });
  }
  const result = CommentZod.safeParse(body);
  if (!result.success) {
    return res.status(400).json({
      message: "Not Correct Inputs Value",
    });
  }

  const { text } = result.data;

  try {
    const comment = await Comment.create({
      text: text,
      blogId: id,
      userId: userId,
    });

    res.status(200).json({
      message: "Comment Added",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function commentGetController(req, res) {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({
      message: "Unauthorized",
    });
  }
  const id = req.params.id;
  if (!id) {
    return res.status(403).json({
      message: "Id not provided",
    });
  }

  try {
    const comments = await Comment.find({ blogId: id }).populate(
      "userId",
      "name",
    );
    res.status(200).json({
      comments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function likeController(req, res) {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({
      message: "Unauthorized",
    });
  }
  const id = req.params.id;
  if (!id) {
    return res.status(403).json({
      message: "Id not provided",
    });
  }

  try {
    const existingLine = await Like.findOne({ blogId: id, userId: userId });
    if (existingLine) {
      await Like.deleteOne({ blogId: id, userId: userId });
      return res.json({ message: "Unliked" });
    }

    await Like.create({ blogId: id, userId: userId });
    res.json({ message: "Liked" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}


export {commentPostController,commentGetController,likeController}