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
    }
});

export default postSchema;