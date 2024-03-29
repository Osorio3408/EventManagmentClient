import { Mail } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const LostPassword = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-200 px-5 md:px-0">
      <div>
        <img
          src="/logo.webp"
          alt=""
          className="w-[50%] mx-auto relative -top-10"
        />
      </div>
      <div className="max-w-lg w-full h-[500px] border border-neutral-300 bg-slate-50 rounded-md">
        <div className="text-center mt-14 space-y-5">
          <h1 className="text-2xl font-medium text-indigo-800">
            ¿Olvidó su contraseña?
          </h1>
          <p className="px-20 text-left text-neutral-700">
            Introduzca su dirección de correo electrónico por favor. Se le
            enviará un correo de recuperación y podrá elegir una contraseña
            nueva.
          </p>
        </div>
        <form
          action=""
          className="max-w-md md:max-w-sm mt-10 mx-auto flex flex-col gap-y-4 px-5">
          <div className="w-full flex flex-col  gap-y-2">
            <label htmlFor="email" className="text-neutral-800 ">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Ingrese su correo electrónico..."
              className="border border-neutral-400 rounded-md px-2 py-1 outline-neutral-500"
            />
          </div>
          <div className="mx-auto mt-2 max-w-md w-full">
            <button
              to={"/"}
              className="flex items-center text-center justify-center gap-2 font-bold bg-indigo-800 w-full py-2 rounded-md text-white hover:bg-indigo-950">
              <span>
                <Mail />
              </span>
              Enviar correo
            </button>
          </div>
          <div className="mx-auto mt-10">
            <Link
              to={"/SignIn"}
              className="text-sm text-indigo-500 hover:underline ">
              Volver atrás
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
