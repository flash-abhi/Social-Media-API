import ApplicationError from "../errors/ApplicationError.js";
import FriendshipRepository from "./friendship.repository.js";

export default class FriendshipController{
    constructor(){
        this.friendshipRepository = new FriendshipRepository();
    }

    async getFriends(req,res,next){
        try{
            const friendId = req.params.userId;
            const result = await this.friendshipRepository.getFriend(userId);
            if(result.length > 0){
                res.status(200).send(result);
            }else{
                throw new ApplicationError("User friends couldn't be retrieved. ", 404);
            }
        }catch(err){
            console.log(err);
        }
    }
    
    async getPendingFriendRequests(req,res,next){
        try{
            const userId = req.userId;
            const pendingRequest = await this.friendshipRepository.getPendingRequest(userId);
            if(pendingRequest){
                res.status(200).send(pendingRequest);
            }else{
                throw new ApplicationError("pending friend request could not received",404);
            }
        }catch(err){
            console.log(err);
        }
    }

     async toggleFriendRequest(req,res,next){
        try{
           const friendId = req.params.friendId;
           const userId = req.userId;
           if(userId == friendId){
            throw new ApplicationError("user cannot add itself as a friend.",404);
           }
           const result = await this.friendshipRepository.toggle(friendId,userId);
           if(!result){
            throw new ApplicationError("Toggle friendship failed, something went wrong.", 404)
           }else{
            res.status(200).send({
                success: true,
                msg: result.message});
           }
        }catch(err){
            console.log(err);
        }
    }

    async respondToRequest(req,res,next){
        try{
            const friendId = req.params.friendId;
            const userId = req.userId;
            if(!friendId){
                throw new ApplicationError("friendId does not received please send the friendId",404);
            }
            const response = await this.friendshipRepository.respondToRequest(friendId,userId);
            if(response){
                res.status(200).send(response);
            }
        }catch(err){
            console.log(err);
        }
    }
}