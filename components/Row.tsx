import React, { Fragment, useState, useRef, useEffect } from "react";
import { IRow } from "../Interface";
import { Menu, Transition } from "@headlessui/react";
import { Draggable } from "react-beautiful-dnd";
import { useData } from "./DataContext";
import { removeRow, moveRow } from "../lib/rowColumnManipulation";
import DotsHorizontal from "../public/DotsHorizontal.svg";
import ArrowNarrowUp from "../public/ArrowNarrowUp.svg";
import ArrowNarrowDown from "../public/ArrowNarrowDown.svg";
import Pencil from "../public/Pencil.svg";
import Trash from "../public/Trash.svg";

const Row = (props: IRow) => {
  const { data, setData } = useData();
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [titleVisible, setTitleVisible] = useState(true);
  const [inputValue, setInputValue] = useState(props.row.content);

  const updateRowTitle = () => {
    if (inputValue) {
      const newData = {
        ...data,
        rows: {
          ...data.rows,
          [props.row.id]: {
            ...data.rows[props.row.id],
            content: inputValue,
          },
        },
      };
      setData(newData);
    } else {
      setInputValue(props.row.content);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTitleVisible(!titleVisible);
      updateRowTitle();
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTitleVisible(!titleVisible);
    updateRowTitle();
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

  return (
    <Draggable draggableId={props.row.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          aria-roledescription="Press space bar to lift the Row"
          className={`${
            snapshot.isDragging ? "border-indigo-400" : "border-indigo-100"
          }
          border-2 border-solid mb-2 p-2 flex justify-between w-full gap-2  rounded-lg bg-white`}
        >
          <div className="flex justify-between w-full gap-2">
            {titleVisible ? (
              <h1
                className="flex-grow p-2 border-2 border-solid border-transparent truncate"
                onClick={() => setTitleVisible(!titleVisible)}
              >
                {props.row.content}
              </h1>
            ) : (
              <input
                type="text"
                ref={inputRef}
                className="flex-grow p-2 border-2 border-solid rounded-lg border-indigo-200 focus:outline-none"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKey}
                onBlur={handleBlur}
                placeholder="Add title to card..."
              />
            )}
            <Menu
              as="div"
              className="relative flex flex-col align-right bg-white"
            >
              <Menu.Button className="z-0 flex border-2  text-gray-500 bg-white border-transparent hover:border-indigo-200 rounded-lg w-10 h-10 justify-center align-center">
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
                <Menu.Items className="z-10 absolute right-0 w-56 mt-12 p-1 origin-top-right bg-white rounded-lg shadow-lg ring-2 ring-indigo-100 ring-opacity-60 focus:outline-non">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className="flex items-center relative font-medium p-2 w-full rounded-lg   text-gray-500  hover:bg-indigo-50 hover:text-indigo-400 transition-colors duration-500"
                        onClick={handleRename}
                      >
                        <Pencil className="w-6 h-6 mr-2" /> Rename card
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className="flex items-center relative font-medium p-2 w-full rounded-lg  text-gray-500  hover:bg-indigo-50 hover:text-indigo-400 transition-colors duration-500"
                        onClick={() =>
                          moveRow(
                            data,
                            setData,
                            props.row.id,
                            props.columnId,
                            "MOVE_UP"
                          )
                        }
                      >
                        <ArrowNarrowUp className="w-6 h-6 mr-2" /> Move Up
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className="flex items-center relative font-medium p-2 w-full rounded-lg   text-gray-500  hover:bg-indigo-50 hover:text-indigo-400 transition-colors duration-500"
                        onClick={() =>
                          moveRow(
                            data,
                            setData,
                            props.row.id,
                            props.columnId,
                            "MOVE_DOWN"
                          )
                        }
                      >
                        <ArrowNarrowDown className="w-6 h-6 mr-2" /> Move Down
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className="flex items-center relative font-medium p-2 w-full rounded-lg  text-red-500 hover:bg-red-50 hover:text-red-400 transition-colors duration-500"
                        onClick={() =>
                          removeRow(data, setData, props.row.id, props.columnId)
                        }
                      >
                        <Trash className="w-6 h-6 mr-2" /> Delete card
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Row;
