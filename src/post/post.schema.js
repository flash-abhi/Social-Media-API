import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    caption:{
        type : String,
    },
    imageUrl: {
        type : String,
        required : true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Like"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

export default postSchema;