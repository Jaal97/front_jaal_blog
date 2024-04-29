"use client";

import Posts from './posts/page';


const HomePage = () => {
  return (
    <div>
      <Posts url={`${process.env.NEXT_PUBLIC_API_URL}/posts`} limite={4}/>
    </div>
  )
}


export default HomePage