import { Droppable } from "react-beautiful-dnd";
import ColumnList from "../DnD/DnDStructure/ColumnList";
import ColumnInputButton from "../DnD/DnDElements/ColumnInputButton";
import BoardDataContext from "./BoardDataContext";
import DnDContext from "../DnD/DnDContext";

export default function Board() {
  return (
    <BoardDataContext>
      <DnDContext>
        <div className="flex gap-1 m-3 w-full ">
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex"
              >
                <ColumnList />
                {provided.placeholder}
                <ColumnInputButton />
              </div>
            )}
          </Droppable>
        </div>
      </DnDContext>
    </BoardDataContext>
  );
}
