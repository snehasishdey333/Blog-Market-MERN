const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const multer=require('multer')
const path=require('path')
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const postRoute=require('./routes/posts')
const categoryRoute=require('./routes/categories')
const commentRoute=require('./routes/comments')




//database
const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("database is connected successfully!")
    }
    catch(err){
        console.log(err)
    }
}





//middlewares
dotenv.config()
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/cats",categoryRoute)
app.use("/api/comments",commentRoute)


app.get("/",(req,res)=>{
    res.json("hello")
})

//image upload
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },filename:(req,file,cb)=>{
        // cb(null,"jeet123.jpg")
        cb(null,req.body.name)
    }
})
//image upload
const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Image has been uploaded!")
})



const PORT=process.env.PORT

app.listen(PORT || 5000,()=>{
    connect()
    console.log("app is running on port 5000")
})