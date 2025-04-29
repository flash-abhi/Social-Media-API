import express from "express"
import { userRouter } from "./src/users/user.route.js";
import bodyParser from "body-parser";
export const app = express();

app.use(bodyParser.json())
app.use("/api/users",userRouter);