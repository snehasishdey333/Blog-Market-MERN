import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {PF} from '../url'
import { UserContext } from '../context/UserContext'
import {BiUserCircle} from 'react-icons/bi'

const Navbar = () => {
  const {user}=useContext(UserContext)
  return (
    <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
      <h1 className='text-xl font-extrabold'><Link to="/">Blog Market</Link></h1>
      <div className='flex items-center justify-center space-x-4 md:space-x-8'>
       {user?<h3 className='text-lg'><Link to="/write">Write</Link></h3>:""}
       {user? <Link to={"/profile/"+user._id}><div className='flex items-center justify-center space-x-2 cursor-pointer md:space-x-3'>
       
       {user?<div className='flex items-center justify-center bg-black rounded-full'>
          <img src={PF+user.profilePic} alt="pic" className='w-6 h-6 rounded-full'/>
       </div>:
       <p className='text-lg md:text-xl'><BiUserCircle/></p>}
        <h3 className='text-lg'>{user.username}</h3>
       
       
       </div> </Link>: <h3 className='text-lg'><Link to="/login">Log in</Link></h3>}
       {user? <h3 className='text-lg'><Link to="/logout">Log out</Link></h3> : <h3 className='text-lg'><Link to="/register">Register</Link></h3>}
      </div>
    </div>
  )
}

export default Navbar
