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
        fetch(url, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [params, id])

    if (isLoading) {
        return <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className="border-top-color:transparent w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"></div>
            <p className="ml-2">cargando...</p>
        </div>
    }

    
    if (!data) return <p className='bg-gradient-to-bl from-blue-50 to-violet-50 text-xl text-bold text-slate-900 h-[77.7vh]'>No data</p>


    return (
        <div>
            <PostCard data={data} />
        </div>
    )
}

export default page