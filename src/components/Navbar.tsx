"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();



  return (
    <header className="bg-dark">
      <nav className="mx-auto flex max-w-8xl items-center justify-between p-6 lg:px-8">
        <div className="hidden lg:flex lg:gap-x-12 text-white">
          <Link
            href="/"
            className="text-xl hover:text-jaal-line duration-300"
          >
            Home
          </Link>
          <Link
            href="/videojuegos"
            className="text-xl hover:text-jaal-line duration-300"
          >
            Videojuegos
          </Link>
          <Link
            href="/seriesypeliculas"
            className="text-xl hover:text-jaal-line duration-300"
          >
            Series y Películas
          </Link>
          <Link
            href="/tecnologia"
            className="text-xl hover:text-jaal-line duration-300"
          >
            Tecnologia
          </Link>
        </div>
        <div className=" hidden lg:flex lg:flex-1 lg:justify-end lg:ml-10 text-white text-xl">
          {session?.user ? (
            <>
              <div className=" flex " >
                <img src={session?.user?.image} alt="image_profile" className="rounded-circle max-h-10 mr-2" width={40} />
                <span className="text-center mr-4"> {session?.user?.userName}</span>
               
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


      </nav>
    </header>

  );
};
export default Navbar;
