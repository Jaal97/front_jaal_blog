"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

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
    <div className="h-[77.7vh] bg-gradient-to-bl from-blue-50 to-violet-50 w-full">
      <div className="flex justify-center w-screen  bg-gradient-to-bl from-blue-50 to-violet-50 ">
      <div className="flex  flex-col rounded-xl bg-green-100 bg-clip-border  shadow-md md:w-4/12 lg:w-3/12 p-4 mt-12">
      <h1 className="text-center text-2xl font-bold mb-2">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
      <p className="text-xl font-medium">Username</p>
        <input
          type="text"
          placeholder=""
          name="userName"
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
          className="btn btn-success text-xl font-medium mt-2 mb-2"
        >
          Login
        </button>
      </form>

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
      
    </div>
    </div>
    
  );
};
export default LoginPage;