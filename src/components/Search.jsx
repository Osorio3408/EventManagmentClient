import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

export const Search = ({ onChange, onChageStartDate, onChageEndDate }) => {
  const [searchText, setSearchText] = useState(""); // Control de estado para el valor del input
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setSearchText("");
    setEndDate("");
    setStartDate("");

    // console.log("a");
  }, [window.location.pathname]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchText(newValue);
    onChange(newValue); // Llama a la función onChange pasando el nuevo valor
  };

  const handleStartDate = (e) => {
    const newValue = e.target.value;
    setStartDate(newValue);
    onChageStartDate(newValue);
  };
  const handleEndDate = (e) => {
    const newValue = e.target.value;
    setEndDate(newValue);
    onChageEndDate(newValue);
  };

  return (
    <div className="xl:max-w-4xl 2xl:max-w-5xl w-full bg-neutral-50 space-y-5 mx-auto h-auto border border-neutral-300 py-5 px-3 2xl:px-8 2xl:py-12 rounded">
      <div className="flex gap-5 flex-col lg:flex-row">
        <div className="w-full relative">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Buscar.."
            value={searchText}
            onChange={handleInputChange} // Maneja cambios en el input
            className="outline-none px-2 py-1 2xl:py-2 border w-full border-neutral-300 rounded 2xl:text-xl"
          />
          <span className="absolute right-2 bottom-[4px] 2xl:bottom-[8px]">
            <SearchIcon size={18} />
          </span>
        </div>
        {/* <select className="border w-full lg:w-[20%] border-neutral-300 rounded px-5 py-1 bg-white">
          <option>Categoria</option>
        </select> */}
      </div>
      <div className="grid grid-cols-1 lg:flex justify-around gap-5 lg:gap-0">
        <input
          type="datetime-local"
          name="startDate"
          id="startDate"
          value={startDate} // Agrega un valor controlado para la fecha de inicio
          onChange={handleStartDate} // Maneja cambios en la fecha de inicio
          className="border border-neutral-300 px-2 py-1 2xl:py-2 2xl:text-xl rounded w-full lg:w-[30%]"
        />
        <input
          type="datetime-local"
          name="endDate"
          id="endDate"
          value={endDate} // Agrega un valor controlado para la fecha final
          onChange={handleEndDate} // Maneja cambios en la fecha final
          className="border border-neutral-300 px-2 py-1 2xl:py-2 2xl:text-xl rounded w-full lg:w-[30%]"
        />
        {/* <select className="border w-full lg:w-[30%] border-neutral-300 rounded px-5 py-1 bg-white">
          <option>Grupos</option>
        </select> */}
      </div>
    </div>
  );
};
