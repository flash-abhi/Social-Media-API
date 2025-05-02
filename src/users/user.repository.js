import mongoose from "mongoose"
import { userSchema } from "./user.schema.js"
import { ObjectId } from "mongodb";

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
    async getUserById(id) {
        return await userModel.findOne({_id: new ObjectId(id)}).select("-password");
    }

    async getAllUsers() {
        return await userModel.find().select("-password");
    }

    async updateUser(id, updateData) {
        return await userModel.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
    }
}