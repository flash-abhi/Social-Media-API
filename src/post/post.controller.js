import ApplicationError from "../errors/ApplicationError.js";
import { PostRepository } from "./post.repository.js";

export class PostController{
    constructor(){
        this.postRepository = new PostRepository()
    }

    async createPost(req,res,next){
        try{
            const {imageUrl,caption} = req.body;
           const userId = req.userId;
            // console.log(userId);
            const post = {caption , imageUrl, userId};
            const result = await this.postRepository.create(post,userId);
            if(result){
                res.status(201).send(result);
            }else{
                throw new ApplicationError("something went wrong with post creation",400);
            }
            
        }catch(err){
            console.log(err)
        }
    }
    async getAllPost(req,res,next){
        try{
           const userId =  req.userId;
           const result = await this.postRepository.getAll(userId);
           if(result.length>0){
            res.status(200).send({success: true, posts: result});
           }else{
            throw new ApplicationError("Post not Found ",404);
        }
        }catch(err){
            console.log(err)
        }
    }
    async getOnePost(req,res,next){
        try{
            const postId = req.params.id;
            const result = await this.postRepository.getOne(postId);
            if(result){
                res.status(200).send({success: true, posts: result})
            }else{
                throw new ApplicationError("post not found",400);
            }
        }catch(err){
            console.log(err)
        }
    }
    async deleteOnePost(req,res,next){
        try{
            const userId =  req.userId;
            const postId = req.params.postId;
            const result = await this.postRepository.delete(postId,userId);
            if(result.deletedCount > 0){
                res.status(200).send({status: true, message: "post deleted successfully"});
            }
            else{
                throw new ApplicationError("Cannot delete the post",400);
            }
        }catch(err){
            console.log(err);
        }
    }
    async updateOnePost(req,res,next){
        try{
            const userId = req.userId;
           const {caption} = req.body;
           const postId = req.params.postId;
           const result = await this.postRepository.update(postId,caption,userId);
           if (result.modifiedCount > 0) {
            res.status(200).send({status: true, message: "post is updated"});
           }else{
            throw new ApplicationError("Cannot update the post",400);
        }
        }catch(err){
            console.log(err)
        }
    }

}