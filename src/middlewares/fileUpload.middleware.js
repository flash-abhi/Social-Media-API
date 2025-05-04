// 1 import the multer and fs
import multer from "multer";
import fs from "fs";
// 2. set the directory for the uploads to be stored.
const dir = "../../Uploads"

// 3. create the uploads directory if it doesn't exist.

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir, {recursive:true});
}

//4  Configure storage with filename and location.

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, dir);
    },
    filename: (req,file,cb)=>{
        const name = Date.now()+"-"+file.originalname
        cb(null,name)
    }
});

export const uploads = multer({
    storage: storage
})
