import express from "express";
import CommentController from "./comment.controller.js";
const commentRouter = express.Router();

const commentController = new CommentController();

commentRouter.post("/add",(req,res,next)=>{
    commentController.addComment(req,res,next);
});

commentRouter.get("/get",(req,res,next)=>{
    commentController.getComment(req,res,next);
});

commentRouter.put("/update",(req,res,next)=>{
    commentController.updateComment(req,res,next);
});

commentRouter.delete("/delete",(req,res,next)=>{
    commentController.deleteComment(req,res,next);
});

export default commentRouter;