import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    users: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "Types"
    },
    Types: {
        type : String,
        enum: ["Post","Comment"]
    }
});

export default likeSchema;