"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect, ChangeEvent } from 'react'
import Link from "next/link";
// import { useRouter } from "next/navigation";


const Dashboard = () => {

  const { data: session, status } = useSession();
  const [errors, setErrors] = useState<string[]>([]);
  // const router = useRouter();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({})
  const [isLoading, setLoading] = useState(true)

  const [isClick, setisClick] = useState(false);
  const toggleNavbar = () => {
    setisClick(!isClick)
  }



  let idUser = session?.user.id;
  let urlPosts = `${process.env.NEXT_PUBLIC_API_URL}/posts/user/${idUser}`;
  let urlUser = `${process.env.NEXT_PUBLIC_API_URL}/users/${idUser}`;


  const [userUpdate, setUserUpdate] = useState({
    image: "",
    aboutMe: " ",
    userName: ""
  });




  useEffect(() => {
    fetch(urlUser, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((user) => {
        setUser(user)
        setLoading(false)
      })


    fetch(urlPosts, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })

  }, [urlPosts, urlUser])


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserUpdate({ ...userUpdate, [e.target.name]: e.target.value })
  };

  useEffect(() => {
    setUserUpdate({
      image: user.image,
      aboutMe: user.aboutMe,
      userName: user.userName
    })
  }, [isClick, idUser])


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${session?.user?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userUpdate),
      }

    );


    fetch(urlUser, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((user) => {
        setUser(user)
        setLoading(false)
      })

    location.reload();
    // router.push('/');
    // router.refresh();
    const responseAPI = await res.json();
    if (!res.ok) {
      setErrors(responseAPI.message.split(","));
      return;
    }
  }



  if (status === "loading") {
    return <p className='bg-gradient-to-bl from-blue-50 to-violet-50 text-xl text-bold text-slate-900'>Loading...</p>;
  }


  if (isLoading) return <p className='bg-gradient-to-bl from-blue-50 to-violet-50 text-xl text-bold text-slate-900'>Loading...</p>
  if (!data) return <p className='bg-gradient-to-bl from-blue-50 to-violet-50 text-xl text-bold text-slate-900'>No data</p>


  return (
    <div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">

                  {
                    user.image === "" ?
                      <img src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" className="  bg-gray-300 w-32 h-32 p-1  rounded-full mb-4 shrink-0" alt="profile" />
                      :
                      userUpdate.aboutMe === "" ?
                        <img src={session?.user?.image} className="w-32 h-32 p-1 bg-gray-300 rounded-full mb-4 shrink-0">

                        </img>

                        :
                        <img src={user['image']} className=" bg-gray-300 w-32 h-32 p-1  rounded-full mb-4 shrink-0">

                        </img>
                  }

                  {

                    userUpdate.aboutMe === "" ?
                      <h1 className="text-xl font-bold">
                        {session?.user?.userName}
                      </h1>

                      :
                      <h1 className="text-xl font-bold">
                        {user['userName']}
                      </h1>

                  }

                  <p className="text-gray-700 text-md uppercase">{user?.role}</p>

                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={toggleNavbar}>Editar</button>
                    <Link href="/createdpost" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">New Post</Link>
                  </div>
                </div>
                <div className="flex w-full">
                  <div className="flex flex-col w-6/12">
                    <h2 className="text-gray-700 uppercase font-bold tracking-wider mb-2 mt-4 text-xl">Posts</h2>
                    <ul>
                      {
                        data.map(dat => (
                          <Link key={dat['_id']} className="flex hover:text-blue-600 mt-1 text-lg" href={`/post/${dat['_id']}`}>{dat['title']}</Link>
                        ))
                      }
                    </ul>

                  </div>
                  <div className="flex flex-col w-6/12">
                    <h2 className="text-gray-700 uppercase font-bold tracking-wider mb-2 mt-4 text-xl">About Me</h2>

                    {
                      userUpdate.aboutMe === "" || !isClick ?
                        <p className="text-lg mt-1 ">{user.aboutMe}</p>

                        :
                        <p className=" text-lg mt-1 ">{userUpdate.aboutMe}</p>
                    }

                  </div>
                </div>

              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6 flex justify-center w-full">


                {
                  isClick ? (
                    <form className="mt-20 xl:w-3/5" onSubmit={handleSubmit} >
                      <h1 className="text-center text-2xl font-bold mb-2 text-blue-600">Actualiza Tu Información</h1>
                      <p className="text-xl font-medium">Imagen (URL)</p>
                      <input
                        type="text"
                        placeholder="https://image.jpg"
                        name="image"
                        className="form-control mb-2"
                        onChange={handleChange}
                        value={userUpdate.image}
                      />

                      <p className="text-xl font-medium">Sobre mi</p>

                      <textarea placeholder=" "
                        name="aboutMe"
                        className="form-control mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        onChange={handleChange}
                        value={userUpdate.aboutMe}
                      >

                      </textarea>

                      <p className="text-xl font-medium">Nombre de usuario (Debe ser unico)</p>
                      <input
                        type="text"
                        placeholder="Jmin16"
                        name="userName"
                        className="form-control mb-2"
                        onChange={handleChange}
                        value={userUpdate.userName}
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
                      <p className=" text-lg text-green-600">*Ahora este sera tu nuevo Username al iniciar sesión</p>

                      <button
                        type="submit"
                        className="btn btn-primary text-xl font-medium mt-2 mb-2"
                      >
                        Actualizar
                      </button>
                    </form>
                  ) : <p></p>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

