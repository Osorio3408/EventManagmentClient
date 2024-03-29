import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { ViewEvents } from "../components/ViewEvents";
import { CardEvent } from "../components/CardEvent";
import { useNavigate } from "react-router-dom";

export const MyEvents = () => {
  const path = window.location.pathname;

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/MyEvents");
    } else {
      navigate("/SignIn");
    }
  }, []);

  const [searchText, setSearchText] = useState(""); // Control de estado para el valor de búsqueda
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [events, setEvents] = useState([]); // Estado para almacenar los eventos obtenidos del fetch

  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetch("http://localhost:3000/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.filter(event=> event.eventUserId == userId));
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

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

  return (
    <section className="w-full flex h-autolg:min-h-screen flex-col lg:flex-row">
      <Navbar activeMyEvents={true} />
      <div className="w-[100%] bg-white h-screen pt-5 flex flex-col gap-5 ">
        <ViewEvents
          onSearchChange={setSearchText}
          onStartDate={setStartDate}
          onEndDate={setEndDate}
        >
          {events
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
                startDateS={event.eventStartDate}
                endDateS={event.eventEndDate}
                key={index}
                title={event.eventName}
                description={event.eventDescription}
                startDate={formatDateToDisplay(event.eventStartDate)}
                endDate={formatDateToDisplay(event.eventEndDate)}
                category={event.eventType}
                limit={event.eventLimit}
                id={event.eventUserId}
                eventDetailId={event.eventDetailId}
                eventId={event.eventId}
                eventDetailStatus={event.eventDetailStatus}
              />
            ))}
        </ViewEvents>
      </div>
    </section>
  );
};
