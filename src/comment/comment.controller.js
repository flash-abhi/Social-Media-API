import CommentRepository from "./comment.repository.js";

export default class CommentController{
    constructor(){
        this.commentRepository = new CommentRepository();
    }
    async getComment(req,res,next){
        try{
            const {postId} = req.body;
            const userId = req.userId;
            const result = await this.commentRepository.get(postId,userId);
            if(result){
                res.status(200).send({status: true, message: result});
            }else{
                res.status(400).send({status: false, message: "Cannot get the Comment"});
            }
        }catch(err){
            console.log(err);
        }
    }
    async addComment(req,res,next){
        try{
            const {comment,postId} = req.body;
            const userId = req.userId;
            // console.log(comment,postId,userId);
            const result = await this.commentRepository.add(comment,postId,userId);
            // console.log(result);
            if(result){
                res.status(201).send({status: true, message: result});
            }else{
                res.status(400).send({status: false , message: "comment already exist. you can update the comment" });
            }
        }catch(err){
            console.log(err);
        }
    }
    async updateComment(req,res,next){
        try{
            const {comment,postId} = req.body;
            const userId = req.userId;
            const result = await this.commentRepository.update(comment,postId,userId);
            if(result == null || result.modifiedCount == 0 ){
                res.status(400).send({status: false, message: "Comment Not Updated"});
            }else{
                res.status(200).send({status: false, message: "Comment Updated Successfully !!!"});
            }
        }catch(err){
            console.log(err);
        }
    }
    async deleteComment(req,res,next){
        try{
            const {postId} = req.body;
            const userId = req.userId;
            const result = await this.commentRepository.delete(postId,userId);
            if(result.deletedCount > 0){
                res.status(200).send({status: true, message: "Comment Deleted Successfully !!!"});
            }else{
                res.status(400).send({stauts: false, message: "Comment Not Found !!!"})
            }
        }catch(err){
            console.log(err);
        }
    }
}