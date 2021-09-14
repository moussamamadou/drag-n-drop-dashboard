import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import Props, { IBoardData, IBoardDataContextValue } from "../../Interface";

const sampleData: IBoardData = {
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

const emptyData: IBoardData = {
  rows: {},
  columns: {},
  columnOrder: [],
  increment: {
    rows: 0,
    columns: 0,
  },
};

const Context = createContext({} as IBoardDataContextValue);

export default function BoardDataContext({ children }: Props) {
  const [data, setBoardData] = useState(emptyData);

  const valueData: IBoardDataContextValue = {
    data,
    setBoardData,
  };

  useEffect(() => {
    // console.log(
    //   "🚀 ~ file: BoardDataContext.tsx ~ line 56 ~ BoardDataContext ~ data",
    //   data
    // );
  }, [data]);
  return <Context.Provider value={valueData}>{children}</Context.Provider>;
}

export const useBoardData = () => useContext(Context);
