import zod from "zod";

const SignupZod = zod.object({
    username:zod.string().min(3).trim(),
    email:zod.string().trim(),
    password:zod.string().min(5)
})

const LoginZod = zod.object({
    email:zod.string().trim(),
    password:zod.string().min(5)
})

export { SignupZod , LoginZod}