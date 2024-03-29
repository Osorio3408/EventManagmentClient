import { DeleteIcon, Edit, PlusCircle, Search, Settings2 } from "lucide-react";
import React, { useState } from "react";
import { ModalAddUser } from "./ModalAddUser";

export const SearchGroup = ({
  admin,
  setSearchTerm,
  handleEditUser,
  handleDeleteUser,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState(null); // Estado para almacenar los datos del nuevo usuario

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenModal = async () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="p-3 border border-neutral-400 rounded flex flex-col gap-5 m-2 md:m-0">
      <div className="w-full relative">
        <input
          type="search"
          name="search"
          id="search"
          className="px-2 py-1 outline-none w-full rounded shadow shadow-neutral-300 border border-neutral-300"
          placeholder="Buscar..."
          onChange={handleSearch}
        />
        <span className="absolute bottom-2 right-2">
          <Search size={20} />
        </span>
      </div>
      <div
        className={`w-full mx-auto text-center ${
          admin &&
          "grid gap-3 grid-cols-2 md:grid-cols-3 place-content-center place-items-center "
        }`}>
        {/* <button className="flex mx-auto h-auto items-center justify-around border border-indigo-800 w-[130px] py-2 rounded hover:bg-indigo-800 transition-all duration-300 hover:text-white font-semibold">
          Opciones
          <span className="h-max">
            <Settings2 />
          </span>
        </button> */}
        {admin && (
          <>
            <button
              onClick={handleOpenModal}
              className="flex mx-auto h-auto items-center justify-around border border-indigo-800 w-[130px] py-2 rounded hover:bg-indigo-800 transition-all duration-300 hover:text-white font-semibold">
              Añadir
              <span>
                <PlusCircle />
              </span>
            </button>
            <button
              onClick={handleEditUser} // Manejador para abrir el modal de edición
              className="flex mx-auto h-auto items-center justify-around border border-indigo-800 w-[130px] py-2 rounded hover:bg-indigo-800 transition-all duration-300 hover:text-white font-semibold">
              Editar
              <span>
                <Edit />
              </span>
            </button>
            <button
              onClick={handleDeleteUser}
              className="flex mx-auto h-auto items-center justify-around border border-indigo-800 w-[130px] py-2 rounded hover:bg-indigo-800 transition-all duration-300 hover:text-white font-semibold">
              Eliminar
              <span>
                <DeleteIcon />
              </span>
            </button>
          </>
        )}
      </div>
      {isModalOpen && <ModalAddUser handleCloseModal={handleCloseModal} />}
    </div>
  );
};
