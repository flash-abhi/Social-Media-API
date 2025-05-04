import mongoose from "mongoose";

export const userSchema = mongoose.Schema({
    name: String,
    email:{
        type: String,
        required: true,
        unique: true,
        // match:[/ .+\@.+\../, "Please enter a valid email"] 
    },
    password:{
        type : String,
        // required: true,
        unique: true,
    },
    gender:{
        type: String,
        enum:['Male','Female',"Other"]
    },
    avatar:{
        type: String
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});