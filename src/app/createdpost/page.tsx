"use client"

import { useSession } from "next-auth/react";
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";
import { useState } from "react";


const CreatedPost = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setLoading] = useState(true)
  const { data: session } = useSession();
  const [errors, setErrors] = useState<string[]>([]);
  const [idCategory, setIdCategory] = useState<string>("");
  const [idUser, setIdUser] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const router = useRouter();


  let url = `${process.env.NEXT_PUBLIC_API_URL}/categories`
  useEffect(() => {
    fetch(url, {
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

    setIdUser(`${session?.user.id}`)
  }, [idUser, session])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idCategory,
          idUser,
          title,
          image,
          content,
          video
        }),

      }

    );

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(responseAPI.message.split(","));
      return;
    }
    router.push("/");
  };

  if (isLoading) return <p className='bg-gradient-to-bl from-blue-50 to-violet-50 text-xl text-bold text-slate-900' >Loading...</p>
  if (!categories) return <p className='bg-gradient-to-bl from-blue-50 to-violet-50 text-xl text-bold text-slate-900'>No data</p>

  

  return (
    <div className='flex justify-center w-screen  bg-gradient-to-bl from-blue-50 to-violet-50'>
      <div className=" flex  flex-col rounded-xl bg-lime-50 bg-clip-border  shadow-md md:w-2/4 lg:w-1/3 p-4 mt-6">

        <form className="mt-4" onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl font-bold mb-2">Crear Nuevo Post</h1>

          <p className="text-xl font-medium m-2">Titulo</p>
          <input
            type="text"
            placeholder=""
            name="title"
            className="form-control mb-2"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {/* <p className="text-xl font-medium block m-2  text-gray-900">Selecciona la Categoría</p> */}

          <select
            name="Categorias"

            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 fon-medium mt-2 mb-2"
            onChange={(event) => setIdCategory(event.target.value)}>
            <option selected={true} disabled={true}>Selecciona La Categoría</option>
            {

              categories.map(cat => (
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
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
          <p className="text-xl font-medium m-2">Contenido</p>

          <textarea placeholder=" "
            name="content"
            className="form-control mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            value={content}
            onChange={(event) => setContent(event.target.value)}>

          </textarea>
          <p className="text-xl font-medium m-2">Video Relacionado (URL)</p>
          <input
            type=""
            placeholder="https://video9788/66d7dd"
            name="video"
            className="form-control mb-2"
            value={video}
            onChange={(event) => setVideo(event.target.value)}
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
          <button
            type="submit"
            className="btn btn-primary text-xl font-medium mt-2 mb-2"
          >
            Crear
          </button>
        </form>
      </div>
    </div>
  )
}
export default CreatedPost