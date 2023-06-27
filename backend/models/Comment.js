const mongoose=require('mongoose')

const CommentSchema=new mongoose.Schema({
    comment:{
        type:String,
        requried:true
    },
    author:{
        type:String,
        requried:true
    },
    postId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }

},{timestamps:true});

module.exports=mongoose.model('Commment',CommentSchema);