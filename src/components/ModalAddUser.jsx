import React, { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "react-toastify";

export const ModalAddUser = ({ handleCloseModal }) => {
  const [userData, setUserData] = useState({
    idUser: 0,
    idType: "",
    nameUser: "",
    emailUser: "",
    chargeUser: "",
    areaUser: "",
    password: "",
    rolId: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(userData);
    try {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        toast.success("Usuario añadido correctamente");
        handleCloseModal();
      } else {
        toast.error("Error al añadir usuario");
      }
    } catch (error) {
      console.error("Error al añadir usuario:", error);
      toast.error("Error al añadir usuario");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto w-screen">
      <div className="flex items-center justify-center min-h-screen w-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[700px]">
          <div className="bg-indigo-800 text-white p-4 rounded-t flex justify-between items-center">
            <h2 className="text-2xl font-bold">Agregar nuevo usuario</h2>
            <button onClick={handleCloseModal} className="focus:outline-none">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-5 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-10">
              <div>
                <label
                  htmlFor="idUser"
                  className="block text-sm font-medium text-gray-700">
                  Número de identidad
                </label>
                <input
                  type="number"
                  id="idUser"
                  name="idUser"
                  value={userData.idUser}
                  onChange={handleChange}
                  className="border w-72 mt-2 px-2 py-1 rounded outline-none focus:border-neutral-500"
                />
              </div>
              <div>
                <label
                  htmlFor="idType"
                  className="block text-sm font-medium text-gray-700">
                  Tipo de identificación:
                </label>
                <select
                  id="idType"
                  name="idType"
                  value={userData.idType}
                  onChange={handleChange}
                  className="border w-72 mt-2 px-2 py-1 rounded outline-none focus:border-neutral-500">
                  <option value="">Seleccionar...</option>
                  <option value="CC">Cédula de ciudadanía</option>
                  <option value="TI">Tarjeta de identidad</option>
                  <option value="CE">Cédula de extranjería</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="nameUser"
                  className="block text-sm font-medium text-gray-700">
                  Nombre completo:
                </label>
                <input
                  type="text"
                  id="nameUser"
                  name="nameUser"
                  value={userData.nameUser}
                  onChange={handleChange}
                  className="border w-72 mt-2 px-2 py-1 rounded outline-none focus:border-neutral-500"
                />
              </div>
              <div>
                <label
                  htmlFor="emailUser"
                  className="block text-sm font-medium text-gray-700">
                  Correo electrónico:
                </label>
                <input
                  type="email"
                  id="emailUser"
                  name="emailUser"
                  value={userData.emailUser}
                  onChange={handleChange}
                  className="border w-72 mt-2 px-2 py-1 rounded outline-none focus:border-neutral-500"
                />
              </div>
              <div>
                <label
                  htmlFor="chargeUser"
                  className="block text-sm font-medium text-gray-700">
                  Cargo:
                </label>
                <input
                  type="text"
                  id="chargeUser"
                  name="chargeUser"
                  value={userData.chargeUser}
                  onChange={handleChange}
                  className="border w-72 mt-2 px-2 py-1 rounded outline-none focus:border-neutral-500"
                />
              </div>
              <div>
                <label
                  htmlFor="areaUser"
                  className="block text-sm font-medium text-gray-700">
                  Área:
                </label>
                <select
                  id="areaUser"
                  name="areaUser"
                  value={userData.areaUser}
                  onChange={handleChange}
                  className="border w-72 mt-2 px-2 py-1 rounded outline-none focus:border-neutral-500">
                  <option value="">Seleccionar...</option>
                  <option value="ADMINISTRATIVA Y FINANCIERA">
                    Administrativa y Financiera
                  </option>
                  <option value="SERVICIO POSTVENTA">Servicio Postventa</option>
                  <option value="COMERCIAL">Comercial</option>
                  <option value="CANALES DIGITALES">Canales Digitales</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700">
                  Contraseña:
                </label>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"} // Cambia el tipo de input según el estado showPassword
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    className="border w-72 px-2 py-1 rounded outline-none focus:border-neutral-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-7 flex items-center px-2"
                    onClick={handleTogglePassword} // Maneja la acción de mostrar/ocultar la contraseña
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="rolId"
                  className="block text-sm font-medium text-gray-700">
                  Rol:
                </label>
                <select
                  id="rolId"
                  name="rolId"
                  value={userData.rolId}
                  onChange={handleChange}
                  className="border w-72 mt-2 px-2 py-1 rounded outline-none focus:border-neutral-500">
                  <option value="">Seleccionar...</option>
                  <option value="1">Sistemas</option>
                  <option value="2">Administrador</option>
                  <option value="3">Asistente</option>
                </select>
              </div>
            </div>
            <div className="text-right mt-5">
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-700 font-semibold text-lg text-white rounded-md hover:bg-indigo-800">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
