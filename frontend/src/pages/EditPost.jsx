import { useContext,useState,useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import Navbar from '../components/Navbar'
import axios from 'axios'
import {ImCross} from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {URL} from '../url'
import Loader from '../components/Loader'

const EditPost = () => {
    const navigate=useNavigate()
  const {user}=useContext(UserContext)
  const [title,setTitle]=useState("")
  const [desc,setDesc]=useState("")
  const [file,setFile]=useState(null)
  const [cat,setCat]=useState("")
  const [cats,setCats]=useState([])
  const [loader,setLoader]=useState(false)
//   const [post,setPost]=useState(null)
const param=useParams()
// console.log(param.id)


  useEffect(()=>{
    fetchPostDetails()

  },[param.id])

  const fetchPostDetails=async()=>{
    setLoader(true)
    try{
        const res=await axios.get(URL+'/api/posts/post/'+param.id)
        // console.log(res.data)
        // setPost(res.data)
        setTitle(res.data.title)
        setDesc(res.data.desc)
        setFile(res.data.photo)
        setCats(res.data.categories)
        setLoader(false)
        
    }
    catch(err){
      setLoader(true)
    console.log("error")
        console.log(err)
    }
  }
  

  const handleCreatePost=async(e)=>{
    e.preventDefault()

    const newPost={
      title:title,
      desc:desc,
      username:user.username,
      userId:user._id,
      categories:cats
    }

    if(file){
      const data=new FormData();
      const filename=Date.now()+file.name;
      data.append("name",filename)
      data.append("file",file)
      newPost.photo=filename;
      console.log(newPost)
      try{
       await axios.post(URL+"/api/upload",data)
      }
      catch(err){
        console.log(err)
      }
    }
 try{
 const res=await axios.put(URL+"/api/posts/post/"+param.id,newPost)
 
 //console.log(res.data)
//  setUpdated(true)
 navigate("/posts/post/"+res.data._id)
 
 
 }
 catch(err){
  console.log(err)
  
 }

  }

  

  const addCats=()=>{
   
    let updatedCats=[...cats]
    updatedCats.push(cat)
    setCat("")
    setCats(updatedCats)
  }

  const removeCat=(i)=>{
      let newCats=[...cats]
      newCats.splice(i)
      setCats(newCats)
  }

  return (
    <div>
      <Navbar/>
      <div className='px-6 md:px-[200px] mt-8'>
      <h1 className="font-bold md:text-2xl text-xl mb-4">Update a post</h1>
      <form className="w-full flex flex-col space-y-4 md:space-y-8">
        {loader?<Loader/>:<input onChange={(e)=>setTitle(e.target.value)} value={title} placeholder='Enter post Title' type="text" className='px-4 py-2 outline-none'/>}
        <input onChange={(e)=>setFile(e.target.files[0])}  placeholder='Enter image' type="file" className='px-4'/>
        <div className="flex flex-col">
        <div className="flex items-center space-x-4 md:space-x-8">
        <input value={cat} onChange={(e)=>setCat(e.target.value)} placeholder='Enter post category' type="text" className='px-4 py-2 outline-none'/>
        <div className="bg-black text-white px-4 py-2 font-semibold cursor-pointer" onClick={()=>addCats()}>Add</div>
        </div>
        <div className="flex px-4 mt-3">
          {loader?<Loader/>:cats.map((c,i)=>(
            <div key={i} className="flex ">
              <div  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
                <p>{c}</p>
                <p className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"><ImCross onClick={()=>removeCat(i)}/></p>
              </div>
            </div>
            
          ))}
        </div>
        </div>
       {loader?<Loader/> : <textarea onChange={(e)=>setDesc(e.target.value)} value={desc} rows={15} cols={30} placeholder='Enter post description' className='px-4 py-2 outline-none'/>}
        <button className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg" onClick={handleCreatePost}>Update</button>
      </form>
      
      </div>
      
    </div>
  )
}

export default EditPost
