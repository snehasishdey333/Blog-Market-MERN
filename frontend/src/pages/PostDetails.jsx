import Navbar from '../components/Navbar'
import { useState,useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {URL} from '../url';
import { UserContext } from '../context/UserContext';
// import Comment from '../components/Comment';
import {PF} from '../url'
import Loader from '../components/Loader';
import {MdDelete} from 'react-icons/md'
import {BiEdit} from 'react-icons/bi'


const PostDetails = () => {
    
    // console.log(PF)
    const navigate=useNavigate()
    const {user}=useContext(UserContext)
    // console.log(user)
    // console.log(user.username)
    
    const { pathname } = useLocation();
    const id=pathname.split("/")[3]
   
    const [postId,setPostId]=useState("")
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [photo, setPhoto] = useState("")
    const [username, setUsername] = useState("")
    const [userId, setUserId] = useState("")
    const [categories, setCategories] = useState([])
    const [updatedAt,setUpdatedAt]=useState("")
    const [comment,setComment]=useState("")
    const [commentList,setCommentList]=useState([])
    const [loader,setLoader]=useState(false)
    const [confirmDelete,setConfirmDelete]=useState(false)

    const handleDelete=()=>{
      setConfirmDelete(true)
    }
    const cancelDelete=()=>{
      setConfirmDelete(false)
    }

    const postDelete=async()=>{
      try{
        await axios.delete(URL+"/api/posts/post/"+postId)
        .then((res)=>{
          navigate("/")
        })
  
      }
      catch(err){
        console.log(err)
      }
    }

    const deleteComment=async(id)=>{
        try{
          await axios.delete(URL+'/api/comments/comment/'+id)
          .then((res)=>{
            // console.log('comment deleted')
            fetchComments()
          })
    
        }
        catch(err){
          console.log(err)
        }
      }

    const fetchComments=async()=>{
        setLoader(true)
        try{
            const res=await axios.get(URL+'/api/comments/post/'+id)
            //console.log(res.data)
            setCommentList(res.data)
           // console.log(commentList)
            setLoader(false)
        }
        catch(err){
            console.log(err)
            setLoader(true)
        }
        
      }


    const fetchPostData=async()=>{
        setLoader(true)
        try{
            const res=await axios.get(URL+'/api/posts/post/'+id)
           // console.log(res.data)
            setPostId(res.data._id)
            setTitle(res.data.title)
            setDesc(res.data.desc)
            setPhoto(res.data.photo)
            setUsername(res.data.username)
            setUserId(res.data.userId)
            setCategories(res.data.categories)
            setUpdatedAt(res.data.updatedAt)
            setLoader(false)
            
        }
        catch(err){
            console.log(err)
            setLoader(true)
        }
        
      }
      useEffect(()=>{
        fetchComments()
 },[id])

      useEffect(()=>{
         fetchPostData()
         
      },[id])
      

      const handleComment=()=>{
           axios.post(URL+'/api/comments/create',{comment:comment,author:user.username,postId:id,userId:user._id})
           .then((res)=>{
            // console.log(res.data)
             setComment("")
             fetchComments()
           })
           .catch((err)=>{
            console.log(err)
           })
      }

      const handleEdit=()=>{
        navigate("/edit/"+postId)
      }

      

      

  return (
    <>
        <Navbar/>
        {confirmDelete?<div className='flex items-center justify-center h-screen '>
        <div className='flex flex-col px-20 py-10 border-2 border-gray-500 border-solid md:px-40 md:py-20'>
        <h3 className='text-lg font-bold'>Are you sure?</h3>
        <div className='flex items-center justify-center space-x-4'>
          <button onClick={postDelete} className='px-4 py-2 text-white bg-black'>Yes</button>
          <button onClick={cancelDelete} className='px-4 py-2 text-black bg-white border-2 border-gray-500 border-solid'>No</button>
        </div>
        </div>
      </div>:<div className='px-6 md:px-[200px] mt-8'>
        <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-black md:text-3xl'>{title}</h1>
        {user._id===userId && username===user.username?<div className='flex items-center justify-center space-x-2'>
            <p className='text-xl cursor-pointer' onClick={handleEdit}><BiEdit/></p>
            <p className='text-xl cursor-pointer' onClick={handleDelete}><MdDelete/></p>
        </div>:""}
        </div>
        
        <div className='flex items-center justify-between mt-2 md:mt-4'>
        <p className='text-sm text-gray-400'>@{username}</p>
        <div>
        
        <p className='text-sm text-gray-400'>{updatedAt.slice(0,10)} - {updatedAt.slice(11,16)}</p>
        </div>
        

        </div>
        {!loader?<img src={PF+photo} alt="image" className='w-full mx-auto mt-4'/>:
        <div className='h-[20vh] flex justify-center items-center'>
                <Loader/>
            </div>}
        <p className='mx-auto mt-8'>
         {desc}
        </p>
        <div className='flex items-center mt-8 space-x-4 font-semibold'>
            <p>Categories:</p>
            <div className='flex items-center'>
                {!loader?categories.map((c)=>(
            <p key={c._id} className='flex items-center mr-4 text-gray-400 '>{c}</p>
            )):<div className='mt-8 h-[20vh] flex justify-center items-center'>
                <Loader/>
            </div>}
            </div>
        </div>

        {/* comment section */}
        <div className='flex flex-col mt-4'>
        <p className='mt-6 mb-4 font-semibold'>Comments:</p>

       
        <>
     
            {commentList.map((c)=>(
                <>
              
                <div className='px-2 py-2 mt-2 bg-gray-200 rounded-lg'>
        <div className='flex items-center justify-between'>
        <h3 className='font-bold text-gray-600'>@{c.author}</h3>
        <div className='flex items-center justify-center space-x-4'>
        <p className='text-gray-500'>{c.updatedAt.slice(0,10)} - {c.updatedAt.slice(11,16)}</p>
        { c.author===user.username || user._id===c.userId ?<p className='text-lg cursor-pointer' onClick={()=>deleteComment(c._id)}><MdDelete/></p>:""}
        </div>
        
        </div>
        <p className='px-4 mt-2'>
            {c.comment}
        </p>

        </div>
        </>
            ))} 
        </>
        
        

        {/* write a comment */}
        <div className='flex flex-col mt-4 md:flex-row'>
            <input value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='Write a comment' type="text" className='md:w-[90%] outline-none px-4 mt-4 md:mt-0'/>
            <button className='bg-black text-white px-4 py-2 md:w-[10%] mt-4 md:mt-0' onClick={handleComment}>Add comment</button>
        </div>

        </div>
        
        </div>}
    </>
  )
}

export default PostDetails
