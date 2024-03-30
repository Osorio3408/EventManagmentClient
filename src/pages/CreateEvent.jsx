import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const CreateEvent = () => {
  const navigate = useNavigate();

  const id = localStorage.getItem("id");

  const [data, setData] = useState({
    eventName: "",
    eventDescription: "",
    eventStatus: 1,
    eventUserId: id, // Actualizamos el valor con el estado userId
    eventTypeEventId: 0, // Tipo de evento seleccionado
    eventStartDate: "",
    eventEndDate: "",
    eventLimit: 0,
  });

  const [limit, setLimit] = useState(false);
  const [typeEvents, setTypeEvents] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/SignIn");
    }
  }, []);

  useEffect(() => {
    // Obtener los tipos de eventos al cargar el componente
    fetch("http://localhost:3000/api/typeEvents")
      .then((response) => response.json())
      .then((data) => {
        setTypeEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching type events:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que todos los campos estén completos
    if (
      !data.eventName ||
      !data.eventDescription ||
      !data.eventTypeEventId ||
      !data.eventStartDate ||
      !data.eventEndDate
    ) {
      // Mostrar mensaje de error con Toastify
      toast.error("Por favor complete todos los campos", { theme: "dark" });
      return;
    }
    fetch("http://localhost:3000/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        // Mostrar mensaje de éxito
        toast.success("Evento creado con éxito", {
          theme: "dark",
        });
        // Limpiar el formulario después de enviar los datos
        setData({
          eventName: "",
          eventDescription: "",
          eventStatus: 1,
          eventUserId: id,
          eventTypeEventId: 0,
          eventStartDate: "",
          eventEndDate: "",
          eventLimit: 0,
        });
      })
      .catch((error) => {
        // Mostrar mensaje de error
        toast.error(`Error al crear el evento: ${error.message}`, {
          theme: "dark",
        });
      });
  };

  return (
    <section className="w-full flex h-auto min-h-screen flex-col lg:flex-row">
      <Navbar activeEvent={true} />
      <div className="w-[100%] bg-white h-full pt-5 md:my-auto flex flex-col gap-5 lg:overflow-y-auto">
        <h2 className="text-center text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-10 md:mb-20">
          Crear evento
        </h2>
        <div className="2xl:max-w-5xl my-auto xl:max-w-4xl max-w-3xl border p-10 xl:px-16 2xl:px-20 border-neutral-300 bg-neutral-100 rounded mb-5 w-full mx-auto flex flex-col gap-5">
          <form className="space-y-4 2xl:space-y-10" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label
                className="font-semibold xl:text-xl text-neutral-600"
                htmlFor="eventName">
                Título <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                onChange={handleChange}
                id="eventName"
                value={data.eventName}
                name="eventName"
                className="px-3 py-1 2xl:text-xl text-lg border border-neutral-400 outline-none bg-white rounded xl:py-2"
              />
            </div>
            <div className="flex flex-col gap-1 relative">
              <label
                className="font-semibold xl:text-xl text-neutral-600"
                htmlFor="eventDescription">
                Descripción <span className="text-red-500">*</span>
              </label>
              <textarea
                onChange={handleChange}
                name="eventDescription"
                id="eventDescription"
                rows="5"
                value={data.eventDescription}
                maxLength={255}
                className={`resize-none outline-none px-3 py-1 2xl:text-xl text-lg bg-white rounded xl:py-2 border border-neutral-400 ${
                  limit ? "border-red-500" : "border-neutral-400"
                }`}></textarea>
              <span className="absolute -bottom-4 text-neutral-500 right-0 text-xs">
                Máximo 255 caracteres.
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="font-semibold xl:text-xl text-neutral-600"
                htmlFor="eventTypeEventId">
                Tipo de evento <span className="text-red-500">*</span>
              </label>
              <select
                name="eventTypeEventId"
                id="eventTypeEventId"
                value={data.eventTypeEventId}
                onChange={handleChange}
                className="px-3 py-1 2xl:text-xl text-lg border border-neutral-400 outline-none bg-white rounded xl:py-2">
                <option value="">Seleccione el tipo de evento</option>
                {typeEvents.map((event) => (
                  <option key={event.typeEventId} value={event.typeEventId}>
                    {event.typeEventName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="font-semibold xl:text-xl text-neutral-600"
                htmlFor="eventStartDate">
                Fecha y hora de inicio:
              </label>
              <input
                type="datetime-local"
                name="eventStartDate"
                id="eventStartDate"
                value={data.eventStartDate}
                className="px-3 py-1 2xl:text-xl text-lg border border-neutral-400 outline-none bg-white rounded xl:py-2"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="font-semibold xl:text-xl text-neutral-600"
                htmlFor="eventEndDate">
                Fecha y hora de finalización:
              </label>
              <input
                type="datetime-local"
                name="eventEndDate"
                id="eventEndDate"
                value={data.eventEndDate}
                className="px-3 py-1 2xl:text-xl text-lg border border-neutral-400 outline-none bg-white rounded xl:py-2"
                onChange={handleChange}
              />
            </div>
            {/* <div className="flex flex-col gap-1">
              <label htmlFor="eventLimit" className="font-semibold">
                Límite de participantes
              </label>
              <input
                type="number"
                id="eventLimit"
                name="eventLimit"
                value={data.eventLimit}
                onChange={handleChange}
                className="px-3 py-2 border border-neutral-400 rounded xl:py-2-lg outline-none focus:border-indigo-600"
                min={1}
                required
              />
            </div> */}
            <div className="w-full bg-slate-200">
              <button
                type="submit"
                className="w-full 2xl:text-2xl xl:text-xl text-lg px-3 py-1 xl:py-2 mx-auto bg-gradient-to-t from-indigo-500 to-indigo-700 hover:to-indigo-800 hover:from-indigo-600 text-white font-semibold rounded">
                Crear evento
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
