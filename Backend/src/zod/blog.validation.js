import zod from "zod";

const BlogZod = zod.object({
  title: zod.string().min(3,{message: "Enter atleast 3 words in Title"}),
  content: zod.string().min(10, { message: "Enter atleast 10 words in Content" }),
});

export default BlogZod;
