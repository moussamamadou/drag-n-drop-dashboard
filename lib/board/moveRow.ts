import { IBoardData } from "../../Interface";
import { swap } from "../common";

export const moveRow = (
  data: IBoardData,
  setBoardData: React.Dispatch<React.SetStateAction<IBoardData>>,
  rowId: string,
  columnID: string,
  direction: string
) => {
  let rowIndex = 0;
  let newRowOrder = [];
  let newData;
  switch (direction) {
    case "MOVE_DOWN":
      data.columns[columnID].rowOrder.map((row, index) => {
        if (row === rowId) rowIndex = index;
      });

      if (rowIndex >= data.columns[columnID].rowOrder.length - 1) break;

      newRowOrder = swap(
        data.columns[columnID].rowOrder,
        rowIndex,
        rowIndex + 1
      );

      newData = {
        ...data,
        columns: {
          ...data.columns,
          [columnID]: {
            ...data.columns[columnID],
            rowOrder: newRowOrder,
          },
        },
      };

      setBoardData(newData);
      break;
    case "MOVE_UP":
      data.columns[columnID].rowOrder.map((row, index) => {
        if (row === rowId) rowIndex = index;
      });

      if (rowIndex === 0) break;

      newRowOrder = swap(
        data.columns[columnID].rowOrder,
        rowIndex,
        rowIndex - 1
      );

      newData = {
        ...data,
        columns: {
          ...data.columns,
          [columnID]: {
            ...data.columns[columnID],
            rowOrder: newRowOrder,
          },
        },
      };

      setBoardData(newData);
      break;
    default:
      break;
  }
};
