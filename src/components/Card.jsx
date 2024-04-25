import React from 'react'
import Link from 'next/link';


const Card = (props) => {

    let post = props.post
    // console.log(post);
    return (
        <>
            {/* <div className="bg-gradient-to-bl from-blue-50 to-violet-50 flex items-center justify-center lg:h-screen">
                <div className="container mx-auto p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4"> */}
                        <Link href={`post/${post._id}`} post={post}>
                            
                            <div className="bg-white rounded-lg border p-4">
                                <img src={post.image} alt="Placeholder Image" className="w-full h-48 rounded-md object-cover" />
                                <div className="px-1 py-4">
                                    <div className="font-bold text-xl mb-2">{post.title}</div>
                                    <p className='text-gray-900 text-sm mb-2'>Por: {post.idUser.userName}</p>
                                    <p className="text-gray-700 text-base">
                                        {post.content.slice(0, 50)}...
                                    </p>
                                </div>
                                <div className="px-1 py-4">
                                    <a href="#" className="text-blue-500 hover:underline">Leer más</a>
                                </div>
                            </div>
                        </Link>

            {/* </div>
                </div>
            </div> */}
        </>
    )
}

export default Card