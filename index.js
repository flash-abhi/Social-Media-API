import express from "express"
import { userRouter } from "./src/users/user.route.js";
import bodyParser from "body-parser";
import { postRouter } from "./src/post/post.routes.js";
import jwtAuth from "./src/middlewares/jwtAuth.js"
export const app = express();

app.use(bodyParser.json())
app.use("/api/users",userRouter);
app.use("/api/post",jwtAuth,postRouter);