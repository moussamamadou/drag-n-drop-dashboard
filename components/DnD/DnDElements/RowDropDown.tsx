import React, { Fragment } from "react";
import { useBoardData } from "../../Board/BoardDataContext";

import { Menu, Transition } from "@headlessui/react";
import DotsHorizontal from "../../../public/DotsHorizontal.svg";
import ArrowNarrowUp from "../../../public/ArrowNarrowUp.svg";
import ArrowNarrowDown from "../../../public/ArrowNarrowDown.svg";
import Pencil from "../../../public/Pencil.svg";
import Trash from "../../../public/Trash.svg";
import { removeRow, moveRow } from "../../../lib";
import { IRowDropDown } from "../../../Interface";

export const DropDownRow = ({
  inputRowVisible,
  setInputRowVisible,
  inputRowRef,
  rowID,
  columnID,
}: IRowDropDown) => {
  const { data, setBoardData } = useBoardData();
  const handleRenameRow = () => {
    setTimeout(() => {
      setInputRowVisible(!inputRowVisible);
      inputRowRef.current?.focus();
    }, 150);
  };

  return (
    <Menu as="div" className="relative flex flex-col align-right bg-white">
      <Menu.Button className="z-0 border-2 text-gray-400 bg-white border-transparent hover:border-blue-200 rounded-lg w-10 h-10 justify-center align-center transition-colors duration-300">
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
        <Menu.Items className="z-10 absolute right-0 w-56 mt-12 p-2 origin-top-right bg-white border-blue-200 border-2 rounded-lg filter drop-shadow focus:outline-none focus-visible:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className="flex items-center relative font-medium p-2 w-full rounded-lg hover:bg-blue-50 hover:text-blue-400 transition-colors duration-300"
                onClick={handleRenameRow}
              >
                <Pencil className="w-6 h-6 mr-2" /> Rename card
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className="flex items-center relative font-medium p-2 w-full rounded-lg hover:bg-blue-50 hover:text-blue-400 transition-colors duration-300"
                onClick={() =>
                  moveRow(data, setBoardData, rowID, columnID, "MOVE_UP")
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
                className="flex items-center relative font-medium p-2 w-full rounded-lg hover:bg-blue-50 hover:text-blue-400 transition-colors duration-300"
                onClick={() =>
                  moveRow(data, setBoardData, rowID, columnID, "MOVE_DOWN")
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
                className="flex items-center relative font-medium p-2 w-full rounded-lg  text-red-400 hover:bg-red-50 hover:text-red-400 transition-colors duration-300"
                onClick={() => removeRow(data, setBoardData, rowID, columnID)}
              >
                <Trash className="w-6 h-6 mr-2" /> Delete card
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default DropDownRow;
