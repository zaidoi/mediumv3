import mongoose from "mongoose";


const connectDB = () =>{
    if(!process.env.MONGO_URL){
         throw new Error("DB URL not working");
    }
    try {
        mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB;