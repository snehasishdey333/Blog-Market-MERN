const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const verify=require('../verifyToken')
const Post = require('../models/Post')
const Comment=require('../models/Comment.js')



//GET USER DATA
router.get("/user/:id",async(req,res)=>{
    try{

        const id=req.params.id
        const user=await User.findById(id)
        res.status(200).json(user)


    }
    catch(err){
        res.status(500).json(err)
    }
})

//UPDATE USER
router.put("/user/:id",async (req,res)=>{
    
    try{
        // if(req.body.password){
        //     const salt=await bcrypt.genSalt(10)
        //     req.body.password=await bcrypt.hashSync(password,salt)
            
        // }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//DELETE USER
// router.delete("/user/:id",async (req,res)=>{
//     try{
//         const userId=req.params.id
//         await User.findByIdAndDelete(req.params.id)
//         //DELETE ALL HIS POSTS AND CATGORIES ALSO
//         res.status(200).json('User details has been deleted')
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// })
router.delete("/user/:id",async (req,res)=>{
    try{
        
        
            await Comment.deleteMany({userId:req.params.id})
            await Post.deleteMany({userId:req.params.id})
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user has been deleted!")
        

    }
    catch(err){
        res.status(500).json(err)
    }
})


//SEARCH USER
router.get("/search/:username",async (req,res)=>{
    try{
       
        const users=await User.find({
            "$or":[
                {"username":{$regex:req.params.username}}
            ]
        })
        res.status(200).json(users)

    }
    catch(err){
        res.status(404).json(err)
    }
})



module.exports=router
