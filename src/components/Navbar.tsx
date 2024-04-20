"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link
          href="/"
          className="btn btn-primary btn-sm"
        >
          Home
        </Link>
        <Link
          href="/categories/:id"
          className="btn btn-primary btn-sm"
        >
          Videojuegos
        </Link>
        <Link
          href="/categories/:id"
          className="btn btn-primary btn-sm"
        >
          Series y Películas
        </Link>
        <Link
          href="/categories/:id"
          className="btn btn-primary btn-sm"
        >
          Tecnologia
        </Link>


        {session?.user ? (
          <>
            {/* <picture>
            <img src="https://i.pinimg.com/564x/a4/4a/6d/a44a6dcb281f73a187d68f42d09a0c96.jpg" alt="image_profile" className="img-circle" width={100}/>
             
          </picture> */}
            <div className="text-white d-flex" >
              <img src={session?.user?.image} alt="image_profile" className="rounded-circle mr-2" width={35} />
              {session?.user?.userName}
            </div>
            <Link
              href="/dashboard"
              className="btn btn-primary btn-sm"
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="btn btn-danger btn-sm"
            >
              Signout
            </button>
          </>

        ) : (
          <>
            <Link
              href="/login"
              className="btn btn-primary btn-sm"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn btn-primary btn-sm"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
