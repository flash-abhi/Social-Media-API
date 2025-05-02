import mongoose from "mongoose";
import commentSchema from "./comment.schema.js";
import { ObjectId } from "mongodb";

const commentModel = mongoose.model("Comment",commentSchema);
export default class CommentRepository{
    async add(comment,postId,userId){
        try{
            const findComment = await commentModel.findOne({postId: new ObjectId(postId), userId: new ObjectId(userId)});
            if(findComment){
                return null;
            }else{
            const result = commentModel({comment,postId: new ObjectId(postId), userId: new ObjectId(userId)});
            return await result.save();
            }
        }catch(err){
            console.log(err);
        }
    }
    async update(comment,postId,userId){
        try{
            const findComment = await commentModel.findOne({postId: new ObjectId(postId), userId: new ObjectId(userId)});
            if(findComment){
                const result =await commentModel.updateOne({postId: new ObjectId(postId), userId: new ObjectId(userId)},{$set: {comment: comment}});
                return result;
            }
            return null;
        }catch(err){
            console.log(err);
        }
    }
    async delete(postId,userId){
        try{
            return await commentModel.deleteOne({postId: new ObjectId(postId),userId: new ObjectId(userId)});
        }catch(err){
            console.log(err);
        }
    }
    async get(postId,userId){
        try{
            return await commentModel.findOne({postId: new ObjectId(postId),userId: new ObjectId(userId)});
        }catch(err){
            console.log(err);
        }
    }
}

