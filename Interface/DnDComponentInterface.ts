export interface IColumnHeader {
  columnID: string;
  columnTitle: string;
}

export interface IRowHeader {
  rowID: string;
  rowTitle: string;
  columnID: string;
}

export interface IRowDropDown {
  inputRowVisible: boolean;
  setInputRowVisible: React.Dispatch<React.SetStateAction<boolean>>;
  inputRowRef: React.MutableRefObject<HTMLInputElement>;
  rowID: string;
  columnID: string;
}

export interface IColumnDropDown {
  inputColumnVisible: boolean;
  setInputColumnVisible: React.Dispatch<React.SetStateAction<boolean>>;
  inputColumnRef: React.MutableRefObject<HTMLInputElement>;
  columnID: string;
}

export interface IRowInputButton {
  columnID: string;
}
