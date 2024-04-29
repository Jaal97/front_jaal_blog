"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import PostCard from '../../../components/PostCard'
import { useParams, useRouter } from 'next/navigation';

const page = (props) => {

    // const router = useRouter()
    //Para los parametros que llegan por la URL
    const params = useParams()
    let id = params.id;

    let url = `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`;


    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch(url,{
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [params, id])

    if (isLoading) return <p className='bg-gradient-to-bl from-blue-50 to-violet-50 text-xl text-bold text-slate-900'>Loading...</p>
    if (!data) return <p className='bg-gradient-to-bl from-blue-50 to-violet-50 text-xl text-bold text-slate-900'>No data</p>


    return (
        <div>
            <PostCard data={data}/>
        </div>
    )
}

export default page