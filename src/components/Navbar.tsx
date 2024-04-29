"use client";

import { signOut, useSession, } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from 'react'


const Navbar = () => {
  const { data: session } = useSession();
  const [isClick, setisClick] = useState(false);
  const toggleNavbar = () => {
    setisClick(!isClick)
  }

  const [isLoading, setLoading] = useState(true)
  const [user, setUser] = useState({
  
  })

  let idUser = session?.user.id;
  let urlUser = `${process.env.NEXT_PUBLIC_API_URL}/users/${idUser}`;


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
  }, [idUser, urlUser])


  // if (isLoading) return <p className='bg-gradient-to-bl from-blue-50 to-violet-50 text-xl text-bold text-slate-900'>Loading...</p>
  

  return (

    <header className="">
      <nav className="mx-auto flex max-w-8xl items-center justify-between p-6 lg:px-8 bg-dark">
        <div className="hidden lg:flex lg:gap-x-12 text-white">
          <Link
            href="/"
            className="text-xl hover:text-lime-500 duration-300"
          >
            Home
          </Link>
          <Link
            href="/videojuegos"
            className="text-xl hover:text-lime-500 duration-300"
          >
            Videojuegos
          </Link>
          <Link
            href="/seriesypeliculas"
            className="text-xl hover:text-lime-500 duration-300"
          >
            Series y Películas
          </Link>
          <Link
            href="/tecnologia"
            className="text-xl hover:text-lime-500 duration-300"
          >
            Tecnologia
          </Link>
        </div>

        <span className='text-3xl cursor-pointer lg:hidden mx-2 block'>
          <button onClick={toggleNavbar}>
            {isClick ? (
              <svg className="h-6 w-6 text-white border-black mb-3"
                xmlns="http://www.w3.org/2000/svg"

                fill="none"

                viewBox="0 0 24 24"

                stroke="currentColor" >

                <path

                  strokeLinecap="round"

                  strokeLinejoin="round"

                  strokeWidth={2}

                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-white"

                xmlns="http://www.w3.org/2000/svg"

                fill="none"

                viewBox="0 0 24 24"

                stroke="currentColor">

                <path

                  strokeLinecap="round"

                  strokeLinejoin="round"

                  strokeWidth={2}

                  d="M4 6h16M4 12h16m-7 6h7" />

              </svg>

            )}
          </button>
        </span>
        <div className=" hidden lg:flex lg:flex-1 lg:justify-end lg:ml-10 text-white text-xl">
          {session?.user ? (
            <>
              <div className=" flex " >
                {
                  user.image === "" ?
                  <img src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"  className="  bg-gray-300 inline-block h-10 w-10 rounded-full ring-1 ring-dark mr-2" alt="profile" />
                  :
                  <img src={user.image} alt="image_profile" className="  bg-gray-300 inline-block h-10 w-10 rounded-full ring-1 ring-dark mr-2" width={40} />

                }
                
                <span className="text-center mr-4"> {user.userName}</span>

              </div>
              <Link
                href="/dashboard"
                className="btn btn-success btn-sm mr-4 max-w-24 text-lg  text-center"
              >
                Mi Perfil
              </Link>
              <button
                onClick={() => signOut()}
                className="btn btn-danger btn-sm  max-w-24 text-lg text-justify "
              >
                Sign Out
              </button>

            </>

          ) : (
            <>

              <Link
                href="/login"
                className="btn btn-success btn-sm mr-4 text-lg"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-primary btn-sm text-lg"
              >
                Register
              </Link>


            </>
          )}
        </div>
        {isClick && (
          <div className='lg:hidden '>
            <div className=" lg:flex z-20 lg:items-center  lg:static absolute  w-full left-0 lg:w-auto lg:py-0 py-4 lg:pl-0 pl-7 opacity-82 lg:opacity-100 top[-400px] transition-all ease-in duration-1000 bg-slate-50  text-white text-xl ">
              {session?.user ? (
                <>
                  <div className=" flex mb-2 text-slate-900" >

                    {
                      user.image === "" ?
                        <img src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" className="  bg-gray-300 inline-block h-10 w-10 rounded-full ring-1 ring-dark mr-2" alt="profile" />
                      :
                      <img src={user.image} alt="image_profile" className="bg-gray-300 inline-block h-10 w-10 rounded-full ring-1 ring-dark mr-2" width={32} />
                    }

                   
                    <span className="text-center mr-4"> {user.userName}</span>

                  </div>
                  <button onClick={toggleNavbar}>
                    <Link
                      href="/dashboard"
                      className="btn btn-success btn-sm mr-4 max-w-24 text-lg  text-center"
                    >
                      Mi Perfil
                    </Link>
                  </button>

                  <button

                    onClick={() => signOut()}
                    className="btn btn-danger btn-sm  max-w-24 text-lg text-justify "
                  >
                    <button onClick={toggleNavbar}>
                      Sign Out
                    </button>

                  </button>

                </>

              ) : (
                <>
                  <button onClick={toggleNavbar}>
                    <Link
                      href="/login"
                      className="btn btn-success btn-sm mr-4 text-lg"
                    >
                      Login
                    </Link>
                  </button>

                  <button onClick={toggleNavbar}>
                    <Link
                      href="/register"
                      className="btn btn-primary btn-sm text-lg"
                    >
                      Register
                    </Link>

                  </button>
                </>
              )}
            </div>
            <ul className='text-slate-950 z-10 lg:flex lg:items-center  lg:static absolute  w-full left-0 lg:w-auto lg:py-0 py-4 lg:pl-0 pl-7 top[-400px] transition-all ease-in duration-1000  bg-slate-50 mt-20'>

              <li className='mx-4 my-6 lg:my-0'>
                <Link className='text-xl hover:text-lime-600 duration-400 ' href="/">
                  <button onClick={toggleNavbar}>
                    Home
                  </button>
                </Link>
              </li>
              <li className='mx-4 my-6 md:my-0'>
                <Link className='text-xl hover:text-lime-600 duration-400' href="/videojuegos">
                  <button onClick={toggleNavbar}>
                    Videojuegos
                  </button>
                </Link>
              </li>
              <li className='mx-4 my-6 lg:my-0'>
                <Link className='text-xl hover:text-lime-600 duration-400' href="/seriesypeliculas">
                  <button onClick={toggleNavbar}>
                    Series y Películas
                  </button>
                </Link>
              </li>
              <li className='mx-4 my-6 lg:my-0'>
                <Link className='text-xl hover:text-lime-600 duration-400' href="/tecnologia">
                  <button onClick={toggleNavbar}>
                    Tecnologia
                  </button>
                </Link>
              </li>
              {/* <button className='bg-cyan-500 text-white font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-cyan-400 rounded'>
                            Get Started
                        </button> */}
            </ul>

          </div>
        )}

      </nav>
    </header>

  );
};
export default Navbar;
