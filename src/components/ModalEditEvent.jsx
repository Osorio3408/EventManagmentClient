import { Calendar, Tag, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const ModalEditEvent = ({
  handleCloseModal,
  title,
  description,
  startDate,
  endDate,
  category,
  limit,
  eventId,
  eventDetailId,
  eventDetailStatus,
}) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [editedLimit, setEditedLimit] = useState(limit);
  const [startDateS, setStartDate] = useState(startDate);
  const [endDateS, setEndDate] = useState(endDate);

  console.log(eventDetailId);

  const dontEdit = eventDetailStatus == 2 || eventDetailStatus == 3;

  useEffect(() => {
    // Fetch de los tipos de eventos
    fetch("http://localhost:3000/api/typeEvents")
      .then((response) => response.json())
      .then((data) => {
        setEventTypes(data);
        // Establecer el tipo de evento seleccionado actualmente
        setSelectedEventType(
          data.find((eventType) => eventType.typeEventName === category)
        );
      })
      .catch((error) => {
        console.error("Error fetching event types:", error);
      });
  }, []);

  const handleSaveChanges = () => {
    // Convertir las fechas al formato adecuado
    const formattedStartDate = formatDateTimeToLocal(startDateS);
    const formattedEndDate = formatDateTimeToLocal(endDateS);

    // Aquí puedes guardar los cambios del evento editado, incluyendo el límite de asistentes
    const editedEvent = {
      title: editedTitle,
      description: editedDescription,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      category: selectedEventType ? selectedEventType.typeEventId : 0,
      limit: editedLimit,
    };

    console.log(editedEvent);

    // Realizar la solicitud PUT al servidor para actualizar el evento
    fetch(`http://localhost:3000/api/events/${eventId}/${eventDetailId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedEvent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        toast.success("Evento editado correctamente", {
          theme: "dark",
        });
        handleCloseModal();
        setTimeout(() => {
          location.reload();
        }, "3000");
        // Aquí podrías manejar cualquier acción adicional después de editar el evento
      })
      .catch((error) => {
        toast.error("Error al editar el evento:", {
          theme: "dark",
        });
        // Aquí podrías manejar el error de manera adecuada, por ejemplo, mostrando un mensaje al usuario
      });
  };

  // Función para formatear la fecha en formato YYYY-MM-DDTHH:MM en la zona horaria local
  const formatDateTimeToLocal = (dateTimeString) => {
    const date = new Date(dateTimeString);
    // Obtener la hora local en formato ISOString y cortar los últimos 5 caracteres (eliminar "Z" al final)
    const localISOString = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, -5);
    return localISOString;
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 w-full my-auto flex justify-center items-center">
      <div className="max-w-3xl w-full mx-auto bg-white h-auto pb-5 rounded">
        <div className="flex justify-between items-center bg-indigo-800 text-white p-4 rounded-t">
          <h2 className="text-2xl font-bold">Editar Evento</h2>
          <button onClick={handleCloseModal}>
            <X size={28} />
          </button>
        </div>
        <div className="h-full px-4 py-2 space-y-6">
          <div className="space-y-1">
            <input
              type="text"
              className="text-3xl font-semibold w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              disabled={dontEdit}
              placeholder="Título del evento"
            />
            <textarea
              rows="4"
              className="text-lg w-full px-4 py-2 resize-none border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              disabled={dontEdit}
              placeholder="Descripción del evento"
            />

            <select
              value={selectedEventType ? selectedEventType.typeEventId : ""}
              disabled={dontEdit}
              onChange={(e) =>
                setSelectedEventType(
                  eventTypes.find(
                    (eventType) =>
                      eventType.typeEventId === parseInt(e.target.value)
                  )
                )
              }
              className=" w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500">
              {/* <option value="">Seleccione la categoría</option> */}
              {eventTypes.map((eventType) => (
                <option
                  key={eventType.typeEventId}
                  value={eventType.typeEventId}>
                  {eventType.typeEventName}
                </option>
              ))}
            </select>
          </div>
          <hr />
          <div className="space-y-4">
            <div className="space-y-5 pb-4 rounded">
              <div className="flex items-center space-x-2 text-indigo-900 font-bold">
                <Tag size={20} />
                <h3 className="text-lg">Detalles del evento:</h3>
              </div>
              <div className="flex justify-between">
                <div className="text-lg">
                  <p>Fecha de inicio:</p>
                  <input
                    type="datetime-local"
                    className={`text-lg w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500`}
                    value={formatDateTimeToLocal(startDateS)}
                    disabled={dontEdit}
                    onChange={handleStartDateChange}
                  />
                </div>
                <div className="text-lg">
                  <p>Fecha de finalización:</p>
                  <input
                    type="datetime-local"
                    className={`text-lg w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500`}
                    value={formatDateTimeToLocal(endDateS)}
                    disabled={dontEdit}
                    onChange={handleEndDateChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="grid grid-cols-2 gap-x-[23%]">
                <div className=" text-lg">
                  <label htmlFor="limit">Limite de asistentes:</label>
                  <input
                    type="number"
                    disabled={dontEdit}
                    value={editedLimit}
                    onChange={(e) => setEditedLimit(e.target.value)}
                    className="text-lg w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="pt-4 px-4 flex justify-end rounded-b gap-4">
          <button
            onClick={handleSaveChanges}
            className="bg-indigo-800 text-white px-4 py-2 rounded hover:bg-indigo-900">
            Cancelar
          </button>
          <button
            onClick={handleSaveChanges}
            className={`${
              dontEdit && "hidden"
            } bg-indigo-800 text-white px-4 py-2 rounded hover:bg-indigo-900`}>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};
