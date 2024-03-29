import { Calendar, CalendarCheck, Tag, X } from "lucide-react";
import React from "react";

export const ModalViewEvent = ({
  handleCloseModal,
  title,
  description,
  startDate,
  endDate,
  category,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 w-full my-auto flex justify-center items-center">
      <div className="max-w-3xl w-full mx-auto bg-white h-auto pb-5 rounded">
        <div className="flex justify-between items-center bg-indigo-800 text-white p-4 rounded-t">
          <h2 className="text-2xl font-bold">Detalles del Evento</h2>
          <button onClick={handleCloseModal}>
            <X size={28} />
          </button>
        </div>
        <div className="h-full px-4 py-2 space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">{title}</h2>
            <p className="text-neutral-800 text-lg">{description}</p>
          </div>
          <hr />
          <div className="space-y-4">
            <div className="space-y-5 border-b pb-4 rounded">
              <div className="flex items-center space-x-2 text-indigo-900 font-bold">
                <Calendar size={20} />
                <h3 className="text-lg ">Fechas del Evento</h3>
              </div>
              <div className="flex justify-between">
                <div className="text-lg">
                  <p>Fecha de inicio:</p>
                  <span className="text-neutral-700 font-semibold">
                    {startDate}
                  </span>
                </div>
                <div className="text-lg">
                  <p>Fecha de finalización:</p>
                  <span className="text-neutral-700 font-semibold">
                    {endDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-5 rounded">
              <div className="flex items-center space-x-2 text-indigo-900 font-bold">
                <Tag size={20} />
                <h3 className="text-lg ">{/* Participantes y  */}Categoria</h3>
              </div>
              <div className="flex justify-between">
                {/* <div className="flex gap-2 items-center text-lg">
                  <p className="font-semibold ">Para:</p>
                  <span className="text-neutral-700 font-semibold">
                    Grupo Administración
                  </span>
                </div> */}
                <div className="flex gap-2 items-center text-lg">
                  {/* <p className="font-semibold ">Categoria: </p> */}
                  <span className="text-neutral-800 font-semibold text-xl">
                    {category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
