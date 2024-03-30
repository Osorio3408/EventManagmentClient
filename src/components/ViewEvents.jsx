import React from "react";
import { Search } from "./Search";

export const ViewEvents = ({
  children,
  onSearchChange,
  onStartDate,
  onEndDate,
}) => {
  return (
    <div className="max-w-5xl mb-5  w-full mx-auto lg:overflow-y-auto py-10 flex flex-col gap-10">
      <Search
        onChange={onSearchChange}
        onChageStartDate={onStartDate}
        onChageEndDate={onEndDate}
      />
      <div className="w-full px-2 py-2 grid grid-cols-1 rounded  lg:grid-cols-2 xl:grid-cols-2 place-items-center gap-y-10">
        {children}
      </div>
      <div>{/* PAGINADOR */}</div>
    </div>
  );
};
