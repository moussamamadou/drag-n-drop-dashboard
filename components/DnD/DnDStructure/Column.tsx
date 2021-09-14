import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import RowList from "./RowList";
import { IColumn } from "../../../Interface";
import ColumnHeader from "../DnDElements/ColumnHeader";
import RowInputButton from "../DnDElements/RowInputButton";

const Column = (props: IColumn) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`
          ${
            snapshot.isDragging ? "border-blue-600 border-3 drop-shadow-xl" : ""
          } 
          flex flex-col w-72 p-3 m-2 rounded-lg bg-white 
          border-2 border-solid border-transparent hover:border-blue-300 
          transition-colors duration-300`}
        >
          <div className="flex justify-between items-center w-full gap-2 px-2">
            <ColumnHeader
              columnID={props.column.id}
              columnTitle={props.column.title}
            />
          </div>
          <Droppable droppableId={props.column.id} type="Row">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`
                ${snapshot.draggingFromThisWith ? "bg-pink-50" : "bg-white"}
                ${snapshot.isDraggingOver ? " bg-blue-50" : "bg-transparent"}
                flex flex-col p-2 rounded-lg
                transition-colors duration-300 min-h-[100px] `}
              >
                <RowList rows={props.rows} columnID={props.column.id} />
                {provided.placeholder}
                <RowInputButton columnID={props.column.id} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
