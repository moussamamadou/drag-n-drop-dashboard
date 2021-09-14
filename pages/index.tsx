import { Droppable } from "react-beautiful-dnd";
import { useData } from "../components/DataContext";
import ColumnList from "../components/ColumnList";
import { addColumn } from "../lib/rowColumnManipulation";
import { useEffect, useState, useRef } from "react";
import Plus from "../public/Plus.svg";

export default function Home(): JSX.Element {
  const { data, setData } = useData();
  const [inputColumnVisible, setInputColumnVisible] = useState(false);
  const [inputColumnValue, setInputColumnValue] = useState("");
  const inputColumnRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    // console.log("🚀 ~ file: index.tsx ~ line 9 ~ Home ~ data", data);
  }, [data]);

  const createColumn = () => {
    if (inputColumnValue) {
      addColumn(data, setData, inputColumnValue);
      setInputColumnValue("");
    } else {
      setInputColumnValue("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColumnValue(e.target.value);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setInputColumnVisible(!inputColumnVisible);
      createColumn();
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setInputColumnVisible(!inputColumnVisible);
    createColumn();
  };

  useEffect(() => {
    console.log(inputColumnVisible);
    if (inputColumnVisible) {
      inputColumnRef.current?.focus();
    }
  }, [inputColumnVisible]);

  return (
    <div className="p-3 h-screen w-screen flex flex-col">
      <h1 className="text-3xl text-center p-1">Drag-n-Drop - Template</h1>
      <h2 className="text-lg text-center p-1">
        Build With : React.js - Next.js - TypeScript - TailwindCSS -
        React-Beautifull-DnD
      </h2>
      <div className="flex p-3 w-full h- flex-1 flex-grow">
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
              {data.columnOrder.map((columnId, index) => {
                const column = data.columns[columnId];
                return (
                  <ColumnList
                    key={column.id}
                    column={column}
                    rowMap={data.rows}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="flex ">
          {inputColumnVisible ? (
            <input
              type="text"
              ref={inputColumnRef}
              className="flex-grow h-12  w-72 p-2 border-2 border-solid rounded-lg border-indigo-200 focus:outline-none"
              value={inputColumnValue}
              onChange={handleChange}
              onKeyDown={handleKey}
              onBlur={handleBlur}
              placeholder="New list title..."
            />
          ) : (
            <button
              className="border-transparent flex justify-center items-center h-10 w-72 p-2 mt-2 font-bold bg-indigo-50 border-indigo-100  text-indigo-400 hover:text-white hover:bg-indigo-500 hover:border-indigo-500 border-2 hover:border-solid rounded-lg transition-all duration-300 "
              onClick={() => {
                setInputColumnVisible(!inputColumnVisible);
              }}
            >
              <Plus className="w-6 h-6 mr-2" /> Add another list
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
