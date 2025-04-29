import express from "express"
import { userController } from "./user.controller.js";

export const userRouter = express.Router();

const UserController = new userController();

userRouter.post("/signup",(req,res,next)=>{
    UserController.signUp(req,res,next);
})

userRouter.post("/signin",(req,res,next)=>{
    UserController.signIn(req,res,next);
})