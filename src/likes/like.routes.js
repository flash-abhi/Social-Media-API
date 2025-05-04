import express from "express";
import LikeController from "./like.controller.js";

const likeController = new LikeController();
const likeRouter = express.Router();

likeRouter.post("/toggle/:id",(req,res,next)=>{
    likeController.toggleLike(req,res,next);
});
likeRouter.get("/get/:id",(req,res,next)=>{
    likeController.getLikes(req,res,next);
});
export default likeRouter;