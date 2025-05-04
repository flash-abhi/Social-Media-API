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
            throw new Error("Enter a valid type 'post' or 'comment'. ",400)
           }else{
            const result = await this.likeRepository.toggleLike(userId , id ,types);
            if(!result){
                throw new Error("like not Added something went wrong ",404);
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
            const result = await this.likeRepository.get(id,userId,types);
            if(result.length> 0 ){
                res.status(200).send(result);
            }
        }catch(err){
            console.log(err);
        }
    }
}