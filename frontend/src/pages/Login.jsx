
import { Link } from "react-router-dom"
import {useState,useContext} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import {URL} from '../url'

const Login = () => {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false)
  const {setUser}=useContext(UserContext)
  const navigate=useNavigate()
   
const handleLogin=async (e)=>{
   e.preventDefault()
   setError(false)
   try{
    const res=await axios.post(URL+"/api/auth/login",{email,password})
  //  console.log(res.data)
    setUser(res.data)
    navigate('/')

   }
   catch(err){
    setError(true)
    console.log(err)
   }

}

// async function handleLogin(ev) {
//     ev.preventDefault();
//     const response = await fetch(URL+'/api/auth/login', {
//       method: 'POST',
//       body: JSON.stringify({email, password}),
//       headers: {'Content-Type':'application/json'},
//       credentials: 'include',
//     });
//     if (response.ok) {
//       response.json().then(userInfo => {
//         // console.log(userInfo)
//         setUser(userInfo);
//         navigate('/')
//       });
//     } else {
//       alert('wrong credentials');
//     }
//   }

  return (
    <>
    
    <div className='w-full px-8 py-4 text-left bg-black md:px-[200px] flex justify-between items-center'>
      <div className='text-lg font-bold text-white cursor-pointer md:text-xl '><Link to="/">MyBlog</Link></div>
      <div className='text-lg text-white'><Link to="/register">Register</Link></div>
    </div>
    <div className='w-full mx-auto flex-col justify-center items-center h-[60vh] mt-40 space-y-6'>
        <div className='w-[80%] md:w-[25%] flex flex-col justify-center items-center space-y-4 mx-auto'>
        <h1 className='text-xl font-bold text-left'>Log In with your account</h1>
          <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Enter your email' className='w-full px-4 py-2 border-2 border-black outline-0'/>
          <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter your password' className='w-full px-4 py-2 border-2 border-black outline-0'/>
          <button  className='w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black' onClick={handleLogin}>Log In</button>
          <div className='flex items-center justify-center space-x-2'>
           <p className='text-sm text-black'>New here?</p>
           <p className="font-semibold text-black sm text-"><Link to="/register" >Register</Link></p>
          </div>
          
        </div>
        <div>{error?<p className='mt-4 text-lg font-bold text-center text-red-600'>something went wrong!</p>:""}</div>
        <div><p className="px-8 pt-8 text-sm text-center text-black md:px-0">By signing in or creating an account, you agree with our <span className='text-gray-500 sm text-'>Terms & Conditions</span> and <span className='text-gray-500 sm text-'>Privacy Statement</span></p>
          <p className="px-8 text-sm text-center text-black md:px-0">All rights reserved.
Copyright (2006-2023) – MyBlog.com™</p></div>
    </div>
    

    </>
   
  )
}

export default Login
