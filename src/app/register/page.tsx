"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [image, setImage] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

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
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <p>Imagen</p>
        <input
          type="text"
          placeholder="https://image.jpg"
          name="image"
          className="form-control mb-2"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />
        <p>Nombre de usuario</p>
        <input
          type="text"
          placeholder="test"
          name="userNAme"
          className="form-control mb-2"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        Contraseña
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
          className="btn btn-primary"
        >
          Register
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
  );
};
export default RegisterPage;