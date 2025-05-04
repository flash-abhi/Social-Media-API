import bcrypt from "bcrypt";
import "dotenv/config"
import { UserRepository } from "./user.repository.js";
import jwt from "jsonwebtoken";
import ApplicationError from "../errors/ApplicationError.js"
export class userController{
    constructor(){
        this.userRepository = new UserRepository();
    }
   async signUp(req,res,next){
        try{
            let {name,email,password,gender} = req.body;
            const oldPass = password;
            // console.log(name,email,password);
            password =await bcrypt.hash(password,10);
            const user = {name,email,password,gender};
            const result = await this.userRepository.signUp(user);
            if(result){
                res.status(201).send(result);
            }else{
                throw new ApplicationError("something went wrong with user creation",400);
            }
        }catch(err){
            console.log(err);
        }

    }
   async signIn(req,res,next){
    try{
        const {email, password} = req.body;
        const user = await this.userRepository.signIn(email);
        if(!user){
           throw new ApplicationError("User not Found",404);
        }
        else{
            const passMatch = bcrypt.compare(password,user.password);
            if(passMatch){
                const token = jwt.sign(
                    { UserId: user._id, email: user.email },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: "2h",
                    }
                  );
                   user.token.push(token);
                  const savedUser= await user.save();
                 console.log(savedUser);
                  res.status(200).send(token);
            }else{
                throw new ApplicationError("Password does not match",400);
            }
        }
    }catch(err){
        console.log(err);
    } 
    }
    async getProfile(req, res, next) {
        try {
            const userId = req.userId;
            // console.log(userId);
            const user = await this.userRepository.getUserById(userId);
            // console.log(user);
            if (!user) return res.status(404).send({ message: "User not found" });
            res.status(200).send(user);
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Error retrieving profile" });
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await this.userRepository.getAllUsers();
            res.status(200).send(users);
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Error retrieving users" });
        }
    }

    async updateProfile(req, res, next) {
        try {
            const userId = req.userId;
            const { name, gender } = req.body;
            const updateData = { name, gender };
            const updatedUser = await this.userRepository.updateUser(userId, updateData);
            res.status(200).send(updatedUser);
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Error updating profile" });
        }
    }
    async avatarUpload(req,res,next){
        try{
           const avatar = req.file.filename;
           const userId = req.userId;
           if(!avatar){
            throw new ApplicationError("Avatar not Received  please add avatar.", 404);
           }
           else{
            const result = await this.userRepository.avatarUpload(avatar,userId);
            if(!result){
                throw new ApplicationError("Avatar not Uploaded something went wrong");
            }
            return res.status(201).json({
                success: true,
                msg: "Avatar uploaded to your profile cheers :)"
            });
           }
        }catch(err){
            console.log(err);
        }
    }
    async logoutUser(req,res,next){
        try{
            const token = req.headers.authorization.replace("Bearer", "");
            const userId = req.userId;
            const result = await this.userRepository.logout(token , userId);
            if (!result) {  
                throw new ApplicationError("Logout failed", 400);
            }

            return res.status(200).json({
                success: true,
                message: result.message
            });
        }catch(err){
            console.log(err);
        }
    }
}