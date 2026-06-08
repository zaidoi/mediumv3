import BlogZod from "../zod/blog.validation.js";
import Blog from "../models/blog.schema.js";

async function blogPostController(req, res) {
  const result = BlogZod.safeParse(req.body);

  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({
      message: "Unauthorized",
    });
  }

  if (!result.success) {
    return res.status(400).json({ message: result.error.issues[0].message });
  }

  const { title, content } = result.data;

  try {
    const blogCreate = await Blog.create({
      title: title,
      content: content,
      author: userId,
    });

    res.status(200).json({
      message: "Blog Created",
      blogCreate,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function blogGetController(req, res) {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({
      message: "Unauthorized",
    });
  }

  try {
    const allBlog = await Blog.find().populate("author", "username  email");

    res.status(200).json({
      message: "All Blogs",
      allBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function blogGetWithIdController(req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(403).json({
      message: "Id not provided",
    });
  }
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({
      message: "Unauthorized",
    });
  }

  try {
    const blog = await Blog.findOne({ _id: id }).populate("author", "username");
    const isAuthor = blog.author._id.toString() === userId.toString()
    if (!blog) {
      return res.status(400).json({
        message: "Blog not found",
      });
    }
    if (isAuthor) {
      res.status(200).json({
        blog,
        author: isAuthor,
      });
    } else {
      res.status(200).json({
        blog,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function blogUpdateController(req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(403).json({
      message: "Id not provided",
    });
  }
  const result = BlogZod.safeParse(req.body);

  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({
      message: "Unauthorized",
    });
  }

  if (!result.success) {
    return res.status(400).json({
      message: "Not Correct Inputs Value",
    });
  }

  const { title, content } = result.data;
  try {
    const blog = await Blog.findOne({ _id: id, author: userId });
    if (!blog) {
      return res.status(400).json({
        message: "Blog not found",
      });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();
    res.status(200).json({
      message: "Blog Updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function blogDeleteController(req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "Id not provided",
    });
  }

  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({
      message: "Unauthorized",
    });
  }

  try {
    const deleteBlog = await Blog.findOneAndDelete({ _id: id, author: userId });
    if (!deleteBlog) {
      return res.status(400).json({
        message: "Not allowed to Delete or not found",
      });
    }

    res.status(200).json({
      message: "Blog deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export {
  blogPostController,
  blogGetController,
  blogGetWithIdController,
  blogUpdateController,
  blogDeleteController,
};
