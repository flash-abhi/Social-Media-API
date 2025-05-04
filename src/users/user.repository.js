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
    async logout(token, userId){
        try{
            const updatedUser = await userModel.findByIdAndUpdate(
                userId,
                { $pull: { tokens: token } },
                { new: true }
              );
              if (!updatedUser) return null;
              return { message: "Logged out successfully" };
        }catch(err){
            console.log(err);
        }
    }
    async getUserById(id) {
        return await userModel.findOne({_id: new ObjectId(id)}).select("-password").populate("Post");
    }

    async getAllUsers() {
        return await userModel.find().select("-password").populate("Post");
    }

    async updateUser(id, updateData) {
        return await userModel.findByIdAndUpdate(id, updateData, { new: true }).select("-password").populate("Post");
    }
    async avatarUpload(avatar,userId){
        const user = await userModel.findById(userId);
        user.avatar = avatar;
        return await user.save();
    }
}