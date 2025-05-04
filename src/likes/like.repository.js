import mongoose from "mongoose";
import likeSchema from "./like.schema.js";
import { ObjectId } from "mongodb";
import postSchema from "../post/post.schema.js";
import commentSchema from "../comment/comment.schema.js";
import ApplicationError from "../errors/ApplicationError.js";
const likeModel = mongoose.model("Like",likeSchema);
const postModel = mongoose.model("Post",postSchema);
const commentModel = mongoose.model("Comment",commentSchema);
export default class LikeRepository{
   async toggleLike(userId,id,types){
    try{
        let likeable;
        if(types == 'Post'){
            likeable = await postModel.findById(id);
        }else{
            likeable = await commentModel.findById(id);
        }

        if(!likeable){
            throw new ApplicationError(`No ${types} found by the id `,404)
        }

        const existingLike = await likeModel.findOne({
            users: new ObjectId(userId),
            likeable: new ObjectId(id),
            Types: types
        });
        // console.log(existingLike);
        // console.log(existingLike._id);
        if(existingLike){
            await likeModel.findByIdAndDelete(existingLike._id);
            //Removing likes from the respective array (post or comment)
            const index = likeable.likes.indexOf(existingLike._id);
            if(index > -1){
                likeable.likes.splice(index,1);
                await likeable.save();
            }
            return {message: "like removed"};
        }else{
            const newLike = new likeModel({
                users: new ObjectId(userId),
                likeable: new ObjectId(id),
                Types: types,
            });
            const liked = await newLike.save(); 
            if(liked)
            {
                // Add like to the respective array (post or comment)
                likeable.likes.push(newLike._id);
                await likeable.save();
                return { message: 'Like added' };
            } 
        
        }
    }catch(err){
        console.log(err)
    }
   }
    async get(id,userId,types){
        try{
            let likeable;
            if(types == "Post"){
               likeable = await postModel.findById(id);
            }
            else if(types == "Comment"){
                likeable = await commentModel.findById(id);
            }

            if(!likeable){
                throw new ApplicationError(`No ${types.toLowerCase()} found with this ID.`, 404);
            }
            const likes = await likeModel.find({likeable: new ObjectId(id),
                Types: types}).populate({ path: 'users',
                    select: 'name email _id'}).populate("likeable");
                    return likes;
        }catch(err){
            console.log(err);
        }
    }
}