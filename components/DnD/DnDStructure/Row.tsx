import React from "react";
import { IRow } from "../../../Interface";
import { Draggable } from "react-beautiful-dnd";
import RowHeader from "../DnDElements/RowHeader";

const Row = (props: IRow) => {
  return (
    <Draggable draggableId={props.row.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          aria-roledescription="Press space bar to lift the Row"
          className={`${
            snapshot.isDragging ? "border-blue-600 drop-shadow-xl" : ""
          }
          flex flex-col gap-2 w-full p-3 rounded-lg bg-white my-2
          border-2 border-solid border-transparent border-blue-100  hover:border-blue-400 
          transition-colors duration-300`}
        >
          <div className="flex justify-between  items-center w-full gap-2">
            <RowHeader
              rowID={props.row.id}
              rowTitle={props.row.content}
              columnID={props.columnID}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Row;
