import {
  Calendar,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  CornerRightDown,
  LogOut,
  Menu,
  Plus,
  Settings,
  User,
  X,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Navbar = ({
  activeEvent,
  avaible,
  pending,
  history,
  activeMyGroups,
  activeGroups,
  activeUsers,
  activeMyEvents,
}) => {
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState("");

  const handleLogout = () => {
    navigate("/SignIn");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decodificamos el token utilizando la función verify de jsonwebtoken
        const decodedToken = jwtDecode(token); // Reemplaza "your-secret-key" con la clave secreta utilizada para firmar el token en tu backend

        // Una vez decodificado, puedes acceder a los datos que contiene
        //  console.log(decodedToken);

        const userId = decodedToken.details[0].UserId;

        // Guardar userId en el localStorage
        localStorage.setItem("id", userId);

        // Por ejemplo, para obtener el rol
        setUserRole(decodedToken.details[0].UserRole);
        console.log(decodedToken.details[0]);
        //  console.log("El rol del usuario es:", userRole);

        // Puedes hacer lo que necesites con la información del token
        // Por ejemplo, puedes actualizar el estado de autenticación
      } catch (error) {
        // Si hay un error al decodificar el token, maneja el error aquí
        console.error("Error al decodificar el token:", error.message);
      }
    } else {
      console.log("No se encontró ningún token en el almacenamiento local.");
      // Manejar el caso en el que no haya ningún token en el almacenamiento local
    }
  }, [navigate]);

  const [downEvents, setDownEvents] = useState(false);
  const [downGroups, setDownGroups] = useState(false);
  const [downMyGroups, setDownMyGroups] = useState(false);
  const [closeNav, setCloseNav] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  const admin = true;

  useEffect(() => {
    if (closeNav) {
      setDownEvents(false);
      setDownGroups(false);
    }
  }, [closeNav]);

  useEffect(() => {
    setDownEvents(false);
    setDownGroups(false);
    setDownMyGroups(false);
    setOpenNav(false);
  }, [window.location.pathname]);

  return (
    <>
      <div
        className={`h-screen ${
          closeNav ? "w-[10%]" : "xl:w-[18%] 2xl:w-[15%]"
        } hidden lg:flex transition-all duration-300 relative bg-neutral-900 text-white  flex-col gap-y-24 border-r border-indigo-950 `}>
        <div className="absolute right-2 top-2">
          {closeNav ? (
            <span
              className="cursor-pointer group/arrowOpen"
              onClick={() => {
                setCloseNav(false);
              }}>
              <ChevronsRight className="group-hover/arrowOpen:scale-125 transition-all" />
            </span>
          ) : (
            <span
              className="cursor-pointer group/arrowClose"
              onClick={() => {
                setCloseNav(true);
              }}>
              <ChevronsLeft className="group-hover/arrowClose:scale-125 transition-all" />
            </span>
          )}
        </div>
        <div className="w-full mt-12">
          <h1 className="text-center text-2xl 2xl:text-3xl 2xl:font-bold font-semibold">
            Event Managment
          </h1>
        </div>
        <div className="px-5 w-full mx-auto overflow-y-auto scroll h-[400px]">
          <ul
            className={`space-y-8 ${
              closeNav && "flex flex-col items-center space-y-10"
            }`}>
            {closeNav ? (
              <Calendar
                onClick={() => {
                  setCloseNav(false), setDownEvents(true);
                }}
                className="cursor-pointer hover:text-indigo-900"
              />
            ) : (
              <li>
                <p
                  onClick={() => {
                    setDownEvents(!downEvents);
                  }}
                  className="flex items-center justify-between group/Events gap-x-5 cursor-pointer hover:bg-neutral-800 px-2 py-1">
                  <span className="flex items-center gap-2 2xl:text-2xl xl:text-xl text-lg 2xl:font-semibold xl:font-medium">
                    <Calendar
                      size={18}
                      className={`${activeEvent && "text-indigo-900"}`}
                    />
                    Eventos
                  </span>
                  {downEvents ? (
                    <CornerRightDown size={16} className="text-indigo-700 " />
                  ) : (
                    <ChevronDown
                      size={16}
                      className="group-hover/Events:text-indigo-800"
                    />
                  )}{" "}
                </p>
                {downEvents && (
                  <div className="border-l border-indigo-800 flex flex-col gap-y-3 mt-1 ml-2">
                    <Link
                      to={"/"}
                      className={`w-full hover:bg-neutral-800 pl-3 cursor-pointer py-1 2xl:text-xl xl:text-lg ${
                        avaible ? "border-l-4" : "hover:border-l-4"
                      } border-indigo-800`}>
                      Disponibles
                    </Link>
                    <Link
                      to={"/Pending"}
                      className={`w-full hover:bg-neutral-800 pl-3 cursor-pointer py-1 2xl:text-xl xl:text-lg ${
                        pending ? "border-l-4" : "hover:border-l-4"
                      } border-indigo-800`}>
                      Pendientes
                    </Link>
                    <Link
                      to={"/History"}
                      className={`w-full hover:bg-neutral-800 pl-3 cursor-pointer py-1 2xl:text-xl xl:text-lg ${
                        history ? "border-l-4" : "hover:border-l-4"
                      } border-indigo-800`}>
                      Historial
                    </Link>
                    {(userRole === "Sistemas" ||
                      userRole === "Administrador") && (
                      <Link
                        to={"/MyEvents"}
                        className={`w-full hover:bg-neutral-800 pl-3 cursor-pointer py-1 2xl:text-xl xl:text-lg ${
                          activeMyEvents ? "border-l-4" : "hover:border-l-4"
                        } border-indigo-800`}>
                        Mis eventos
                      </Link>
                    )}
                    {(userRole === "Sistemas" ||
                      userRole === "Administrador") && (
                      <Link
                        to={"/NewEvent"}
                        className="border border-indigo-900 w-max ml-3 px-7 xl:px-10 xl:py-1 xl:font-medium 2xl:px-10 2xl:py-2 2xl:text-xl 2xl:font-semibold hover:bg-indigo-900 flex items-center gap-2 rounded">
                        Crear{" "}
                        <span>
                          <Plus size={18} />
                        </span>
                      </Link>
                    )}
                  </div>
                )}
              </li>
            )}

            {/* {closeNav ? (
              <Users2 className="cursor-pointer hover:text-indigo-900" />
            ) : (
              <li>
                <p
                  onClick={() => {
                    setDownGroups(!downGroups);
                  }}
                  className="flex items-center justify-between group/Groups gap-x-5 cursor-pointer hover:bg-neutral-800 px-2 py-1"
                >
                  <span className="flex items-center gap-2 2xl:text-2xl xl:text-xl text-lg 2xl:font-semibold xl:font-medium">
                    <Users2
                      size={18}
                      className={`${activeGroups && "text-indigo-900"}`}
                    />
                    Grupos
                  </span>
                  {downGroups ? (
                    <CornerRightDown size={16} className="text-indigo-700 " />
                  ) : (
                    <ChevronDown
                      size={16}
                      className="group-hover/Groups:text-indigo-800"
                    />
                  )}{" "}
                </p>
                {downGroups && (
                  <div className="border-l border-indigo-800 flex flex-col gap-y-3 mt-1 ml-2">
                    <Link
                      to={"/Groups/grupo1"}
                      className={`w-full hover:bg-neutral-800 pl-3 cursor-pointer py-1 2xl:text-xl xl:text-lg hover:border-l-4 border-indigo-800`}
                    >
                      Grupo 1
                    </Link>
                    <Link
                      to={"/Groups/grupo2"}
                      className={`w-full hover:bg-neutral-800 pl-3 cursor-pointer py-1 2xl:text-xl xl:text-lg hover:border-l-4 border-indigo-800`}
                    >
                      Grupo 2
                    </Link>
                  </div>
                )}
              </li>
            )} */}
            {/* {(userRole === "Sistemas" || userRole === "Administrador") && (
              <>
                {closeNav ? (
                  <Users className="cursor-pointer hover:text-indigo-900" />
                ) : (
                  <li>
                    <p
                      onClick={() => {
                        setDownMyGroups(!downMyGroups);
                      }}
                      className="flex items-center justify-between group/Groups gap-x-5 cursor-pointer hover:bg-neutral-800 px-2 py-1"
                    >
                      <span className="flex items-center gap-2 2xl:text-2xl xl:text-xl text-lg 2xl:font-semibold xl:font-medium">
                        <Users
                          size={18}
                          className={`${activeMyGroups && "text-indigo-900"}`}
                        />
                        Mis Grupos
                      </span>
                      {downMyGroups ? (
                        <CornerRightDown size={16} className="text-indigo-700 " />
                      ) : (
                        <ChevronDown
                          size={16}
                          className="group-hover/Groups:text-indigo-800"
                        />
                      )}{" "}
                    </p>
                    {downMyGroups && (
                      <div className="border-l border-indigo-800 flex flex-col gap-y-3 mt-1 ml-2">
                        <Link
                          to={"/MyGroups/GrupoMio1"}
                          className={`w-full hover:bg-neutral-800 pl-3 cursor-pointer py-1 2xl:text-xl xl:text-lg hover:border-l-4 border-indigo-800`}
                        >
                          Grupo 1
                        </Link>
                        <Link
                          to={"/MyGroups/GrupoMio2"}
                          className={`w-full hover:bg-neutral-800 pl-3 cursor-pointer py-1 2xl:text-xl xl:text-lg hover:border-l-4 border-indigo-800`}
                        >
                          Grupo 2
                        </Link>
                        {admin && (
                          <Link
                            to={"/NewGroup"}
                            className="border border-indigo-900 w-max ml-3 px-7 hover:bg-indigo-900 flex items-center gap-2 rounded"
                          >
                            Agregar
                            <span>
                              <Plus size={18} />
                            </span>
                          </Link>
                        )}
                      </div>
                    )}
                  </li>
                )}
              </>
            )} */}
            {userRole === "Sistemas" && (
              <>
                {" "}
                {closeNav ? (
                  <User className="cursor-pointer hover:text-indigo-900" />
                ) : (
                  <li>
                    <Link
                      to={"/Users"}
                      className="flex items-center justify-between group/Groups gap-x-5 cursor-pointer hover:bg-neutral-800 px-2 py-1">
                      <span className="flex items-center gap-2 2xl:text-2xl xl:text-xl text-lg 2xl:font-semibold xl:font-medium">
                        <User
                          size={18}
                          className={`${activeUsers && "text-indigo-900"}`}
                        />
                        Usuarios
                      </span>
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
        <div
          className={`w-full h-auto absolute bottom-2  text-center ${
            closeNav && "flex items-center  text-center px-[41%]"
          }`}>
          {closeNav ? (
            <button onClick={handleLogout}>
              <LogOut className="cursor-pointer hover:text-indigo-900" />
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center w-full justify-between mx-auto group/Groups gap-x-5 cursor-pointer hover:bg-neutral-800 px-2 py-2">
              <span className="flex items-center gap-2 2xl:text-2xl xl:text-xl text-lg 2xl:font-semibold xl:font-medium mx-auto">
                <LogOut size={18} />
                Cerrar sesión
              </span>
            </button>
          )}
        </div>
      </div>
      <div className=" lg:hidden bg-black w-full py-5 px-5">
        <div className="w-full flex justify-between items-center h-full">
          <div className="w-full">
            <button
              onClick={() => {
                setOpenNav(!openNav);
              }}>
              <span className="text-white">
                {openNav ? <X size={28} /> : <Menu size={28} />}
              </span>
            </button>
          </div>
          <div className="w-auto">
            <h1 className="text-white font-semibold text-2xl w-max">
              Event Managment
            </h1>
          </div>
        </div>
        <div className={`${openNav ? "h-full" : "h-[0px] "} `}>
          <div
            className={`px-5 py-5 w-full mx-auto text-white ${
              !openNav && "hidden"
            }`}>
            <ul
              className={`space-y-8 ${
                closeNav && "flex flex-col items-center space-y-10"
              }`}>
              <li>
                <p
                  onClick={() => {
                    setDownEvents(!downEvents);
                  }}
                  className="flex items-center justify-between group/Events gap-x-5 cursor-pointer hover:bg-neutral-800 px-2 py-2">
                  <span className="flex items-center gap-2 2xl:text-2xl xl:text-xl text-lg 2xl:font-semibold xl:font-medium">
                    <Calendar
                      size={18}
                      className={`${activeEvent && "text-indigo-900"}`}
                    />
                    Eventos
                  </span>
                  {downEvents ? (
                    <CornerRightDown size={16} className="text-indigo-700 " />
                  ) : (
                    <ChevronDown
                      size={16}
                      className="group-hover/Events:text-indigo-800"
                    />
                  )}{" "}
                </p>
                {downEvents && (
                  <div className="border-l border-indigo-800 flex flex-col gap-y-3 mt-1 ml-2">
                    <Link
                      to={"/"}
                      className={`w-full hover:bg-neutral-800 pl-3 cursor-pointer py-2 ${
                        avaible ? "border-l-4" : "hover:border-l-4"
                      } border-indigo-800`}>
                      Disponibles
                    </Link>
                    <Link
                      to={"/Pending"}
                      className={`w-full hover:bg-neutral-800 pl-3 cursor-pointer py-2 ${
                        pending ? "border-l-4" : "hover:border-l-4"
                      } border-indigo-800`}>
                      Pendientes
                    </Link>
                    <Link
                      to={"/History"}
                      className={`w-full hover:bg-neutral-800 pl-3 cursor-pointer py-2 ${
                        history ? "border-l-4" : "hover:border-l-4"
                      } border-indigo-800`}>
                      Historial
                    </Link>
                    <Link
                      to={"/MyEvents"}
                      className={`w-full hover:bg-neutral-800 pl-3 cursor-pointer py-2 ${
                        activeMyEvents ? "border-l-4" : "hover:border-l-4"
                      } border-indigo-800`}>
                      Mis Eventos
                    </Link>
                    {admin && (
                      <Link
                        to={"/NewEvent"}
                        className="border border-indigo-900 w-max ml-3 px-7 hover:bg-indigo-900 flex items-center gap-2 rounded">
                        Crear{" "}
                        <span>
                          <Plus size={18} />
                        </span>
                      </Link>
                    )}
                  </div>
                )}
              </li>

              {/* <li>
                <p
                  onClick={() => {
                    setDownGroups(!downGroups);
                  }}
                  className="flex items-center justify-between group/Groups gap-x-5 cursor-pointer hover:bg-neutral-800 px-2 py-2"
                >
                  <span className="flex items-center gap-2 2xl:text-2xl xl:text-xl text-lg 2xl:font-semibold xl:font-medium">
                    <Users2
                      size={18}
                      className={activeGroups && "text-indigo-800"}
                    />
                    Grupos
                  </span>
                  {downGroups ? (
                    <CornerRightDown size={16} className="text-indigo-700 " />
                  ) : (
                    <ChevronDown
                      size={16}
                      className="group-hover/Groups:text-indigo-800"
                    />
                  )}{" "}
                </p>
                {downGroups && (
                  <div className="border-l border-indigo-800 flex flex-col gap-y-3 mt-1 ml-2">
                    <Link
                      to={"/Groups/grupo1"}
                      className={`w-full hover:bg-neutral-800 pl-3 cursor-pointer py-2 hover:border-l-4 border-indigo-800`}
                    >
                      Grupo 1
                    </Link>
                    <Link
                      to={"/Groups/grupo2"}
                      className={`w-full hover:bg-neutral-800 pl-3 cursor-pointer py-2 hover:border-l-4 border-indigo-800`}
                    >
                      Grupo 2
                    </Link>
                  </div>
                )}
              </li> */}

              {/* <li>
                <p
                  onClick={() => {
                    setDownMyGroups(!downMyGroups);
                  }}
                  className="flex items-center justify-between group/Groups gap-x-5 cursor-pointer hover:bg-neutral-800 px-2 py-1"
                >
                  <span className="flex items-center gap-2 2xl:text-2xl xl:text-xl text-lg 2xl:font-semibold xl:font-medium">
                    <Users
                      size={18}
                      className={`${activeMyGroups && "text-indigo-900"}`}
                    />
                    Mis Grupos
                  </span>
                  {downMyGroups ? (
                    <CornerRightDown size={16} className="text-indigo-700 " />
                  ) : (
                    <ChevronDown
                      size={16}
                      className="group-hover/Groups:text-indigo-800"
                    />
                  )}{" "}
                </p>
                {downMyGroups && (
                  <div className="border-l border-indigo-800 flex flex-col gap-y-3 mt-1 ml-2">
                    <Link
                      to={"/MyGroups/Grupo1"}
                      className={`w-full hover:bg-neutral-800 pl-3 cursor-pointer py-1 2xl:text-xl xl:text-lg hover:border-l-4 border-indigo-800`}
                    >
                      Grupo 1
                    </Link>
                    <Link
                      to={"/MyGroups/Grupo2"}
                      className={`w-full hover:bg-neutral-800 pl-3 cursor-pointer py-1 2xl:text-xl xl:text-lg hover:border-l-4 border-indigo-800`}
                    >
                      Grupo 2
                    </Link>
                    {admin && (
                      <Link
                        to={"/NewGroup"}
                        className="border border-indigo-900 w-max ml-3 px-7 hover:bg-indigo-900 flex items-center gap-2 rounded"
                      >
                        Agregar
                        <span>
                          <Plus size={18} />
                        </span>
                      </Link>
                    )}
                  </div>
                )}
              </li> */}

              <li>
                <Link
                  to={"/Users"}
                  className="flex items-center justify-between group/Groups gap-x-5 cursor-pointer hover:bg-neutral-800 px-2 py-1">
                  <span className="flex items-center gap-2 2xl:text-2xl xl:text-xl text-lg 2xl:font-semibold xl:font-medium">
                    <User size={18} />
                    Usuarios
                  </span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-between group/Groups gap-x-5 cursor-pointer hover:bg-neutral-800 px-2 py-2">
                  <span className="flex items-center gap-2 2xl:text-2xl xl:text-xl text-lg 2xl:font-semibold xl:font-medium">
                    <LogOut size={18} />
                    Cerrar sesión
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
