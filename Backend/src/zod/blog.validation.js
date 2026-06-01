import zod, { string } from "zod";

const BlogZod = zod.object({
    title:zod.string().min(3),
    content:zod.string().min(10)
})

export default BlogZod