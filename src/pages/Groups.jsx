import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { SearchGroup } from "../components/SearchGroup";
import { Info } from "lucide-react";

export const Groups = () => {
  const [selectAll, setSelectAll] = useState(false); // Estado para el checkbox en el encabezado
  const [selectedClients, setSelectedClients] = useState([]); // Estado para los clientes seleccionados

  const { group } = useParams();
  const path = window.location.pathname;

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
    } else {
      navigate("/SignIn");
    }
  }, []);

  const namePath = path.split("/")[1];

  const isAdmin = namePath === "MyGroups";

  const isUser = namePath === "Groups";

  // const title = (text) => {
  //   text.charAt(0).toUpperCase() + text.slice(1);
  // };

  useEffect(() => {
    if (clients.length === selectedClients.length) {
      setSelectAll(true);
    }
    console.log(selectedClients);
  }, [selectedClients]);

  // Función para manejar los cambios en la selección de un cliente
  const handleClientSelection = (documentNumber) => {
    const isSelected = selectedClients.includes(documentNumber);
    if (isSelected) {
      // Si ya estaba seleccionado, lo eliminamos de la lista de seleccionados
      setSelectedClients(
        selectedClients.filter((item) => item !== documentNumber)
      );
    } else {
      // Si no estaba seleccionado, lo añadimos a la lista de seleccionados
      setSelectedClients([...selectedClients, documentNumber]);
    }
  };

  // Función para manejar la selección de todos los clientes
  const handleSelectAll = () => {
    if (clients.length === selectedClients.length) {
      setSelectAll(true);
    }

    if (selectAll) {
      // Si está seleccionado, deseleccionamos a todos
      setSelectedClients([]);
    } else {
      // Si no está seleccionado, seleccionamos a todos los clientes
      const allDocumentNumbers = clients.map((client) => client.documentNumber);
      setSelectedClients(allDocumentNumbers);
    }
    // Cambiamos el estado del checkbox en el encabezado
    setSelectAll(!selectAll);
  };

  const clients = [
    {
      documentNumber: 18415516,
      name: "Erika",
      lastName: "Londoño Ruiz",
      email: "elondono@gmail.com",
    },
    {
      documentNumber: 24811110,
      name: "Victor Andres",
      lastName: "Garcia Chala",
      email: "vgarcia@gmail.com",
    },
    {
      documentNumber: 100437574,
      name: "Jaime Alonso",
      lastName: "Ramirez Yara",
      email: "jramirez@gmail.com",
    },
    {
      documentNumber: 1091884362,
      name: "Yuliam Andrey",
      lastName: "Osorio Puerta",
      email: "yosorio@gmail.com",
    },
  ];

  return (
    <section className="w-full flex h-autolg:min-h-screen flex-col lg:flex-row">
      <Navbar activeMyGroups={isAdmin} activeGroups={isUser} />
      <div className="w-[100%] bg-white h-screen pt-5 flex flex-col gap-5 ">
        <div className="max-w-4xl w-full h-screen mx-auto space-y-5">
          <div className="w-full py-2">
            <h2 className="text-3xl text-center font-semibold text-neutral-600">
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </h2>
          </div>
          <SearchGroup admin={isAdmin} />
          <div className="border border-neutral-300 md:border-none rounded p-3 md:p-0 overflow-x-auto m-2 md:m-0">
            <table className="w-full shadow-md shadow-neutral-400">
              <thead className="w-full border-b border-neutral-400 bg-neutral-800 text-white ">
                <tr>
                  {isAdmin && (
                    <th className="px-4 py-2">
                      <input
                        type="checkbox"
                        name="check"
                        id="check"
                        className="accent-indigo-800"
                        checked={selectAll} // Usamos el estado para el checkbox en el encabezado
                        onChange={handleSelectAll} // Manejamos el cambio en la selección de todos
                      />
                    </th>
                  )}
                  <th className=" px-4 py-2">N° de documento</th>
                  <th className=" px-4 py-2">Nombre</th>
                  <th className=" px-4 py-2">Apellido</th>
                  <th className=" px-4 py-2">Correo</th>
                  {isAdmin && <th className=" px-4 py-2">Información</th>}
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr className="border-b border-neutral-400">
                    {isAdmin && (
                      <td className=" text-center px-3">
                        <input
                          type="checkbox"
                          name="check"
                          id="check"
                          className="accent-indigo-800"
                          checked={selectedClients.includes(
                            client.documentNumber
                          )} // Usamos el estado para la selección individual
                          onChange={() =>
                            handleClientSelection(client.documentNumber)
                          } // Manejamos el cambio en la selección individual
                        />
                      </td>
                    )}
                    <td className=" text-center px-4 py-1">
                      {client.documentNumber}
                    </td>
                    <td className=" text-center px-4 py-1 ">{client.name}</td>
                    <td className=" text-center px-4 py-1">
                      {client.lastName}
                    </td>
                    <td className=" text-center px-4 py-1">{client.email}</td>
                    {isAdmin && (
                      <td className=" text-center px-3">
                        <button className="flex items-center justify-center text-center mx-auto p-1">
                          <Info className="mx-auto text-blue-800" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
