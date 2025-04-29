import { app } from "./index.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
app.listen(5000,()=>{
    console.log("server is listening on port 5000");
    connectUsingMongoose();
});