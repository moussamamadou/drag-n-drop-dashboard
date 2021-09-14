import React from "react";
import { IRowList } from "../Interface";
import Row from "./Row";

export default function RowList(props: IRowList) {
  const shouldComponentUpdate = (nextProps: IRowList) => {
    if (nextProps.rows === props.rows) {
      return false;
    }
    return true;
  };
  return (
    <>
      {props.rows.map((row, index) => (
        <Row key={row.id} row={row} index={index} columnId={props.columnId} />
      ))}
    </>
  );
}
