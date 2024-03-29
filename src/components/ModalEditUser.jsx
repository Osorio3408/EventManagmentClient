import React, { useState, useEffect } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "react-toastify";

export const ModalEditUser = ({ userId, handleClose }) => {
  const [userData, setUserData] = useState({
    idType: "",
    nameUser: "",
    emailUser: "",
    chargeUser: "",
    areaUser: "",
    password: "",
    newPassword: "",
    rolId: "",
    statusUser: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña

  useEffect(() => {
    // Fetch para obtener los datos del usuario a editar
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${userId}`
        );
        if (response.ok) {
          const userDataFromServer = await response.json();
          // Mapeamos los datos obtenidos del fetch para que coincidan con el estado userData}
          console.log(userDataFromServer);
          const mappedUserData = {
            idType: userDataFromServer.userIdType,
            nameUser: userDataFromServer.userName,
            emailUser: userDataFromServer.userEmail,
            chargeUser: userDataFromServer.userCharge,
            areaUser: userDataFromServer.userArea,
            password: userDataFromServer.userPassword,
            rolId: userDataFromServer.userRolId,
            statusUser: userDataFromServer.userStatus,
          };
          setUserData(mappedUserData);
        } else {
          throw new Error("Error al obtener los datos del usuario");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error al obtener los datos del usuario");
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = value === "" ? null : value; // Convertir cadena vacía a null
    setUserData({ ...userData, [name]: newValue });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Copia del estado actual de userData
    const updatedUserData = { ...userData };
    // Asignar el valor de newPassword a password si newPassword no es null
    if (
      updatedUserData.newPassword == null ||
      updatedUserData.newPassword == undefined ||
      updatedUserData.newPassword == ""
    ) {
      delete updatedUserData.newPassword;
    } else {
      updatedUserData.password = updatedUserData.newPassword;
      delete updatedUserData.newPassword;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/updateUser/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData), // Envía el objeto actualizado sin la contraseña si está vacía
        }
      );
      if (response.ok) {
        toast.success("Usuario actualizado correctamente");
        handleClose();
        console.log(updatedUserData);
      } else {
        throw new Error("Error al actualizar usuario");
      }
    } catch (error) {
      console.log(updatedUserData);

      console.error("Error:", error);
      toast.error("Error al actualizar usuario");
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
            <h2 className="text-2xl font-bold">Editar Usuario</h2>
            <button onClick={handleClose} className="focus:outline-none">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-5 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-10">
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
                  className="border w-full mt-2 px-2 py-1 rounded outline-none focus:border-neutral-500">
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
                  className="border w-full mt-2 px-2 py-1 rounded outline-none focus:border-neutral-500"
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
                  className="border w-full mt-2 px-2 py-1 rounded outline-none focus:border-neutral-500"
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
                  className="border w-full mt-2 px-2 py-1 rounded outline-none focus:border-neutral-500"
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
                  className="border w-full mt-2 px-2 py-1 rounded outline-none focus:border-neutral-500">
                  <option value="">Seleccionar...</option>
                  <option value="ADMINISTRATIVA Y FINANCIERA">
                    Administrativa y Financiera
                  </option>
                  <option value="Comercial">Comercial</option>
                  <option value="Servciio PostVenta">Servicio PostVenta</option>
                  <option value="Canales Digitales">Canales Digitales</option>
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
                    type={showPassword ? "text" : "password"} // Mostrar contraseña si showPassword es true
                    id="newPassword"
                    name="newPassword"
                    value={userData.newPassword} // Desencriptar la contraseña
                    placeholder="Ingrese contraseña nueva..."
                    onChange={handleChange}
                    className="border w-full mt-2 px-2 py-1 rounded outline-none focus:border-neutral-500"
                  />

                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute inset-y-0 right-0 px-3 py-1 top-2">
                    {showPassword ? <EyeOff /> : <Eye />}
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
                  className="border w-full mt-2 px-2 py-1 rounded outline-none focus:border-neutral-500">
                  <option value="">Seleccionar...</option>
                  <option value="1">Sistemas</option>
                  <option value="2">Adminitrador</option>
                  <option value="3">Asistente</option>
                </select>
              </div>
              {/* Resto de campos de edición de usuario */}
            </div>
            {/* Selector de estado de usuario */}
            <div className="mt-4">
              <label
                htmlFor="statusUser"
                className="block text-sm font-medium text-gray-700">
                Estado del usuario:
              </label>
              <select
                id="statusUser"
                name="statusUser"
                value={userData.statusUser}
                onChange={handleChange}
                className="border w-full mt-2 px-2 py-1 rounded outline-none focus:border-neutral-500">
                <option value="1">Habilitado</option>
                <option value="2">Deshabilitado</option>
              </select>
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
