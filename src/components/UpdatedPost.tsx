"use client"

import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react'
// import Link from "next/link";
import { useRouter } from "next/navigation";

const UpdatedPost = (props: any) => {

    //obtener la id del post y saber si es actualizar o crear
    const idPost = props.id;
    const isUp = props.isUp;

    //router
    const router = useRouter();


    //Obtener las categorias
    const [categories, setCategories] = useState([]);
    let urlCategories = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

    //Obtener todo el Post


    const [isLoading, setLoading] = useState(true);

    //url para enviar la petición get
    const urlPost = `${process.env.NEXT_PUBLIC_API_URL}/posts/${idPost}`;

    //extraer id del usuario
    const { data: session } = useSession();
    const [idAutenticado, setIdAutenticado] = useState("");

    // const [data, setData] = useState([]);
    const [errors, setErrors] = useState([]);

    const [postUpdate, setPostUpdate] = useState({
        idCategory: "",
        idUser: "",
        title: "",
        image: "",
        content: "",
        video: "",
    });

    const [post, setPost] = useState({
        idCategory: "",
        idUser: "",
        title: "",
        image: "",
        content: "",
        video: "",
    });


    useEffect(() => {
        fetch(urlCategories, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCategories(data)
                setLoading(false)
            })

        if (isUp) {
            fetch(urlPost, {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => res.json())
                .then((post) => {
                    setPostUpdate(
                        {
                            idCategory: post.idCategory._id,
                            idUser: post.idUser._id,
                            title: post.title,
                            image: post.image,
                            content: post.content,
                            video: post.video,

                        })
                    setPost({
                        idCategory: post.idCategory,
                        idUser: post.idUser,
                        title: post.title,
                        image: post.image,
                        content: post.content,
                        video: post.video,
                    })
                    setLoading(false)
                })
        }

        setIdAutenticado(`${session?.user.id}`)
        postUpdate['idUser'] = idAutenticado;
    }, [idAutenticado, session])


    const handleChange = (e: any) => {
        setPostUpdate({ ...postUpdate, [e.target.name]: e.target.value })
    };


    const handleSubmit = async (event: any) => {

        event.preventDefault();
        setErrors([]);

        if (isUp) {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/posts/${idPost}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        postUpdate
                    ),
                }

            );
            
            const responseAPI = await res.json();
            if (!res.ok) {
                setErrors(responseAPI.message.split(","));
                return;
            }
            router.push('/')
        }

        if (!isUp) {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/posts`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        postUpdate
                    ),

                }

            );

            const responseAPI = await res.json();
            if (!res.ok) {
                setErrors(responseAPI.message.split(","));
                return;
            }
            router.push('/')
        }



    }

    //Filtro de categorias 
    let catFilter = categories.filter(category => category._id != postUpdate.idCategory);


    if (isLoading) return <p className='bg-gradient-to-bl from-blue-50 to-violet-50 text-xl text-bold text-slate-900 h-[77.7vh]' >Loading...</p>
    if (!postUpdate) return <p className='bg-gradient-to-bl from-blue-50 to-violet-50 text-xl text-bold text-slate-900 h-[77.7vh]'>No data</p>


    // console.log(errors)

    return (
        <div className='flex justify-center w-screen  bg-gradient-to-bl from-blue-50 to-violet-50 h-[77.7vh]'>
            <div className=" flex  flex-col rounded-xl bg-lime-50 bg-clip-border  shadow-md md:w-2/4 lg:w-1/3 p-4 mt-6 mb-6">
                <form className="mt-4" onSubmit={handleSubmit}>
                    {
                        isUp

                            ? <h1 className="text-center text-2xl font-bold mb-2"> Actualizar Post </h1>

                            : <h1 className="text-center text-2xl font-bold mb-2"> Crear Nuevo Post </h1>
                    }
                    <p className="text-xl font-medium m-2">Titulo</p>
                    <input
                        type="text"
                        placeholder=""
                        name="title"
                        className="form-control mb-2"
                        onChange={handleChange}
                        value={postUpdate.title}
                    />
                    {/* <p className="text-xl font-medium block m-2  text-gray-900">Selecciona la Categoría</p> */}

                    <select
                        name="Categorias"

                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 fon-medium mt-2 mb-2"
                        // onChange={handleChange}
                        onChange={(event) => postUpdate.idCategory = event.target.value}
                    >
                        {
                            isUp
                                ? <option selected={true} value={post.idCategory._id}>{post.idCategory.name}</option>
                                : <option selected={true} disabled={true}>Selecciona La Categoría</option>
                        }

                        {
                            isUp


                                ? catFilter.map(cat => (
                                    <option key={cat['_id']} value={cat['_id']}>{cat['name']} </option>
                                ))

                                : categories.map(cat => (
                                    <option key={cat['_id']} value={cat['_id']}>{cat['name']} </option>

                                ))
                        }
                    </select>

                    <p className="text-xl font-medium m-2">Imagen (URL)</p>
                    <input
                        type="text"
                        placeholder="https://image4566.jpg"
                        name="image"
                        className="form-control mb-2"
                        onChange={handleChange}
                        value={postUpdate.image}
                    />
                    <p className="text-xl font-medium m-2">Contenido</p>

                    <textarea placeholder=" "
                        name="content"
                        className="form-control mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        onChange={handleChange}
                        value={postUpdate.content}>

                    </textarea>
                    <p className="text-xl font-medium m-2">Video Relacionado (URL)</p>
                    <input
                        type=""
                        placeholder="https://video9788/66d7dd"
                        name="video"
                        className="form-control mb-2"
                        onChange={handleChange}
                        value={postUpdate.video}
                    />
                    <div>
                        {errors.length > 0 && (
                            <div className="alert alert-danger mt-2">
                                <ul className="mb-0">
                                    {errors.map((error) => (
                                        <li key={error}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    {
                        isUp
                            ? <button
                                type="submit"
                                className="btn btn-primary text-xl font-medium mt-2 mb-2 text-white"
                            >
                                Actualizar
                            </button>

                            : <button
                                type="submit"
                                className="btn btn-success text-xl font-medium mt-2 mb-2 text-white"
                            >
                                Crear
                            </button>
                    }
                </form>
            </div>
        </div>
    )
}

export default UpdatedPost