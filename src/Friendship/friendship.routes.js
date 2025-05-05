import express from "express"
import FriendshipController from "./friendship.controller.js";
const friendshipController = new FriendshipController();
const friendshipRouter = express.Router();

friendshipRouter.post("/toggle-friendship/:friendId",(req,res,next)=>{
    friendshipController.toggleFriendRequest(req,res,next);
});

friendshipRouter.get("/get-friends/:userId",(req,res,next)=>{
    friendshipController.getFriends(req,res,next);
});

friendshipRouter.get("/get-pending-requests",(req,res,next)=>{
    friendshipController.getPendingFriendRequests(req,res,next);
});
friendshipRouter.post("/response-to-request/:friendId",(req,res,next)=>{
    friendshipController.respondToRequest(req,res,next);
})
export default friendshipRouter;