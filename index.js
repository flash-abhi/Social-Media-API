import express from "express"
import { userRouter } from "./src/users/user.route.js";
import bodyParser from "body-parser";
import { postRouter } from "./src/post/post.routes.js";
import jwtAuth from "./src/middlewares/jwtAuth.js"
import commentRouter from "./src/comment/comment.routes.js";
import likeRouter from "./src/likes/like.routes.js";
import ApplicationError from "./src/errors/ApplicationError.js";
import friendshipRouter from "./src/Friendship/friendship.routes.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
export const app = express();


app.use(bodyParser.json())
app.use("/api/users",userRouter);
app.use("/api/post",jwtAuth,postRouter);
app.use("/api/comment",jwtAuth,commentRouter);
app.use("/api/likes",jwtAuth,likeRouter);
app.use("/api/friend",jwtAuth,friendshipRouter);
app.get('/',(req,res)=>{
    res.status(200).send("welcome to api");
});

app.use((err,req,res,next)=>{
    if(err instanceof ApplicationError){
        return res.status(err.code).send(err.message);
    }
    console.log(err);
    res.status(500).send("Something went wrong please try after some time.")
});

app.use((req,res)=>{
    res.status(404).send("API not found please give valid API.");
});
app.listen(5000,()=>{
    console.log("server is listening on port 5000");
    connectUsingMongoose();
});