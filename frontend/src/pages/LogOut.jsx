
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {URL} from '../url'

const LogOut = () => {
  const navigate=useNavigate()

    useEffect(()=>{
       axios.get(URL+'/api/auth/logout')
       .then((res)=>{
        navigate('/login')
       })
       .catch((err)=>{
        console.log(err)
       })
    },[])
  return (
    <div>
      Logout
    </div>
  )
}

export default LogOut
