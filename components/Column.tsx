import React, { Fragment, useState, useRef, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useData } from "../components/DataContext";
import RowList from "./RowList";
import { IColumn } from "../Interface";
import { addRow, removeColumn, moveColumn } from "../lib/rowColumnManipulation";
import DotsHorizontal from "../public/DotsHorizontal.svg";
import ArrowNarrowLeft from "../public/ArrowNarrowLeft.svg";
import Pencil from "../public/Pencil.svg";
import ArrowNarrowRight from "../public/ArrowNarrowRight.svg";
import Trash from "../public/Trash.svg";
import Plus from "../public/Plus.svg";

const Column = (props: IColumn) => {
  const { data, setData } = useData();

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [titleVisible, setTitleVisible] = useState(true);
  const [inputValue, setInputValue] = useState(props.column.title);

  const updateColumnTitle = () => {
    if (inputValue) {
      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [props.column.id]: {
            ...data.columns[props.column.id],
            title: inputValue,
          },
        },
      };
      setData(newData);
    } else {
      setInputValue(props.column.title);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTitleVisible(!titleVisible);
      updateColumnTitle();
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTitleVisible(!titleVisible);
    updateColumnTitle();
  };

  const handleRename = () => {
    setTimeout(() => {
      setTitleVisible(!titleVisible);
      inputRef.current?.focus();
    }, 150);
  };

  useEffect(() => {
    if (!titleVisible) {
      inputRef.current?.focus();
    }
  }, [titleVisible]);

  const [inputRowVisible, setInputRowVisible] = useState(false);
  const [inputRowValue, setInputRowValue] = useState("");
  const inputColumnRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    // console.log("🚀 ~ file: index.tsx ~ line 9 ~ Home ~ data", data);
  }, [data]);

  const createRow = (columnID: string) => {
    if (inputRowValue) {
      addRow(data, setData, columnID, inputRowValue);
      setInputRowValue("");
    } else {
      setInputRowValue("");
    }
  };

  const handleChangeNewRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputRowValue(e.target.value);
  };

  const handleKeyNewRow = (
    e: React.KeyboardEvent<HTMLInputElement>,
    columnID: string
  ) => {
    if (e.key === "Enter") {
      setInputRowVisible(!inputRowVisible);
      createRow(columnID);
    }
  };

  const handleBlurNewRow = (
    e: React.FocusEvent<HTMLInputElement>,
    columnID: string
  ) => {
    setInputRowVisible(!inputRowVisible);
    createRow(columnID);
  };

  useEffect(() => {
    console.log(inputRowVisible);
    if (inputRowVisible) {
      inputColumnRef.current?.focus();
    }
  }, [inputRowVisible]);

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={`${
            snapshot.isDragging ? "bg-indigo-50y border-indigo-400" : "bg-white"
          } flex flex-col gap-2 bg-white rounded-lg w-72 border-2 border-solid p-3 m-2 border-transparent hover:border-indigo-200 transition-all duration-300`}
        >
          <div
            {...provided.dragHandleProps}
            className="flex justify-between w-full gap-2"
          >
            {titleVisible ? (
              <h1
                className="flex-grow p-2 border-2 border-solid border-transparent truncate"
                onClick={() => setTitleVisible(!titleVisible)}
              >
                {props.column.title}
              </h1>
            ) : (
              <input
                type="text"
                ref={inputRef}
                className="flex-grow  p-2 border-2 border-solid rounded-lg border-indigo-200 focus:outline-none"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKey}
                onBlur={handleBlur}
                placeholder="Add title to list..."
              />
            )}
            <Menu as="div" className="relative flex flex-col align-right">
              <Menu.Button className="flex border-2  text-gray-500 bg-white border-transparent hover:border-indigo-200 rounded-lg w-10 h-10 justify-center align-center">
                <DotsHorizontal />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 d ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="z-10 absolute right-0 w-56 mt-12 p-2 origin-top-right bg-white rounded-lg shadow-xl ring-2 ring-indigo-100 ring-opacity-60 focus:outline-non">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className="flex items-center relative font-medium p-2 w-full rounded-lg    hover:bg-indigo-50 hover:text-indigo-400 transition-colors duration-300"
                        onClick={handleRename}
                      >
                        <Pencil className="w-6 h-6 mr-2" /> Rename list
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className="flex items-center relative font-medium p-2 w-full rounded-lg hover:bg-indigo-50 hover:text-indigo-400 transition-colors duration-300"
                        onClick={() =>
                          moveColumn(
                            data,
                            setData,
                            props.column.id,
                            "MOVE_RIGHT"
                          )
                        }
                      >
                        <ArrowNarrowRight className="w-6 h-6 mr-2" /> Move to
                        right
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className="flex items-center relative font-medium p-2 w-full rounded-lg  hover:bg-indigo-50 hover:text-indigo-400 transition-colors duration-300"
                        onClick={() =>
                          moveColumn(
                            data,
                            setData,
                            props.column.id,
                            "MOVE_LEFT"
                          )
                        }
                      >
                        <ArrowNarrowLeft className="w-6 h-6 mr-2" /> Move to
                        left
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className="flex items-center relative font-medium p-2 w-full rounded-lg text-red-500 hover:bg-red-50 hover:text-red-400 transition-colors duration-300"
                        onClick={() =>
                          removeColumn(data, setData, props.column.id)
                        }
                      >
                        <Trash className="w-6 h-6 mr-2" /> Delete list
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <Droppable droppableId={props.column.id} type="Row">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`${
                  snapshot.isDraggingOver ? " bg-indigo-50" : "bg-transparent"
                }
                transition-colors duration-200 flex-grow min-h-[100px] `}
              >
                <RowList rows={props.rows} columnId={props.column.id} />
                {provided.placeholder}
                {inputRowVisible ? (
                  <input
                    type="text"
                    ref={inputColumnRef}
                    className="flex-grow h-12  w-full p-2 border-2 border-solid rounded-lg border-indigo-200 focus:outline-none"
                    value={inputRowValue}
                    onChange={handleChangeNewRow}
                    onKeyDown={(e) =>
                      handleKeyNewRow(
                        e,
                        provided.droppableProps["data-rbd-droppable-id"]
                      )
                    }
                    onBlur={(e) =>
                      handleBlurNewRow(
                        e,
                        provided.droppableProps["data-rbd-droppable-id"]
                      )
                    }
                    placeholder="New list title..."
                  />
                ) : (
                  <button
                    className="border-transparent flex justify-center items-center h-10 w-full p-2 mt-2 font-bold bg-indigo-50 border-indigo-100  text-indigo-400 hover:text-white hover:bg-indigo-500 hover:border-indigo-500 border-2 hover:border-solid rounded-lg transition-all duration-300 "
                    onClick={() => {
                      setInputRowVisible(!inputRowVisible);
                      // addColumn(data, setData, newColumnName);
                    }}
                  >
                    <Plus className="w-6 h-6 mr-2" /> Add a card
                  </button>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
