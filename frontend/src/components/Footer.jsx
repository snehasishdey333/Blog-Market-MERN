import React from 'react'

const Footer = () => {
  return (
    <>
        <div className='mt-8 w-full bg-black md:px-[500px] px-8 flex justify-between text-sm md:text-md py-8 md:mt-8'>
    <div className='flex flex-col text-white'>
        <p>Featured Blogs</p>
        <p>Most viewed</p>
        <p>Readers choice</p>
    </div>
    
    <div className='flex flex-col text-white'>
        <p>Most engaging</p>
        <p>Recent Posts</p>
    </div>
    
    <div className='flex flex-col text-white'>
        <p>Privacy Policy</p>
        <p>About us</p>
        <p>Terms & Conditions</p>
        <p>Terms & Services</p>
    </div>
      
    </div>
    <p className='py-2 pb-2 text-center text-white bg-black'>All rights reserved @2023</p>
    </>
    
  )
}

export default Footer
