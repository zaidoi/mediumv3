import zod from 'zod'

const CommentZod = zod.object({
    text:zod.string().min(3).trim()
})

export default CommentZod