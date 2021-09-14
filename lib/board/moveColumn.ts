import { IBoardData } from "../../Interface";
import { swap } from "../common";

export const moveColumn = (
  data: IBoardData,
  setBoardData: React.Dispatch<React.SetStateAction<IBoardData>>,
  columnID: string,
  direction: string
) => {
  let columnIndex = 0;
  let newColumnOrder = [];
  let newData;
  switch (direction) {
    case "MOVE_RIGHT":
      setTimeout(() => {
        data.columnOrder.map((column, index) => {
          if (column === columnID) columnIndex = index;
        });

        if (columnIndex >= data.columnOrder.length - 1) return;

        newColumnOrder = swap(data.columnOrder, columnIndex, columnIndex + 1);

        newData = {
          ...data,
          columnOrder: newColumnOrder,
        };

        setBoardData(newData);
      }, 150);

      break;
    case "MOVE_LEFT":
      setTimeout(() => {
        data.columnOrder.map((column, index) => {
          if (column === columnID) columnIndex = index;
        });

        if (columnIndex === 0) return;

        newColumnOrder = swap(data.columnOrder, columnIndex, columnIndex - 1);

        newData = {
          ...data,
          columnOrder: newColumnOrder,
        };

        setBoardData(newData);
      }, 150);
      break;
    default:
      break;
  }
};
