import mongoose from "mongoose";
import friendshipSchema from "./friendship.schema.js";
import { ObjectId } from "mongodb";
import { userSchema } from "../users/user.schema.js";
import ApplicationError from "../errors/ApplicationError.js";
const friendModel = mongoose.model("Friends",friendshipSchema);
const userModel = mongoose.model("User",userSchema);
export default class FriendshipRepository{
     async getFriend(userId){
        try{
            const friend = await friendModel.find({
                $or:[
                    {
                        user: new ObjectId(userId)
                    },
                    {
                        friend: new ObjectId(userId)
                    }
                ],status: "accept"
            }).populate("user friend", "name email");
            return friend;

        }catch(err){
            console.log(err);
        }
     }
    async toggle(friendId,userId){
        try{
            const existingFriendship= await friendModel.findOne({
               $or: [
                {
                    user: new ObjectId(userId),
                    friend: new ObjectId(friendId)
                },
                {
                    user : new ObjectId(friendId),
                    friend : new ObjectId(userId)
                }
               ]
            });
            if(existingFriendship){
                if(existingFriendship.status == "pending"){
                    await friendModel.deleteOne({ $or: [
                        { user: new ObjectId(userId), friend: new ObjectId(friendId) },
                        { user: new ObjectId(friendId), friend: new ObjectId(userId) }
                    ],
                    status: 'pending'});
                    return {message: "Friend Request Cancelled"}
                }else if(existingFriendship.status == "accept"){
                    await friendModel.deleteOne({
                        $or: [
                            { user: new ObjectId(userId), friend: new ObjectId(friendId) },
                            { user: new ObjectId(friendId), friend: new ObjectId(userId) }
                        ]
                    });
                    return { message: "Friend removed." };
                }else if(existingFriendship.status == "reject"){
                    return {message : "Request is removed"}
                }
            }else{
                const newFriendship = new friendModel({
                    user: new ObjectId(userId),
                    friend: new ObjectId(friendId),
                    status: 'pending'
                });
                await newFriendship.save();
                return { message: "Friend request sent." };
            }
        }catch(err){
            console.log(err);
        }
    }
    async getPendingRequest(userId){
        try{
            const pendingRequest = friendModel.findOne({friend: new ObjectId(userId),status: "pending"}).populate("user","name");
            if(!pendingRequest){
                throw new  ApplicationError("User has no pending friend request",404);
            }else{
                return pendingRequest;
            }
        }catch(err){
            console.log(err);
        }
    }
    async respondToRequest(friendId,userId,response){
        try{
            const friendRespond = await friendModel.findOne({user:new ObjectId(userId),friend: new ObjectId(friendId),status:"pending"});
            if(friendRespond){
                friendRespond.status = response;
                await friendRespond.save();
                return { message: `Friend request ${response}.` };
            }else{
                throw new ApplicationError('Friend request not found', 404);
            }
           
        }catch(err){
            console.log(err);
        }
    }
}