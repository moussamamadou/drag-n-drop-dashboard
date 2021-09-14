import React from "react";
import { useBoardData } from "../../Board/BoardDataContext";
import Column from "./Column";

const ColumnList = () => {
  const { data } = useBoardData();

  return (
    <>
      {data.columnOrder.map((columnID, index) => (
        <Column
          key={columnID}
          column={data.columns[columnID]}
          rows={data.columns[columnID].rowOrder.map(
            (rowId) => data.rows[rowId]
          )}
          index={index}
        />
      ))}
    </>
  );
};

export default ColumnList;
