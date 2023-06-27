import {PF} from '../url'


const ProfilePosts = ({post}) => {
    
  return (
    <div className='flex w-full mt-8 space-x-4 '>
    <div className='w-[35%] md:w-[30%] md:h-[200px] h-[200px] flex justify-center items-center'>
        <img src={PF+post.photo} alt="img" className='object-cover w-full h-full'/>
    </div>
    <div className='flex flex-col w-[65%]'>
    <h1 className='mb-1 text-xl font-bold md:mb-2 md:text-2xl'>
    {post.title}
    </h1>
    <div className='flex mb-2 text-sm font-semibold text-gray-500 sp:ace-x-4 md:mb-4'>
        <p className='mr-4'>@{post.username}</p>
        <div className='flex space-x-2 '>
            <p>{post.updatedAt.slice(0,10)}</p>
            <p>{post.updatedAt.slice(11,16)}</p>
        </div>
    </div>
    <p className='text-left md:text-lg'>
    {post.desc.slice(0,200)+" .... Read more"}
    </p>
        
    </div>
      
    </div>
  )
}

export default ProfilePosts
