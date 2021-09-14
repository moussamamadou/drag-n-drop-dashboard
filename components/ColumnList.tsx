import React from "react";
import { IColumnList } from "../Interface";
import Column from "./Column";

export default function ColumnList(props: IColumnList) {
  const { column, rowMap, index } = props;

  const rows = column.rowOrder.map((rowId) => rowMap[rowId]);
  return <Column column={column} rows={rows} index={index} />;
}
