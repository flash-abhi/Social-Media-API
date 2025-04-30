import express from "express";
import { PostController } from "./post.controller.js";

const postController = new PostController();

export const postRouter = express.Router();

postRouter.post("/create",(req,res,next)=>{
    postController.createPost(req,res,next);
});

postRouter.get("/allPost",(req,res,next)=>{
    postController.getAllPost(req,res,next);
});

postRouter.get("/getOne/:id",(req,res,next)=>{
    postController.getOnePost(req,res,next);
});

postRouter.put("/update/:postId",(req,res,next)=>{
    postController.updateOnePost(req,res,next);
});

postRouter.delete("/delete/:postId",(req,res,next)=>{
    postController.deleteOnePost(req,res,next);
})