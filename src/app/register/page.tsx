"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = (props:any) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [image, setImage] = useState<string>("");
  const [aboutMe, setAboutMe] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  let user = props.user;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          aboutMe,
          userName,
          password,
        }),
      }
    );

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(responseAPI.message);
      return;
    }

    const responseNextAuth = await signIn("credentials", {
      userName,
      password,
      redirect: false,
    });


    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className='flex justify-center w-screen  h-[77.7vh] bg-gradient-to-bl from-blue-50 to-violet-50'>
      <div className=" flex  flex-col rounded-xl bg-sky-50 bg-clip-border  shadow-md md:w-4/12 lg:w-3/12 p-4 mt-10 mb-10">

        <form className="mt-4" onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl font-bold mb-2">Registrate</h1>
          <p className="text-xl font-medium">Imagen (URL)</p>
          <input
            type="text"
            placeholder="https://image.jpg"
            name="image"
            className="form-control mb-2"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />

          <p className="text-xl font-medium">Sobre mi</p>
          <textarea placeholder=" "
            name="aboutMe"
            className="form-control mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            value={aboutMe}
            onChange={(event) => setAboutMe(event.target.value)}>

          </textarea>

          <p className="text-xl font-medium">Nombre de usuario (Debe ser unico)</p>
          <input
            type="text"
            placeholder="Jmin16"
            name="userNAme"
            className="form-control mb-2"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
          <p className="text-xl font-medium">Contraseña</p>
          <input
            type="password"
            placeholder="*****"
            name="password"
            className="form-control mb-2"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary text-xl font-medium mt-2 mb-2"
          >
            Registrarse
          </button>
        </form>


        {errors.length > 0 && (
          <div className="alert alert-danger mt-2">
            <ul className="mb-0">
              {errors}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default RegisterPage;