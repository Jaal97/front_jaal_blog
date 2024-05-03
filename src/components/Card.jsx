import React from 'react'
import Link from 'next/link';


const Card = (props) => {

    let post = props.post
    return (
        <>
            <Link href={`post/${post._id}`} post={post}>

                <div className="bg-white rounded-lg border p-4">
                    {
                        !post.image || post.image === null

                            ? <img
                                className="w-full h-48 rounded-md object-cover "
                                src="https://ticsluishurtadoconta.files.wordpress.com/2015/12/recursos-blogs.jpg"
                                alt="imagen post"
                            />

                            : <img
                                className="w-full h-48 rounded-md object-cover"
                                src={post.image}
                                alt="imagen post"
                            />
                    }
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
        </>
    )
}

export default Card