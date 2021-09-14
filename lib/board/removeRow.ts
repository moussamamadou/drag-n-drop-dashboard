import { IBoardData } from "../../Interface";
import { size } from "../common";

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
