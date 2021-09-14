import React from "react";
import { IRowList } from "../../../Interface";
import Row from "./Row";

export default function RowList(props: IRowList) {
  return (
    <>
      {props.rows.map((row, index) => (
        <Row key={row.id} row={row} index={index} columnID={props.columnID} />
      ))}
    </>
  );
}
