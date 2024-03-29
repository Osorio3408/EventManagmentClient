import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CreateGroup = () => {
  const [limit, setLimit] = useState(false);
  const [data, setData] = useState({ title: "", description: "" });
  const [users, setUsers] = useState([]);
  const [selectsUsers, setSelectsUsers] = useState([]);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/NewGroup");
    } else {
      navigate("/SignIn");
    }
  }, []);

  const dataUsers = [
    {
      name: "Carlos",
      documentNumber: 4088574,
      email: "carlos@gmail.com",
    },
    {
      name: "Rosio",
      documentNumber: 345574,
      email: "rosio@gmail.com",
    },
    {
      name: "Miguel",
      documentNumber: 4284587,
      email: "miguel@gmail.com",
    },
    {
      name: "Paula",
      documentNumber: 6747362,
      email: "paula@gmail.com",
    },
    {
      name: "Luisa",
      documentNumber: 4124213,
      email: "luisa@gmail.com",
    },
    {
      name: "Yuliam",
      documentNumber: 1091884362,
      email: "yuliam@gmail.com",
    },
  ];

  const handleUserSelect = (user) => {
    setSelectsUsers([...selectsUsers, user.documentNumber]);
  };

  const handleUserSearch = (searchQuery) => {
    if (!searchQuery) {
      setUsers(dataUsers); // Mostrar todos los miembros si no hay una consulta de búsqueda
    } else {
      const filteredMembers = dataUsers.filter((member) => {
        const fullName = member.name.toLowerCase();
        const email = member.email.toLowerCase();
        const query = searchQuery.toLowerCase();
        return fullName.includes(query) || email.includes(query);
      });
      setUsers(filteredMembers);
    }
  };

  useEffect(() => {
    setUsers(dataUsers);
  }, []);

  useEffect(() => {
    if (data.description.length >= 255) {
      setLimit(true);
    } else {
      setLimit(false);
    }
  }, [data]);
  return (
    <section className="w-full flex h-autolg:min-h-screen flex-col lg:flex-row">
      <Navbar activeMyGroups={true} />
      <div className="w-[100%] bg-white h-screen pt-5 flex flex-col gap-5 lg:overflow-y-auto">
        <div className="max-w-3xl border px-10 py-6 border-neutral-300 bg-green-50 rounded mb-5  w-full mx-auto flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-semibold" htmlFor="title">
              Nombre del grupo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nombre o titulo del grupo"
              id="title"
              name="title"
              className="px-3 py-1 border border-neutral-400 outline-none bg-white rounded"
            />
          </div>
          <div className="flex flex-col gap-1 relative">
            <label className="font-semibold" htmlFor="description">
              Descripción del grupo <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              id="description"
              rows="5"
              placeholder="Descripción corta de que trata el grupo..."
              maxLength={255}
              className={`resize-none outline-none px-3 py-1 bg-white rounded border border-neutral-400 ${
                limit ? "border-red-500" : "border-neutral-400"
              }`}></textarea>
            <span className="absolute -bottom-4 text-neutral-500 right-0 text-xs">
              Máximo 255 caracteres.
            </span>
          </div>
          <div className="flex flex-col gap-1 p-2 border border-neutral-300 rounded">
            <label className="font-semibold" htmlFor="users">
              Usuarios:
            </label>
            <input
              type="text"
              id="users"
              name="users"
              onChange={(e) => {
                handleUserSearch(e.target.value);
              }}
              placeholder="Ingrese nombre del usuario para buscarlo"
              className="px-3 py-1 border border-neutral-400 outline-none bg-white rounded"
            />
            <div className="">
              {/* Lista de usuarios filtrada */}
              <ul className="max-h-40 overflow-y-scroll mb-2">
                {users.map(
                  (user) =>
                    !selectsUsers.includes(user.documentNumber) && (
                      <li
                        key={user.documentNumber}
                        className={`py-2 px-2 cursor-pointer hover:bg-gray-100 ${
                          selectsUsers === user.documentNumber
                            ? "bg-blue-100"
                            : ""
                        }`}
                        onClick={() => handleUserSelect(user)}>
                        {/* Mostrar información relevante del usuario */}
                        <span className="font-semibold">{user.name}</span>
                        <span className="text-gray-500"> - {user.email}</span>
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
          {selectsUsers.length != 0 && (
            <div className="p-2 ">
              <table className="w-full">
                <thead>
                  <tr className="">
                    <th className="border border-neutral-300">Nombre</th>
                    <th className="border border-neutral-300">Correo</th>
                    <th className="border border-neutral-300">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {selectsUsers.map((user) =>
                    users.map(
                      (u) =>
                        user === u.documentNumber && (
                          <tr>
                            <td className="border border-neutral-300 text-center">
                              {u.name}
                            </td>
                            <td className="border border-neutral-300 text-center">
                              {u.email}
                            </td>
                            <td className="border border-neutral-300 text-center">
                              <span className="justify-center flex w-full">
                                <X
                                  className="text-red-500 hover:cursor-pointer"
                                  onClick={() => {
                                    setSelectsUsers(
                                      selectsUsers.filter(
                                        (a) => a !== u.documentNumber
                                      )
                                    );
                                  }}
                                  size={20}
                                />
                              </span>
                            </td>
                          </tr>
                        )
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="w-full">
            <button className="w-[250px] px-3 py-1 bg-indigo-500 text-white font-semibold rounded">
              Crear grupo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
