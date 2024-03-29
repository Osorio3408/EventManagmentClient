import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

export const SignIn = () => {
  const [formData, setFormData] = useState(() => {
    const remember = localStorage.getItem("remember") === "true";
    const savedEmail = localStorage.getItem("email") || "";
    const savedPassword = localStorage.getItem("password") || "";
    return {
      email: savedEmail,
      password: savedPassword,
      remember: remember,
    };
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate("/SignIn");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Guardar el estado del checkbox "Recuérdame" en el almacenamiento local
    if (name === "remember") {
      localStorage.setItem("remember", checked);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.user.token) {
          localStorage.setItem("token", data.user.token);
          if (formData.remember) {
            localStorage.setItem("email", formData.email);
            localStorage.setItem("password", formData.password);
          } else {
            localStorage.removeItem("email");
            localStorage.removeItem("password");
          }
          toast.success(data.message, { theme: "dark" });
          navigate("/");
        } else if (data.error) {
          toast.error(data.error, { theme: "dark" });
        }
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        toast.error("Error al iniciar sesión. Por favor, inténtalo de nuevo.", {
          theme: "dark",
        });
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-neutral-900 px-5 md:px-0 relative">
      <div>
        <img
          src="/logo.webp"
          alt=""
          className="w-[50%] mx-auto relative -top-10"
        />
      </div>
      <div className="max-w-3xl w-full h-[400px] border border-neutral-300 bg-neutral-800 rounded-md ">
        <div className="text-center mt-14">
          <h1 className="text-3xl font-semibold text-gray-100">
            Inicia sesión
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-w-md md:max-w-xs py-10 mx-auto flex flex-col gap-y-4 px-5">
          <div className="flex flex-col gap-y-10 items-center">
            <div className="w-full flex flex-col gap-y-2">
              <label htmlFor="email" className="text-neutral-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-neutral-400 rounded-md px-2 py-1 outline-neutral-500"
              />
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <label htmlFor="password" className="text-neutral-200">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-neutral-400 rounded-md px-2 py-1 outline-neutral-500"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="accent-indigo-900"
            />
            <label htmlFor="remember" className="text-gray-100">
              Recuérdame
            </label>
          </div>
          <div className="mx-auto mt-7">
            <button
              type="submit"
              className="bg-indigo-800 px-10 py-2 rounded-md text-white hover:bg-indigo-950">
              Iniciar sesión
            </button>
          </div>
          {/* <div className="mx-auto">
            <Link
              to={"/LostPassword"}
              className="text-sm text-indigo-500 hover:underline "
            >
              ¿Olvidó su contraseña?
            </Link>
          </div> */}
        </form>
      </div>
    </div>
  );
};
