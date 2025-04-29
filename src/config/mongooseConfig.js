import mongoose from "mongoose";
import "dotenv/config";
const url = process.env.DB_URL;


export const connectUsingMongoose= async ()=>{
try{
    const connection = await mongoose.connect(url);
    console.log("Database connected");
}catch(err){
    console.log(err);
}
}