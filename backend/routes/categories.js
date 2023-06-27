const express=require("express");
const router=express.Router();
const Category=require("../models/Category");
const Post=require("../models/Post");

//create category
router.post("/create",async (req,res)=>{
    const newCat=new Category(req.body);
try{
const savedCat=await newCat.save();
res.status(200).json(savedCat);

}
catch(err){
res.status(500).json(err);
}
})

//fetch all categories
router.get("/all",async (req,res)=>{
   
try{
const cats=await Category.find();
res.status(200).json(cats);

}
catch(err){
res.status(500).json(err);
}
})

//delete category

router.delete("/:id",async (req,res)=>{
    try{
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).json('Category has been deleted')
    }
    catch(err){
        res.status(500).json(err)
    }
})



module.exports=router;