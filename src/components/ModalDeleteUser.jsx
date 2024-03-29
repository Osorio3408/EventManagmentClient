import React from "react";
import { toast } from "react-toastify";

export const ModalDeleteUser = ({
  deleteUserId,
  handleClose,
  updateUserList,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center">
      {/* Capa semitransparente */}
      <div className="fixed inset-0 bg-black opacity-50"></div>

      {/* Contenido del modal */}
      <div className="bg-white p-5 rounded shadow-md fixed z-50">
        <p>¿Estás seguro de que deseas eliminar este usuario?</p>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 mr-2 bg-red-600 hover:bg-red-700 text-white rounded"
            onClick={() => {
              // Enviar la solicitud de eliminación al servidor
              fetch(`http://localhost:3000/api/deleteUser/${deleteUserId}`, {
                method: "DELETE",
              })
                .then((response) => {
                  updateUserList();
                  handleClose();
                  if (response.ok) {
                    toast.success("Usuario eliminado correctamente", {
                      theme: "dark",
                    });

                    // Actualizar la lista de usuarios después de la eliminación
                  } else {
                    throw new Error("Error al eliminar el usuario");
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                  toast.error("Error al eliminar el usuario");
                });
            }}
          >
            Eliminar
          </button>
          <button
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            onClick={handleClose} // Cerrar el modal
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
