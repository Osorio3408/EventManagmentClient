import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { X, BarChart2, Users } from "lucide-react";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";

export const ModalStatsEvent = ({ handleCloseModal, title, id }) => {
  const [confirmedUsers, setConfirmedUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [totalAttendance, setTotalAttendance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseConfirmed = await fetch(
          `http://localhost:3000/api/attendances/finish/${id}`
        );
        const dataConfirmed = await responseConfirmed.json();
        setConfirmedUsers(dataConfirmed);

        const responsePending = await fetch(
          `http://localhost:3000/api/attendances/pending/${id}`
        );
        const dataPending = await responsePending.json();
        setPendingUsers(dataPending);

        const responseTotal = await fetch(
          `http://localhost:3000/api/attendances/event/${id}`
        );
        const dataTotal = await responseTotal.json();
        setTotalAttendance(dataTotal);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const downloadExcelData = () => {
    // Crear una copia de los datos originales
    const dataWithoutUnwantedFields = totalAttendance.map((user) => {
      // Crear una copia del usuario para no modificar el original
      const userCopy = { ...user };
      // Eliminar los campos no deseados
      delete userCopy.userPassword; // Por ejemplo, eliminar el campo userPassword
      delete userCopy.attendanceId;
      delete userCopy.attendanceStatus;
      delete userCopy.attendanceEventDetailId;
      delete userCopy.attendanceUserId;

      return userCopy;
    });

    // Convertir los datos manipulados en una hoja de cálculo Excel
    const worksheet = XLSX.utils.json_to_sheet(dataWithoutUnwantedFields);

    // Crear un nuevo libro de trabajo y agregar la hoja de cálculo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Asistencias");

    // Descargar el archivo Excel
    XLSX.writeFile(workbook, `estadisticas_${title}.xlsx`);
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={handleCloseModal}
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      className="max-w-4xl w-full mx-auto bg-white rounded shadow-lg">
      <div className="flex justify-between items-center bg-indigo-600 text-white p-4 rounded-t">
        <h2 className="text-2xl font-bold flex items-center">
          <BarChart2 className="mr-2" size={24} />
          Estadísticas del evento - {title}
        </h2>
        <button onClick={handleCloseModal} className="focus:outline-none">
          <X size={28} />
        </button>
      </div>

      <div className="p-4">
        <div className="mt-4 flex justify-center">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-gray-100 p-3 rounded shadow-md">
              <Users className="mr-2" size={24} />
              <div>
                <h4 className="font-semibold">Usuarios Registrados:</h4>
                <span>{totalAttendance.length}</span>
              </div>
            </div>

            <div className="flex items-center bg-gray-100 p-3 rounded shadow-md">
              <Users className="mr-2" size={24} />
              <div>
                <h4 className="font-semibold">Usuarios Pendientes:</h4>
                <span>{pendingUsers.length}</span>
              </div>
            </div>
            <div className="flex items-center bg-gray-100 p-3 rounded shadow-md">
              <Users className="mr-2" size={24} />
              <div>
                <h4 className="font-semibold">Usuarios Confirmados:</h4>
                <span>{confirmedUsers.length}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-0">Resumen:</h3>
        </div>

        {/* Aquí puedes mostrar una tabla con los datos de los usuarios */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {totalAttendance.map((user) => (
              <tr key={user.userId}>
                <td className="border border-gray-300 px-4 py-2">
                  {user.userName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.userEmail}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    user.attendanceStatus === 1
                      ? "text-indigo-700"
                      : "text-green-700"
                  } font-semibold`}>
                  {user.attendanceStatus === 1 ? "Pendiente" : "Confirmado"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end p-4">
        <button
          onClick={downloadExcelData}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow-md transition-colors duration-300 ease-in-out focus:outline-none mr-4">
          Descargar Excel
        </button>
        <button
          onClick={handleCloseModal}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded shadow-md transition-colors duration-300 ease-in-out focus:outline-none">
          Cerrar
        </button>
      </div>
    </Modal>
  );
};
