"use client"

import React from 'react'
import Link from 'next/link';



const PostCard = (props) => {

    let post = props.data;

    return (

        <div className='flex justify-center mt-10'>
            <div className="relative flex max-w-[58rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none flex justify-center">
                    <img
                        className='max-w-[44rem]'
                        src={post.image}
                        alt="imagen post"
                    />
                </div>
                <div className="p-6">
                    <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        {post.title}
                    </h4>
                    <p className="mt-3 block font-sans text-xl font-normal leading-relaxed text-gray-700 antialiased">
                        {post.content}
                    </p>
                </div>
                <div className="flex items-center justify-between p-6">
                    <div className="flex items-center ">
                        <img
                            alt="natali craig"
                            src={post.idUser.image}
                            className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
                            data-tooltip-target="author-1"
                        />
                        <span className='ml-2'>{post.idUser.userName}</span>
                    </div>
                    <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
                        January 10
                    </p>
                </div>
            </div>
        </div>

    )
}

export default PostCard