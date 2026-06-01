import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import connectDB from './config/dbConnection';

const app = express()

connectDB()

app.use("/api/user")
app.use("/api/blog")





app.listen(3000,()=>{
console.log("Server is running at PORT 3000")
})