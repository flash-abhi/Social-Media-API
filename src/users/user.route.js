import express from "express"
import { userController } from "./user.controller.js";
import jwtAuth from "../middlewares/jwtAuth.js";

export const userRouter = express.Router();

const UserController = new userController();

userRouter.post("/signup",(req,res,next)=>{
    UserController.signUp(req,res,next);
})

userRouter.post("/signin",(req,res,next)=>{
    UserController.signIn(req,res,next);
})

userRouter.get("/get-details",jwtAuth,(req,res,next)=>{
    UserController.getProfile(req,res,next);
});

userRouter.get("/get-all-details",(req,res,next)=>{
    UserController.getAllUsers(req,res,next);
});

userRouter.put("/update-details",jwtAuth,(req,res,next)=>{
    UserController.updateProfile(req,res,next);
});
userRouter.post("/avatar-uploads",jwtAuth,(req,res,next)=>{
    UserController.avatarUpload(req,res,next);
});
userRouter.post("/logout-device",jwtAuth,(req,res,next)=>{
    UserController.logoutUser(req,res,next);
})