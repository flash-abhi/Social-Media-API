import mongoose from "mongoose"
import { userSchema } from "./user.schema.js"

const userModel = mongoose.model("User",userSchema);
export class UserRepository{
    async signUp(user){
       try{
        const newUser =  userModel(user);
        await newUser.save();
        return newUser;
       }catch(err){
        console.log(err);
       }
    }
    async signIn(email){
        try{
            return await userModel.findOne({email});
        }catch(err){
            console.log(err);
        }
    }
}