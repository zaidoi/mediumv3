import mongoose from "mongoose";


 const connectDB = async () => { 
    if(!process.env.MONGO_URL){
         throw new Error("DB URL not working");
    }
    try {
        await mongoose.connect(process.env.MONGO_URL)
      
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB;