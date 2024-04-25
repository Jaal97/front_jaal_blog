import React from 'react'
import Posts from '../posts/page';

const page = () => {
  return (
    <div>
         <Posts url={`${process.env.NEXT_PUBLIC_API_URL}/posts/categories/65f50a56f8fb3d3907bec43e`} limite={10}/>
    </div>
  )
}

export default page