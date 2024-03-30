import React, { useEffect, useState } from "react";
import { ModalViewEvent } from "./ModalViewEvent";
import { ModalEditEvent } from "./ModalEditEvent";
import { ModalStatsEvent } from "./ModalStatsEvent";
import { toast } from "react-toastify";
import { Info } from "lucide-react";

export const CardEvent = ({
  title,
  description,
  avaible,
  startDate,
  endDate,
  pending,
  history,
  startDateS,
  endDateS,
  limit,
  id,
  home,
  category,
  eventId,
  eventDetailId,
  eventDetailStatus,
}) => {
  const userId = localStorage.getItem("id");
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalStats, setOpenModalStats] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [eventsPending, setEventsPending] = useState([]);
  const [token, setToken] = useState("");
  const [tokenEvent, setTokenEvent] = useState("");

  const handleAttendEvent = () => {
    setShowConfirmationModal(true);
  };

  useEffect(() => {
    if (avaible) {
      fetch(`http://localhost:3000/api/getEventsPending/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          // Filtrar eventos pendientes por eventDetailId
          const filteredEvents = data.filter(
            (event) => event.eventDetailId == eventDetailId
          );
          // Verificar si el usuario tiene eventos pendientes
          setEventsPending(filteredEvents[0]);
          console.log("______________");
          console.log(filteredEvents[0]);
        })
        .catch((error) => {
          console.error("Error fetching pending events:", error);
        });
    }
  }, [avaible, userId]);

  const confirmAttendEvent = () => {
    const attendanceData = {
      attendanceStatus: 1,
      attendanceEventDetailId: eventDetailId,
      attendanceUserId: parseInt(userId),
    };

    fetch("http://localhost:3000/api/attendances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendanceData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast.success(`Asistencia creada correctamente:`, { theme: "dark" });
        setTimeout(() => {
          location.reload();
        }, "3000");
        // Aquí puedes manejar cualquier acción adicional después de crear la asistencia
      })
      .catch((error) => {
        toast.error(`Error al crear la asistencia: ${error}`, {
          theme: "dark",
        });
        // Aquí puedes manejar el error de manera adecuada, por ejemplo, mostrando un mensaje al usuario
      })
      .finally(() => {
        setShowConfirmationModal(false);
      });
  };

  const generarToken = () => {
    const numeros = [];
    while (numeros.length < 5) {
      const nuevoNumero = Math.floor(Math.random() * 10); // Generar número aleatorio del 0 al 9
      if (!numeros.includes(nuevoNumero)) {
        numeros.push(nuevoNumero);
      }
    }
    return numeros.join(""); // Convertir el array de números en una cadena
  };

  useEffect(() => {
    console.log(eventDetailId);
    // Función para obtener el token del evento
    const fetchToken = async () => {
      console.log(eventDetailId);

      try {
        console.log(eventDetailId);

        const response = await fetch(
          `http://localhost:3000/api/token/${eventDetailId}`
        );
        const data = await response.json();
        if (data.token) {
          console.log(eventDetailId);

          console.log(data);
          setTokenEvent(data.token);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, [eventDetailId]);

  const handleToken = () => {
    const nuevoToken = generarToken();
    setToken(nuevoToken);

    fetch("http://localhost:3000/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenValue: nuevoToken,
        tokenEventDetailId: eventDetailId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al insertar el token");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Token insertado correctamente:", data);
      })
      .catch((error) => {
        console.error("Error al insertar el token:", error);
      });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
  };

  const handleCloseModalStats = () => {
    setOpenModalStats(false);
  };

  const handleOpenModalStats = () => {
    setOpenModalStats(true);
  };

  //Se valida si es o no mi evento
  const myEvent = id == userId;

  //Se valida si estamos en la vista de eventos DISPONIBLES y si es mi evento para no mostrarmelo disponible
  const dontShowMyEventsAvaible = avaible ? myEvent : false;

  //Se valida para no mostrar los eventos en disponibles por:
  //1. Ya está en proceso, es decir, ya comenzó el evento.
  //2. Si ya tengo la asistencia pendiente
  const dontShowAviable = avaible
    ? eventDetailStatus !== 1 || eventsPending?.eventDetailId === eventDetailId
    : false;

  const inProcess = eventDetailStatus !== 1 && myEvent && avaible;

  return (
    <div
      className={`w-[340px] 2xl:w-[360px] border rounded ${
        dontShowMyEventsAvaible && "hidden"
      } ${dontShowAviable && "hidden"} ${inProcess && "hidden"} ${
        eventDetailStatus == 1 && "border-neutral-300"
      } ${eventDetailStatus == 2 && "border-green-400"} ${
        eventDetailStatus == 3 && "border-indigo-400"
      } h-[300px] py-3 rounded px-1 2xl:px-4 flex flex-col gap-3 ${
        history && "bg-gray-200 bg-opacity-80 text-opacity-80 opacity-70"
      }`}>
      <div>
        <h2 className="text-2xl font-semibold px-1 w-auto truncate xl:text-3xl">
          {title}
        </h2>
      </div>
      <div className="h-[160px]  overflow-y-auto px-1 ">
        <p className="text-sm text-neutral-600 2xl:text-xl xl:text-lg">
          {description}
        </p>
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-neutral-700 2xl:text-xl xl:text-lg">
            Fecha de inicio
          </p>
          <p className="text-xs text-neutral-500 2xl:text-base 2xl:font-medium xl:text-sm">
            {startDate}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-neutral-700 2xl:text-xl xl:text-lg">
            Fecha de finalización
          </p>
          <p className="text-xs text-neutral-500 2xl:text-base 2xl:font-medium xl:text-sm">
            {endDate}
          </p>
        </div>
      </div>
      {!history && (
        <div className="bg-neutral-100 p-3 flex justify-between">
          {!myEvent && (
            <button
              onClick={handleOpenModal}
              className="text-white font-semibold bg-indigo-600 py-2 px-4 2xl:px-8 rounded-md hover:bg-indigo-700 focus:outline-none">
              Ver más
            </button>
          )}
          {myEvent && (
            <button
              onClick={handleOpenModalEdit}
              className="text-white font-semibold bg-indigo-600 py-2 px-4 2xl:px-8 rounded-md hover:bg-indigo-700 focus:outline-none">
              Editar
            </button>
          )}
          {!pending && !myEvent && eventDetailStatus == 1 && (
            <button
              onClick={handleAttendEvent}
              className="text-white font-semibold bg-indigo-600 py-2 px-4 2xl:px-10 rounded-md hover:bg-indigo-700 focus:outline-none">
              Asistir
            </button>
          )}
          {myEvent && (
            <button
              onClick={handleOpenModalStats}
              className="text-white font-semibold bg-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none">
              Estadísticas
            </button>
          )}
          {myEvent && (
            <button
              onClick={handleToken}
              className="text-white font-semibold bg-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none">
              Generar Token
            </button>
          )}
        </div>
      )}
      {openModalStats && (
        <ModalStatsEvent
          handleCloseModal={handleCloseModalStats}
          title={title}
          id={eventDetailId}
        />
      )}
      {openModal && (
        <ModalViewEvent
          handleCloseModal={handleCloseModal}
          title={title}
          description={description}
          startDate={startDate}
          endDate={endDate}
          category={category}
          limit={limit}
        />
      )}
      {openModalEdit && (
        <ModalEditEvent
          handleCloseModal={handleCloseModalEdit}
          title={title}
          description={description}
          startDate={startDateS}
          endDate={endDateS}
          category={category}
          limit={limit}
          eventId={eventId}
          eventDetailId={eventDetailId}
          eventDetailStatus={eventDetailStatus}
        />
      )}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white px-8 py-6 rounded-lg">
            <div className="text-center flex justify-center p-2">
              <Info className="text-indigo-500" size={30} />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold ">Confirmar Asistencia</h2>
              <p className="text-gray-500">
                ¿Estás seguro de que quieres asistir a este evento?
              </p>
            </div>
            <div className="flex flex-col justify-center mt-4 gap-2">
              <button
                onClick={confirmAttendEvent}
                className=" px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700">
                Aceptar
              </button>
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="px-4 py-2 border text-gray-800 rounded-md font-semibold hover:bg-gray-400 hover:bg-opacity-20">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
