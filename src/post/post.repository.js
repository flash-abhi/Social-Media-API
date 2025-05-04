import mongoose from "mongoose";
import postSchema from "./post.schema.js";
import { ObjectId } from "mongodb";
import { userSchema } from "../users/user.schema.js";

const postModel = mongoose.model("Post",postSchema);
const userModel = mongoose.model("User",userSchema);
export class PostRepository{
    async create(post,userId){
        try {
            const user = await userModel.findByID(userId);

            const postresult = new postModel(post);
            await postresult.save();
            user.posts.push(postresult._id)
            await user.save();
            return postresult

        }catch(err){
            console.log(err);
        }
    }
    async getAll(userId){
        try{
            const result = await postModel.find({userId});
            console.log(result);
            return result;
        }catch(err){
            console.log(err);
        }
    }
    async getOne(postId){
        try{
            const result = await postModel.findOne({_id: new ObjectId(postId)})
            console.log(result);
            return result;
        }catch(err){
            console.log(err);
        }
    }

    async update(postId, newcaption,userId){
        try{
            return await postModel.updateOne({_id:new ObjectId(postId),userId: new ObjectId(userId)},{$set:{caption:newcaption}});
        }catch(err){
            console.log(err);
        }
    }
    async delete(postId,userId){
        try{
            return await postModel.deleteOne({_id: new ObjectId(postId),userId: userId});
        }catch(err){
            console.log(err)
        }
    }
}