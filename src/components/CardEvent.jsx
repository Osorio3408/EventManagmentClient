import React, { useEffect, useState } from "react";
import { ModalViewEvent } from "./ModalViewEvent";
import { ModalEditEvent } from "./ModalEditEvent";
import { ModalStatsEvent } from "./ModalStatsEvent";
import { toast } from "react-toastify";

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
      className={`w-[320px] border ${dontShowMyEventsAvaible && "hidden"} ${
        dontShowAviable && "hidden"
      } ${inProcess && "hidden"} ${
        eventDetailStatus == 1 && "border-neutral-300"
      } ${eventDetailStatus == 2 && "border-green-400"} ${
        eventDetailStatus == 3 && "border-indigo-400"
      } h-[300px] py-3 rounded px-1 flex flex-col gap-3 ${
        history && "bg-gray-200 bg-opacity-80 text-opacity-80 opacity-70"
      }`}>
      <div>
        <h2 className="text-2xl font-semibold px-1 w-auto truncate">{title}</h2>
      </div>
      <hr />
      <div className="h-[140px]  overflow-y-auto px-1 ">
        <p className="text-sm text-neutral-600">{description}</p>
      </div>
      <div className="flex flex-col px-1 gap-2">
        <p className="text-sm font-semibold text-neutral-700 flex flex-col ">
          Fecha de inicio: <span className="text-xs">{startDate}</span>
        </p>
        <p className="text-sm font-semibold text-neutral-700 flex flex-col">
          Fecha de finalización:
          <span className="text-xs">{endDate}</span>
        </p>
      </div>
      {!history && (
        <div className={`grid grid-cols-2 gap-y-1 place-items-center`}>
          {!myEvent && (
            <button
              onClick={handleOpenModal}
              className="w-32 py-1 rounded-md text-white font-semibold bg-indigo-600 hover:bg-indigo-700">
              Ver más
            </button>
          )}
          {myEvent && (
            <button
              onClick={handleOpenModalEdit}
              className="w-32 py-1 rounded-md text-white font-semibold bg-indigo-600 hover:bg-indigo-700">
              Editar
            </button>
          )}
          {!pending && !myEvent && eventDetailStatus == 1 && (
            <button
              onClick={handleAttendEvent}
              className="w-32 py-1 rounded-md text-white font-semibold bg-indigo-600 hover:bg-indigo-700">
              Asistir
            </button>
          )}
          {myEvent && (
            <button
              onClick={handleOpenModalStats}
              className="w-32 py-1 rounded-md text-white font-semibold bg-indigo-600 hover:bg-indigo-700">
              Estadísticas
            </button>
          )}
          {myEvent && (
            <button
              onClick={handleToken}
              className="w-full py-1 rounded-md col-span-2 text-white font-semibold bg-indigo-600 hover:bg-indigo-700">
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
          <div className="bg-white p-4 rounded-lg">
            <p>¿Estás seguro de que quieres asistir a este evento?</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={confirmAttendEvent}
                className="mr-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Sí
              </button>
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
