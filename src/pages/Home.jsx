import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { CardEvent } from "../components/CardEvent";
import { ViewEvents } from "../components/ViewEvents";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export const Home = () => {
  const path = window.location.pathname;

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate("/SignIn");
    }
  }, []);

  const avaible = path === "/";
  const pending = path === "/Pending";
  const history = path === "/History";

  const [searchText, setSearchText] = useState(""); // Control de estado para el valor de búsqueda
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [events, setEvents] = useState([]); // Estado para almacenar los eventos obtenidos del fetch

  const formatDateToDisplay = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const date = new Date(dateTimeString);
    return date.toLocaleString(undefined, options);
  };

  useEffect(() => {
    setSearchText("");
    setEndDate("");
    setStartDate("");
  }, [window.location.pathname]);

  useEffect(() => {
    // URL base del fetch
    let fetchUrl = "http://localhost:3000/api/events";

    // Condiciones para determinar la ruta y ajustar la URL del fetch
    if (pending) {
      fetchUrl = `http://localhost:3000/api/getEventsPending/${userId}`;
    }

    if(history){
      fetchUrl = `http://localhost:3000/api/events-history/${userId}`;
    }

    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, [path]); // Actualiza el efecto cuando cambia la ruta

  return (
    <section className="w-full flex h-autolg:min-h-screen flex-col lg:flex-row">
      <Navbar
        activeEvent={true}
        avaible={avaible}
        pending={pending}
        history={history}
      />
      <div className="w-[100%] bg-white h-screen pt-5 flex flex-col gap-5 ">
        <ViewEvents
          onSearchChange={setSearchText}
          onStartDate={setStartDate}
          onEndDate={setEndDate}
        >
          {avaible && Array.isArray(events) && events.length === 0 ? ( // Si no hay eventos disponibles
            <div className="text-center mt-5 text-gray-500">
              No hay eventos disponibles en este momento.
            </div>
          ) : (
           
            events
              .filter((event) => {
                const eventStartDate = new Date(event.eventStartDate);
                const eventEndDate = new Date(event.eventEndDate);
                const filterStartDate = startDate ? new Date(startDate) : null;
                const filterEndDate = endDate ? new Date(endDate) : null;

                // Filtra eventos que coincidan con el texto de búsqueda y las fechas seleccionadas
                return (
                  (event.eventName
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                    event.eventDescription
                      .toLowerCase()
                      .includes(searchText.toLowerCase())) &&
                  (!filterStartDate || eventStartDate >= filterStartDate) &&
                  (!filterEndDate || eventEndDate <= filterEndDate)
                );
              })
              .map((event, index) => (
                <CardEvent
                  key={index}
                  title={event.eventName}
                  description={event.eventDescription}
                  startDate={formatDateToDisplay(event.eventStartDate)}
                  endDate={formatDateToDisplay(event.eventEndDate)}
                  startDateS={event.eventStartDate}
                  endDateS={event.eventEndDate}
                  category={event.eventType}
                  limit={event.eventLimit}
                  eventDetailId={event.eventDetailId}
                  id={event.eventUserId}
                  eventDetailStatus={event.eventDetailStatus}
                  avaible={true}
                  home={true}
                />
              ))
          )}
          {pending &&
            Array.isArray(events) && // Verificar que events sea un array
            events
              .filter((event) => {
                const eventStartDate = new Date(event.eventStartDate);
                const eventEndDate = new Date(event.eventEndDate);
                const filterStartDate = startDate ? new Date(startDate) : null;
                const filterEndDate = endDate ? new Date(endDate) : null;

                // Filtra eventos que coincidan con el texto de búsqueda y las fechas seleccionadas
                return (
                  (event.eventName
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                    event.eventDescription
                      .toLowerCase()
                      .includes(searchText.toLowerCase())) &&
                  (!filterStartDate || eventStartDate >= filterStartDate) &&
                  (!filterEndDate || eventEndDate <= filterEndDate)
                );
              })
              .map((event, index) => (
                <CardEvent
                  key={index}
                  title={event.eventName}
                  description={event.eventDescription}
                  startDate={formatDateToDisplay(event.eventStartDate)}
                  endDate={formatDateToDisplay(event.eventEndDate)}
                  startDateS={event.eventStartDate}
                  endDateS={event.eventEndDate}
                  category={event.eventType}
                  limit={event.eventLimit}
                  eventDetailId={event.eventDetailId}
                  id={event.eventUserId}
                  home={true}
                  pending={true}
                />
              ))}
          {history &&
            Array.isArray(events) && // Verificar que events sea un array
            events
              .filter((event) => {
                const eventStartDate = new Date(event.eventStartDate);
                const eventEndDate = new Date(event.eventEndDate);
                const filterStartDate = startDate ? new Date(startDate) : null;
                const filterEndDate = endDate ? new Date(endDate) : null;

                // Filtra eventos que coincidan con el texto de búsqueda y las fechas seleccionadas
                return (
                  (event.eventName
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                    event.eventDescription
                      .toLowerCase()
                      .includes(searchText.toLowerCase())) &&
                  (!filterStartDate || eventStartDate >= filterStartDate) &&
                  (!filterEndDate || eventEndDate <= filterEndDate)
                );
              })
              .map((event, index) => (
                <CardEvent
                  key={index}
                  title={event.eventName}
                  description={event.eventDescription}
                  startDate={formatDateToDisplay(event.eventStartDate)}
                  endDate={formatDateToDisplay(event.eventEndDate)}
                  startDateS={event.eventStartDate}
                  endDateS={event.eventEndDate}
                  category={event.eventType}
                  limit={event.eventLimit}
                  eventDetailId={event.eventDetailId}
                  id={event.eventUserId}
                  home={true}
                  history={true}
                  avaible={false}
                />
              ))}
        </ViewEvents>
      </div>
    </section>
  );
};
