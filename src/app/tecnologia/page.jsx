import React from 'react'
import Posts from '../posts/page';

const page = () => {
  return (
    <div>
         <Posts url={`${process.env.NEXT_PUBLIC_API_URL}/posts/categories/65f50aa1f8fb3d3907bec444`} limite={10}/>
    </div>
  )
}

export default page