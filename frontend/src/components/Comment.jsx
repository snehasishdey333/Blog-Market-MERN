import { useContext } from 'react'
import {MdDelete} from 'react-icons/md'
import { UserContext } from '../context/UserContext'
import axios from 'axios'

const Comment = ({c}) => {
  const {user}=useContext(UserContext)
  const deleteComment=async(id)=>{
    try{
      await axios.delete(URL+'/api/comments/comment/'+id)
      .then((res)=>{
        console.log('comment deleted')
      })

    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className='bg-gray-200 rounded-lg px-2 py-2 mt-2'>
        <div className='flex justify-between items-center'>
        <h3 className='font-bold text-gray-600'>@{c.author}</h3>
        <div className='flex justify-center items-center space-x-4'>
        <p className='text-gray-500'>{c.updatedAt.slice(0,10)} - {c.updatedAt.slice(11,16)}</p>
        { c.author===user.username || user._id===c.userId ?<p className='text-lg' onClick={()=>deleteComment(c._id)}><MdDelete/></p>:""}
        </div>
        
        </div>
        <p className='mt-2 px-4'>
            {c.comment}
        </p>

        </div>
  )
}

export default Comment
