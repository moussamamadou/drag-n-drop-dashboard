import React, { Fragment } from "react";
import { useBoardData } from "../../Board/BoardDataContext";

import { Menu, Transition } from "@headlessui/react";
import DotsHorizontal from "../../../public/DotsHorizontal.svg";
import ArrowNarrowLeft from "../../../public/ArrowNarrowLeft.svg";
import ArrowNarrowRight from "../../../public/ArrowNarrowRight.svg";
import Pencil from "../../../public/Pencil.svg";
import Trash from "../../../public/Trash.svg";
import { removeColumn, moveColumn } from "../../../lib";
import { IColumnDropDown } from "../../../Interface";

export const DropDownColumn = ({
  inputColumnVisible,
  setInputColumnVisible,
  inputColumnRef,
  columnID,
}: IColumnDropDown) => {
  const { data, setBoardData } = useBoardData();

  const handleRenameColumn = () => {
    setTimeout(() => {
      setInputColumnVisible(!inputColumnVisible);
      inputColumnRef.current?.focus();
    }, 150);
  };

  return (
    <Menu as="div" className="relative flex flex-col align-right">
      <Menu.Button className="flex border-2  text-gray-400 bg-white border-transparent hover:border-blue-200 rounded-lg w-10 h-10 justify-center align-center transition-colors duration-300">
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
        <Menu.Items className="z-10 absolute right-0 w-56 mt-12 p-2 origin-top-right bg-white rounded-lg filter drop-shadow-md border-blue-100 border-2 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className="flex items-center relative font-medium p-2 w-full rounded-lg    hover:bg-blue-50 hover:text-blue-400 transition-colors duration-300"
                onClick={handleRenameColumn}
              >
                <Pencil className="w-6 h-6 mr-2" /> Rename list
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className="flex items-center relative font-medium p-2 w-full rounded-lg hover:bg-blue-50 hover:text-blue-400 transition-colors duration-300"
                onClick={() =>
                  moveColumn(data, setBoardData, columnID, "MOVE_RIGHT")
                }
              >
                <ArrowNarrowRight className="w-6 h-6 mr-2" /> Move to right
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className="flex items-center relative font-medium p-2 w-full rounded-lg  hover:bg-blue-50 hover:text-blue-400 transition-colors duration-300"
                onClick={() =>
                  moveColumn(data, setBoardData, columnID, "MOVE_LEFT")
                }
              >
                <ArrowNarrowLeft className="w-6 h-6 mr-2" /> Move to left
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className="flex items-center relative font-medium p-2 w-full rounded-lg text-red-500 hover:bg-red-50 hover:text-red-400 transition-colors duration-300"
                onClick={() => removeColumn(data, setBoardData, columnID)}
              >
                <Trash className="w-6 h-6 mr-2" /> Delete list
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default DropDownColumn;
