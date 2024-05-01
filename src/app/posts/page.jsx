"use client"

import { useState, useEffect } from 'react'
import Card from '@/components/Card'


function Posts(props) {
  let url = props.url;
  let lim = props.limite;

  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [url, lim])

  if (isLoading) return <p className='bg-gradient-to-bl from-blue-50 to-violet-50 text-xl text-bold text-slate-900'>Loading...</p>
  if (!data) return <p className='bg-gradient-to-bl from-blue-50 to-violet-50 text-xl text-bold text-slate-900'>No data</p>

 
  
  return (

    <div className="bg-gradient-to-bl from-blue-50 to-violet-50 flex items-center justify-center ">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {typeof data === "object"

            ?
            data.toReversed().slice(0, lim).map(dat => (
              <Card post={dat} key={dat._id} />
            ))
            : <Card post={data} key={data._id} />

          }
        </div>
      </div>
    </div>
  )
}

export default Posts