import dotenv from 'dotenv';
dotenv.config();
import express from 'express'

const app = express()


app.use("/api/user")
app.use("/api/blog")





app.listen(3000,()=>{
console.log("Server is running at PORT 3000")
})