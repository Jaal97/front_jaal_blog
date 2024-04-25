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
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data</p>


    return (
        <div>
            <PostCard data={data}/>
        </div>
    )
}

export default page