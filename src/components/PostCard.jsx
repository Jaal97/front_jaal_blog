"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useSession } from "next-auth/react";


const PostCard = (props) => {

    const { data: session } = useSession();
    const [user, setUser] = useState({})
    let post = props.data;


    //Verificar usuario y autor del post
    let idSession = session?.user?.id;
    let idAutor = post.idUser._id;



    //Obteniendo id del usuario
    let idUser = session?.user.id;
    let urlUser = `${process.env.NEXT_PUBLIC_API_URL}/users/${idUser}`;

    //Obtener todos los datos del usuario autenticado para ver sus permisos
    useEffect(() => {
        fetch(urlUser, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((user) => {
                setUser(user)
            })


    }, [urlUser])


    let rol = user.role;


    return (

        <div className='flex justify-center bg-gradient-to-bl from-blue-50 to-violet-50'>
            <div className="relative flex max-w-[58rem] flex-col rounded-xl bg-white bg-clip-border  shadow-md mt-10 mb-10">
                <div className="relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none flex justify-center w-full">
                    {
                        !post.image || post.image === null

                            ? <img
                                className=' sm:w-3/4 md:w-3/4 h-auto'
                                src="https://ticsluishurtadoconta.files.wordpress.com/2015/12/recursos-blogs.jpg"
                                alt="imagen post"
                            />

                            : <img
                                className=' sm:w-3/4 md:w-3/4 h-auto'
                                src={post.image}
                                alt="imagen post"
                            />
                    }
                </div>
                <div className='flex  justify-between mt-4 pr-6 pl-6'>

                    {
                        idSession === idAutor || rol === "admin"
                            ? <div className=''>
                                <Link href={`/editpost/${post._id}`} className='bg-green-500 w-6  h-2 p-2.5 text-white rounded-md'>Editar</Link>
                            </div>
                            : <p></p>
                    }

                    {
                        rol === "admin"
                            ? <div className=''>
                                <Link href={`/elimpost/${post._id}`} className='bg-red-600 w-6  h-2 p-2.5 text-white rounded-md'>Eliminar</Link>
                            </div>
                            : <p></p>
                    }
                </div>
                <div className="p-6 ">
                    <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased text-center">
                        {post.title}
                    </h4>
                    <div >
                        <p className="mt-3 block font-sans text-xl font-normal leading-relaxed text-gray-700 antialiased text-justify">
                            {post.content}
                        </p>
                    </div>

                </div>

                <div className='flex pr-6 pl-6  justify-center'>
                    <Link href={post.video} className='mt-2 underline text-sky-900 text-xl ' target="_blank">

                        Video Relacionado

                    </Link>
                </div>

                <div className="flex items-center justify-between pr-6 pl-6 mb-4">

                    <div className="flex items-center ">
                        <img
                            alt="imagen autor"
                            src={post.idUser.image}
                            className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
                            data-tooltip-target="author-1"
                        />
                        <span className='ml-2 text-lg'>{post.idUser.userName}</span>
                    </div>

                    <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased ">
                        {post.idUser.createdAt.slice(0, -14)}
                    </p>
                </div>
            </div>
        </div>

    )
}

export default PostCard