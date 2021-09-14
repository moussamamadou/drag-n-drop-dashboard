import React from "react";
import { createContext, useContext, useState } from "react";
import Props, { IData, IValueDataContext } from "../Interface";

const Context = createContext({} as IValueDataContext);
export const useData = () => useContext(Context);

const sampleData: IData = {
  rows: {
    "row-1": { id: "row-1", content: "row-1" },
    "row-2": { id: "row-2", content: "row-2" },
    "row-3": { id: "row-3", content: "row-3" },
    "row-4": { id: "row-4", content: "row-4" },
    "row-5": { id: "row-5", content: "row-5" },
    "row-6": { id: "row-6", content: "row-6" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      rowOrder: ["row-1", "row-2", "row-3", "row-4"],
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      rowOrder: ["row-5", "row-6"],
    },
  },
  columnOrder: ["column-1", "column-2"],
  increment: {
    rows: 6,
    columns: 2,
  },
};

const emptyData: IData = {
  rows: {},
  columns: {},
  columnOrder: [],
  increment: {
    rows: 0,
    columns: 0,
  },
};

export default function DataContext({ children }: Props) {
  const [data, setData] = useState(emptyData);

  const valueData: IValueDataContext = {
    data,
    setData,
  };

  return <Context.Provider value={valueData}>{children}</Context.Provider>;
}
