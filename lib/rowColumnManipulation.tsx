import { IData } from "../Interface";

const size = function (obj: Object) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

export const addColumn = (
  data: IData,
  setData: React.Dispatch<React.SetStateAction<IData>>,
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

  setData(newData);
};

export const addRow = (
  data: IData,
  setData: React.Dispatch<React.SetStateAction<IData>>,
  columnId: string,
  newColumnTitle: string
) => {
  const newRow = `row-${data.increment.rows + 1}`;
  const newIncrement = data.increment.rows + 1;
  const newData = {
    ...data,
    rows: {
      ...data.rows,
      [newRow]: {
        id: newRow,
        content: newColumnTitle,
      },
    },
    columns: {
      ...data.columns,
      [columnId]: {
        ...data.columns[columnId],
        rowOrder: [...data.columns[columnId].rowOrder, newRow],
      },
    },
    increment: {
      ...data.increment,
      rows: newIncrement,
    },
  };

  setData(newData);
};

export const removeColumn = (
  data: IData,
  setData: React.Dispatch<React.SetStateAction<IData>>,
  columnId: string
) => {
  let newData = data;
  newData.columns[columnId].rowOrder.map((rowToRemove) =>
    removeRow(data, setData, rowToRemove, columnId)
  );

  delete newData.columns[columnId];

  const newColumnOrder = newData.columnOrder.filter(
    (item) => item !== columnId
  );

  newData = {
    ...newData,
    columnOrder: newData.columnOrder.filter((item) => item !== columnId),
  };

  setData(newData);
};

export const removeRow = (
  data: IData,
  setData: React.Dispatch<React.SetStateAction<IData>>,
  rowId: string,
  columnId: string
) => {
  let newData = data;
  if (size(newData.rows) > 0) delete newData.rows[rowId];

  const newRowOrder = data.columns[columnId].rowOrder.filter(
    (item) => item !== rowId
  );
  newData = {
    ...newData,
    columns: {
      ...newData.columns,
      [columnId]: {
        ...newData.columns[columnId],
        rowOrder: newRowOrder,
      },
    },
  };
  setData(newData);
};

const swap = (list: Array<string>, x: number, y: number) => {
  let z = list[y];
  list[y] = list[x];
  list[x] = z;

  return list;
};

export const moveColumn = (
  data: IData,
  setData: React.Dispatch<React.SetStateAction<IData>>,
  columnId: string,
  direction: string
) => {
  console.log("moveColumn - ", data, columnId, direction);

  let columnIndex = 0;
  let newColumnOrder = [];
  let newData;
  switch (direction) {
    case "MOVE_RIGHT":
      setTimeout(() => {
        data.columnOrder.map((column, index) => {
          if (column === columnId) columnIndex = index;
        });

        if (columnIndex >= data.columnOrder.length - 1) return;

        newColumnOrder = swap(data.columnOrder, columnIndex, columnIndex + 1);

        newData = {
          ...data,
          columnOrder: newColumnOrder,
        };

        setData(newData);
      }, 150);

      break;
    case "MOVE_LEFT":
      setTimeout(() => {
        data.columnOrder.map((column, index) => {
          if (column === columnId) columnIndex = index;
        });

        if (columnIndex === 0) return;

        newColumnOrder = swap(data.columnOrder, columnIndex, columnIndex - 1);

        newData = {
          ...data,
          columnOrder: newColumnOrder,
        };

        setData(newData);
      }, 150);
      break;
    default:
      break;
  }
};

export const moveRow = (
  data: IData,
  setData: React.Dispatch<React.SetStateAction<IData>>,
  rowId: string,
  columnId: string,
  direction: string
) => {
  let rowIndex = 0;
  let newRowOrder = [];
  let newData;
  switch (direction) {
    case "MOVE_DOWN":
      data.columns[columnId].rowOrder.map((row, index) => {
        if (row === rowId) rowIndex = index;
      });

      if (rowIndex >= data.columns[columnId].rowOrder.length - 1) break;

      newRowOrder = swap(
        data.columns[columnId].rowOrder,
        rowIndex,
        rowIndex + 1
      );

      newData = {
        ...data,
        columns: {
          ...data.columns,
          [columnId]: {
            ...data.columns[columnId],
            rowOrder: newRowOrder,
          },
        },
      };

      setData(newData);
      break;
    case "MOVE_UP":
      data.columns[columnId].rowOrder.map((row, index) => {
        if (row === rowId) rowIndex = index;
      });

      if (rowIndex === 0) break;

      newRowOrder = swap(
        data.columns[columnId].rowOrder,
        rowIndex,
        rowIndex - 1
      );

      newData = {
        ...data,
        columns: {
          ...data.columns,
          [columnId]: {
            ...data.columns[columnId],
            rowOrder: newRowOrder,
          },
        },
      };

      setData(newData);
      break;
    default:
      break;
  }
};
