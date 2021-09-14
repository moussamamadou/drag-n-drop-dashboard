import { useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Props from "../../Interface";
import { useBoardData } from "../Board/BoardDataContext";

const DnDContext = ({ children }: Props) => {
  const { data, setBoardData } = useBoardData();

  const onDragStart = useCallback((start, provided) => {
    provided.announce(
      `You have lifted the row in position ${start.source.index + 1}`
    );
  }, []);

  const onDragUpdate = useCallback((update, provided) => {
    const message = update.destination
      ? `You have moved the row to position ${update.destination.index + 1}`
      : `You are currently not over a droppable area`;

    provided.announce(message);
  }, []);

  const onDragEnd = useCallback(
    (result, provided) => {
      const message = result.destination
        ? `You have moved the row from position
            ${result.source.index + 1} to ${result.destination.index + 1}`
        : `The row has been returned to its starting position of
            ${result.source.index + 1}`;

      provided.announce(message);

      const { destination, source, draggableId, type } = result;

      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      if (type === "column") {
        const newColumnOrder = Array.from(data.columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);

        const newData = {
          ...data,
          columnOrder: newColumnOrder,
        };
        setBoardData(newData);

        return;
      }

      const home = data.columns[source.droppableId];
      const foreign = data.columns[destination.droppableId];

      if (home === foreign) {
        const newRowOrder = Array.from(home.rowOrder);
        newRowOrder.splice(source.index, 1);
        newRowOrder.splice(destination.index, 0, draggableId);

        const newHome = {
          ...home,
          rowOrder: newRowOrder,
        };

        const newData = {
          ...data,
          columns: {
            ...data.columns,
            [newHome.id]: newHome,
          },
        };

        setBoardData(newData);

        return;
      }

      // moving from one list to another
      const homeRowOrder = Array.from(home.rowOrder);
      homeRowOrder.splice(source.index, 1);
      const newHome = {
        ...home,
        rowOrder: homeRowOrder,
      };

      const foreignRowOrder = Array.from(foreign.rowOrder);
      foreignRowOrder.splice(destination.index, 0, draggableId);
      const newForeign = {
        ...foreign,
        rowOrder: foreignRowOrder,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newHome.id]: newHome,
          [newForeign.id]: newForeign,
        },
      };

      setBoardData(newData);
    },
    [data]
  );
  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      {children}
    </DragDropContext>
  );
};

export default DnDContext;
