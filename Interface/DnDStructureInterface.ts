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

export interface IRow {
  key: string;
  row: {
    id: string;
    content: string;
  };
  columnID: string;
  index: number;
}

export interface IRowList {
  rows: Array<{
    id: string;
    content: string;
  }>;
  columnID: string;
}
