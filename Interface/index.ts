export interface IData {
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

export interface IValueDataContext {
  data: IData;
  setData: React.Dispatch<React.SetStateAction<IData>>;
}

export interface IColumnList {
  key: string;
  column: {
    id: string;
    title: string;
    rowOrder: string[];
  };
  rowMap: {
    [index: string]: {
      id: string;
      content: string;
    };
  };
  index: number;
}
export interface IColumn {
  column: {
    id: string;
    title: string;
    rowOrder: string[];
  };
  rows: Array<{
    id: string;
    content: string;
  }>;
  index: number;
}

export interface IRowList {
  rows: Array<{
    id: string;
    content: string;
  }>;
  columnId: string;
}

export interface IRow {
  key: string;
  row: {
    id: string;
    content: string;
  };
  columnId: string;
  index: number;
}

export type Props = {
  children?: JSX.Element;
};

export default Props;
