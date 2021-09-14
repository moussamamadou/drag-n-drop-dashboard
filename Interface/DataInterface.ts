export interface IBoardData {
  rows: {
    [index: string]: {
      id: string;
      content: string;
    };
  };
  columns: {
    [index: string]: {
      id: string;
      title: string;
      rowOrder: Array<string>;
    };
  };
  columnOrder: Array<string>;
  increment: {
    rows: number;
    columns: number;
  };
}

export interface IBoardDataContextValue {
  data: IBoardData;
  setBoardData: React.Dispatch<React.SetStateAction<IBoardData>>;
}
