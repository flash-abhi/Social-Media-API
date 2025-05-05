import mongoose from "mongoose";

const friendshipSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    friend:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status:{
        type: String,
        enum: ["pending","accept","reject"],
        default: "pending"
    },
    
},{timestamps:true});

export default friendshipSchema;