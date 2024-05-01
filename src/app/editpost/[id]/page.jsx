"use client"

import React from 'react'
import { useParams, useRouter } from 'next/navigation';
// import UpdatedPost from '../../../components/UpdatedPost.jsx';
// import UpdatedPost from '@/components/UpdatedPost';
import UpdatedPost from '../../../components/UpdatedPost'

const page = (props) => {
  const params = useParams()
  let id = params.id;

  
  console.log(id)
  return (
    <div>
      <UpdatedPost id={id} isUp={true}/>
    </div>
  )
}

export default page