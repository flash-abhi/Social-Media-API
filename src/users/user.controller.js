import bcrypt from "bcrypt";
import "dotenv/config"
import { UserRepository } from "./user.repository.js";
import jwt from "jsonwebtoken";
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
                res.status(400).send("something went wrong with user creation");
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
            res.status(400).send({status:"error",description: "User not found"});
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
                  res.status(200).send(token);
            }else{
                res.status(400).send({status: "error",description: "password doesn't match "});
            }
        }
    }catch(err){
        console.log(err);
    } 
    }
    async resetPassword(req,res,next){
        
    }
}