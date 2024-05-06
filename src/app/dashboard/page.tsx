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
  const [user, setUser] = useState<any>({})
  const [isLoading, setLoading] = useState(true)

  //Abrir o cerrar menu de edicción
  const [isClick, setisClick] = useState(false);
  const toggleEdit = () => {
    setisClick(!isClick)
  }


  //Obteniendo id del usuario
  let idUser = session?.user.id;
  let urlPosts = `${process.env.NEXT_PUBLIC_API_URL}/posts/user/${idUser}`;
  let urlUser = `${process.env.NEXT_PUBLIC_API_URL}/users/${idUser}`;


  const [userUpdate, setUserUpdate] = useState({
    image: "",
    aboutMe: "",
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
    console.log(e.target.name)

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

    const responseAPI = await res.json();
    if (!res.ok) {
      setErrors(responseAPI.message.split(","));
      return;
    }
    location.reload();
  }


//   function is_img(idinputfile){
  
    
   
        
//             var filePath = this.value;
//             var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
//             if(!allowedExtensions.exec(filePath)){
//                 alert('Extensión no permitida. Utiliza: .jpeg/.jpg/.png/.gif.');
//                 fileInput.value = '';
//                 return false;
//             }else{
//                 alert('Extensión correcta.');
//                 return true;
//             }
        
//     });
    
// }


  if (status === "loading") {
    return <div className='flex items-center justify-center h-screen'>
      <div className="border-top-color:transparent w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"></div>
      <p className="ml-2">cargando...</p>
    </div>
  }


  if (isLoading) return <div className='flex items-center justify-center h-screen'>
    <div className="border-top-color:transparent w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"></div>
    <p className="ml-2">cargando...</p>

  </div>
  if (!data) return <p className='bg-gradient-to-bl from-blue-50 to-violet-50 text-xl text-bold text-slate-900 h-screen'>No data</p>


  return (
    <div>
      <div className="bg-gray-100 ">
        <div className="container mx-auto py-8 ">
          <div className="grid grid-cols-4 sm:grid-cols-12  gap-6 px-4 xl:mb-24">
            <div className="col-span-4 md:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">

                  {
                    user.image === "" ?
                      <img src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" className="  bg-gray-300 w-32 h-32 p-1  rounded-full mb-4 shrink-0" alt="profile" />
                      :
                      userUpdate.image === "" ?
            
                        <img 
                        src={session?.user?.image}
                        className="w-32 h-32 p-1 bg-gray-300 rounded-full mb-4 shrink-0"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg";
                        }}
                      />

                        :
                        <img 
                        src={user['image']}
                        className="w-32 h-32 p-1 bg-gray-300 rounded-full mb-4 shrink-0"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg";
                        }}
                      />
                  }

                  {
                    userUpdate.userName === "" ?
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
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex" title="Editar" onClick={toggleEdit}>
                      <img src="https://cdn-icons-png.flaticon.com/512/4226/4226577.png" className="w-8 shrink-0 " alt="edit" />
                    </button>
                    <Link href="/createdpost" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex" title="Nuevo Post">
                      <img src="https://cdn-icons-png.flaticon.com/512/8103/8103784.png" className="w-8 shrink-0 " alt="edit" />

                    </Link>
                  </div>
                </div>
                <div className="flex ">
                  <div className="flex flex-col w-full">
                    <h2 className="text-gray-700 uppercase font-bold tracking-wider mb-2 mt-4 text-xl text-center">Sobre mí</h2>

                    {
                      userUpdate.aboutMe === "" || !isClick ?
                        <p className="text-lg mt-1 ">{user.aboutMe}</p>

                        :
                        <p className=" text-lg mt-1 ">{userUpdate.aboutMe}</p>
                    }
                    <h2 className="text-gray-700 uppercase font-bold tracking-wider mb-2 mt-4 text-xl text-center">Posts</h2>
                    <ul>
                      {
                        data.map(dat => (
                          <Link key={dat['_id']} className="flex hover:text-blue-600 mt-1 text-lg" href={`/post/${dat['_id']}`}>{dat['title']}</Link>
                        ))
                      }
                    </ul>

                  </div>

                </div>

              </div>
            </div>
            <div className="col-span-4 sm:col-span-8 md:col-span-9  w-full">
              <div className="bg-white shadow rounded-lg p-6 flex justify-center ">

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
                  ) : <div className="rounded-md">
                    <img src="https://webescuela.com/wp-content/uploads/2020/07/que-es-un-blog.png" className="rounded-lg" alt="Dashboard image" />

                  </div>
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

