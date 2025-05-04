import ApplicationError from "../errors/ApplicationError.js";
import LikeRepository from "./like.repository.js";

export default class LikeController{
    constructor(){
        this.likeRepository = new LikeRepository();
    }

    async toggleLike(req,res,next){
        try{
            const {types} = req.body;
            const id = req.params.id;
            const userId = req.userId;
           if(types != 'Post' && types != 'Comment'){
            throw new ApplicationError("Enter a valid type 'post' or 'comment'. ",400)
           }else{
            const result = await this.likeRepository.toggleLike(userId , id ,types);
            if(!result){
                throw new ApplicationError("like not Added something went wrong ",404);
            }
            return res.status(200).json({
                success: true,
                msg: result.message
            })
           }
        }catch(err){
            console.log(err);
        }
    }

    async getLikes(req,res,next){
        try{
            const {types} = req.body;
            const id = req.params.id;
            const userId = req.userId;
            if(types != "Post" && types != "Comment"){
                throw new ApplicationError("Types doesn't match it should be ( Post or Comment).",400);
            }
            if(!id){
                throw new ApplicationError("please provide the id of Comment or Post ",400);
            }
            const result = await this.likeRepository.get(id,userId,types);
            if(result.length<0){
                throw new ApplicationError("Likes not retrieved something went wrong.", 404);
            }
            res.status(200).send({ 
                success: true,
                likes: result,
                msg: "likes retrieved."
            })
        }catch(err){
            console.log(err);
        }
    }
}