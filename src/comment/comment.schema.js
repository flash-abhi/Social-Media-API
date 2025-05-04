import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
    comment: {
        type : String
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

export default commentSchema;