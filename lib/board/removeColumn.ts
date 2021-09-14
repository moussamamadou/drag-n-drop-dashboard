import { IBoardData } from "../../Interface";
import { size } from "../common";

export const removeColumn = (
  data: IBoardData,
  setBoardData: React.Dispatch<React.SetStateAction<IBoardData>>,
  columnID: string
) => {
  let newData = data;
  newData.columns[columnID].rowOrder.map((rowToRemove) =>
    removeRow(data, setBoardData, rowToRemove, columnID)
  );

  delete newData.columns[columnID];

  const newColumnOrder = newData.columnOrder.filter(
    (item) => item !== columnID
  );

  newData = {
    ...newData,
    columnOrder: newData.columnOrder.filter((item) => item !== columnID),
  };

  setBoardData(newData);
};

export const removeRow = (
  data: IBoardData,
  setBoardData: React.Dispatch<React.SetStateAction<IBoardData>>,
  rowId: string,
  columnID: string
) => {
  let newData = data;
  if (size(newData.rows) > 0) delete newData.rows[rowId];

  const newRowOrder = data.columns[columnID].rowOrder.filter(
    (item) => item !== rowId
  );
  newData = {
    ...newData,
    columns: {
      ...newData.columns,
      [columnID]: {
        ...newData.columns[columnID],
        rowOrder: newRowOrder,
      },
    },
  };
  setBoardData(newData);
};
