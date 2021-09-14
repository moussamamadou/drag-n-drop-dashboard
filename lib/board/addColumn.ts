import { IBoardData } from "../../Interface";

export const addColumn = (
  data: IBoardData,
  setBoardData: React.Dispatch<React.SetStateAction<IBoardData>>,
  newColumnTitle: string
) => {
  const newColumn = `column-${data.increment.columns + 1}`;
  const newIncrement = data.increment.columns + 1;

  const newData = {
    ...data,
    columns: {
      ...data.columns,
      [newColumn]: {
        id: newColumn,
        title: newColumnTitle,
        rowOrder: [],
      },
    },
    columnOrder: [...data.columnOrder, newColumn],

    increment: {
      ...data.increment,
      columns: newIncrement,
    },
  };

  setBoardData(newData);
};
