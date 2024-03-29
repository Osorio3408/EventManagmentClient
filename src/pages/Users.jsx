import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SearchGroup } from "../components/SearchGroup";
import { toast } from "react-toastify";
import { ModalEditUser } from "../components/ModalEditUser";
import { ModalDeleteUser } from "../components/ModalDeleteUser";

export const Users = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/Users");
    } else {
      navigate("/SignIn");
    }
  }, []);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // Estado para almacenar los detalles del usuario

  const isAdmin = true;

  const handleEditUser = () => {
    if (selectedUsers.length === 1) {
      setEditUserId(selectedUsers[0]);
      setIsEditModalOpen(true);
    } else {
      toast.info("Solo puedes seleccionar un usuario para editar.", {
        theme: "dark",
      });
    }
  };

  const handleDeleteUser = () => {
    if (selectedUsers.length === 1) {
      setDeleteUserId(selectedUsers[0]);
      setIsDeleteModalOpen(true);
    } else {
      toast.info("Por favor, selecciona solo un usuario para eliminar.", {
        theme: "dark",
      });
    }
  };

  const handleUserInfo = (user) => {
    // Almacenar los detalles del usuario seleccionado y abrir el modal de información
    setUserInfo(user);
    setIsInfoModalOpen(true);
  };

  useEffect(() => {
    if (users.length === selectedUsers.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedUsers, users]);

  const handleUserSelection = (userId) => {
    const isSelected = selectedUsers.includes(userId);
    if (isSelected) {
      setSelectedUsers(selectedUsers.filter((item) => item !== userId));
      setDeleteUserId(null);
    } else {
      setSelectedUsers([userId]);
      setDeleteUserId(userId);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      const allUserIds = users.map((user) => user.userId);
      setSelectedUsers(allUserIds);
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const updateUserList = () => {
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <section className="w-full flex h-autolg:min-h-screen flex-col lg:flex-row">
      <Navbar activeUsers={true} />
      <div className="w-[100%] bg-white h-screen pt-5 flex flex-col gap-5 ">
        <div className="max-w-4xl mb-5  w-full mx-auto lg:overflow-y-auto py-10 flex flex-col gap-10">
          <SearchGroup
            admin={true}
            setSearchTerm={setSearchTerm}
            handleEditUser={handleEditUser}
            handleDeleteUser={handleDeleteUser}
          />{" "}
          <div className="border border-neutral-300 md:border-none rounded p-3 md:p-0 overflow-x-auto m-2 md:m-0">
            <table className="w-full shadow-md shadow-neutral-400">
              <thead className="w-full border-b border-neutral-400 bg-neutral-800 text-white ">
                <tr>
                  {isAdmin && (
                    <th className="px-4 py-2">
                      {/* <input
                        type="checkbox"
                        name="check"
                        id="check"
                        className="accent-indigo-800"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      /> */}
                    </th>
                  )}
                  <th className=" px-4 py-2">N° de documento</th>
                  <th className=" px-4 py-2">Nombre</th>
                  <th className=" px-4 py-2">Correo</th>
                  {isAdmin && <th className=" px-4 py-2">Información</th>}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr className="border-b border-neutral-400" key={user.userId}>
                    {isAdmin && (
                      <td className=" text-center px-3">
                        <input
                          type="checkbox"
                          name="check"
                          id="check"
                          className="accent-indigo-800"
                          checked={selectedUsers.includes(user.userId)}
                          onChange={() => handleUserSelection(user.userId)}
                        />
                      </td>
                    )}
                    <td className=" text-center px-4 py-1">{user.userId}</td>
                    <td className=" text-center px-4 py-1 ">{user.userName}</td>
                    <td className=" text-center px-4 py-1">{user.userEmail}</td>
                    {isAdmin && (
                      <td className=" text-center px-3">
                        {/* Botón de información */}
                        <button
                          className="flex items-center justify-center text-center mx-auto p-1"
                          onClick={() => handleUserInfo(user)}>
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
      {isEditModalOpen && (
        <ModalEditUser
          userId={editUserId}
          handleClose={() => setIsEditModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <ModalDeleteUser
          deleteUserId={deleteUserId}
          handleClose={() => setIsDeleteModalOpen(false)}
          updateUserList={updateUserList}
        />
      )}
      {/* Modal de información del usuario */}
      {userInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-md shadow-lg w-[400px]">
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-gray-300 pb-2">
              Información del usuario
            </h2>
            <p className="text-gray-800 mb-2">
              <strong>Número de Identificación:</strong> {userInfo.userId}
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Nombre:</strong> {userInfo.userName}
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Correo:</strong> {userInfo.userEmail}
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Tipo de Identificación:</strong> {userInfo.userIdType}
            </p>

            <p className="text-gray-800 mb-2">
              <strong>Cargo:</strong> {userInfo.userCharge}
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Área:</strong> {userInfo.userArea}
            </p>
            {/* Agrega más detalles del usuario aquí */}
            <button
              className="mt-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
              onClick={() => setUserInfo(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
