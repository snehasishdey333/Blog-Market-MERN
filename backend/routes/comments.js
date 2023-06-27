const express=require('express')
const router=express.Router()
const Comment=require('../models/Comment')
const verify=require('../verifyToken')


//CREATE POST
router.post('/create',async(req,res)=>{
    const newComment=new Comment(req.body)
    try{
        const savedComment=await newComment.save()
        res.status(200).json(savedComment)

    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET ALL POST DATA
router.get("/all",async(req,res)=>{
    try{

        const posts=await Comment.find()
        res.status(200).json(posts)

    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET POST COMMENTS
router.get("/post/:id",async(req,res)=>{
    try{

        const id=req.params.id
        const comments=await Comment.find({postId:id})
        res.status(200).json(comments)


    }
    catch(err){
        res.status(500).json(err)
    }
})

//UPDATE POST
router.put("/post/:id",async (req,res)=>{
    try{
        const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//DELETE COMMENT
router.delete("/comment/:id",async (req,res)=>{
    try{
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json('comment has been deleted')
    }
    catch(err){
        res.status(500).json(err)
    }
})


//SEARCH POSTS
router.get("/search/:postPrompt",async (req,res)=>{
    try{
        
        const posts=await Post.find({
            "$or":[
                {"title":{$regex:req.params.postPrompt},
                "desc":{$regex:req.params.postPrompt},
            
            }
            ]
        })
        res.status(200).json(posts)

    }
    catch(err){
        res.status(404).json(err)
    }
})



module.exports=router
