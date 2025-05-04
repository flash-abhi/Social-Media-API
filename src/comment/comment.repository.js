import mongoose from "mongoose";
import commentSchema from "./comment.schema.js";
import { ObjectId } from "mongodb";
import postSchema from "../post/post.schema.js";
const commentModel = mongoose.model("Comment",commentSchema);
const postModel = mongoose.model("Post",postSchema);
export default class CommentRepository{
    async add(comment,postId,userId){
        try{
            const post =await postModel.findOne({_id: new ObjectId(postId)});
            if(post){
            const findComment = await commentModel.findOne({postId: new ObjectId(postId), userId: new ObjectId(userId)});
            if(findComment){
                return null;
            }else{
            const result =new commentModel({comment,postId: new ObjectId(postId), userId: new ObjectId(userId)});
            const savedComment = await result.save();
            // console.log(savedComment);
            // console.log(post)
            post.comments.push(savedComment);
            await post.save();
             return result;
            }
            }else{
                throw new Error("post not found");
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
    async delete(commentId,postId,userId){
        try{
            const post =await postModel.findOne({_id: new ObjectId(postId)});
            if(post){
            // console.log(post);
            const index = post.comments.indexOf(commentId);
            console.log(index);
            if(index > -1){
            const deletePost = post.comments.splice(index,1);
            }
            console.log(post);
            const savedPost = await post.save();
            return await commentModel.deleteOne({postId: new ObjectId(postId),userId: new ObjectId(userId)});
            }
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

