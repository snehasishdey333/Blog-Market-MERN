import axios from 'axios'
import Navbar from '../components/Navbar'
import HomePosts from '../components/HomePosts'
import Loader from '../components/Loader'
import { useState,useEffect } from 'react'
import {URL,PF} from '../url'
import { useContext } from 'react'
import {UserContext} from '../context/UserContext'
import { Link } from 'react-router-dom'

const Home = () => {
  
  const {user}=useContext(UserContext)
  const [posts,setPosts]=useState([])
  const [loader,setLoader]=useState(false)
 
  const fetchPosts=async()=>{
    setLoader(true)
    try{
        const res=await axios.get(URL+'/api/posts/all/')
        setPosts(res.data)
        setLoader(false)
    }
    catch(err){
      setLoader(true)
        console.log(err)
    }
}

  useEffect(()=>{
    fetchPosts()
  },[])
  return (
    <>
      <Navbar/>
      <div className='md:px-[200px] px-8'>
       
      {!loader?posts.map((post)=>(
        <>
        <Link to={user?`/posts/post/${post._id}`:"/login"}>
        <HomePosts key={posts._id} post={post} />
        </Link>
        </>
        
      )) : 
        <div className='h-screen flex justify-center items-center'>
        <Loader/>
        </div>
      }
      
      </div>
      
      
    </>
  )
}

export default Home
