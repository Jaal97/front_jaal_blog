"use client"

import React from 'react'
import { useParams} from 'next/navigation';
import DeletedPost from '../../../components/DeletedPost'


const page = (props) => {
  const params = useParams()
  let id = params.id;
  console.log(id);

  return (
    <div>
      <DeletedPost id={id} />
    </div>
  )
}

export default page