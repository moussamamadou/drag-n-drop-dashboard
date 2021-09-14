import React, { useRef, useState, useEffect } from "react";

import DropDownColumn from "./ColumnDropDown";
import { useBoardData } from "../../Board/BoardDataContext";
import { IColumnHeader } from "../../../Interface";

const ColumnHeader = ({ columnID, columnTitle }: IColumnHeader) => {
  const { data, setBoardData } = useBoardData();

  const inputColumnRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [inputColumnVisible, setInputColumnVisible] = useState(true);
  const [inputColumnTitle, setInputColumnTitle] = useState(columnTitle);

  const updateColumnTitle = () => {
    if (inputColumnTitle) {
      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [columnID]: {
            ...data.columns[columnID],
            title: inputColumnTitle,
          },
        },
      };
      setBoardData(newData);
    } else {
      setInputColumnTitle(columnTitle);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColumnTitle(e.target.value);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setInputColumnVisible(!inputColumnVisible);
      updateColumnTitle();
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setInputColumnVisible(!inputColumnVisible);
    updateColumnTitle();
  };

  useEffect(() => {
    if (!inputColumnVisible) {
      inputColumnRef.current?.focus();
    }
  }, [inputColumnVisible]);

  return (
    <>
      {inputColumnVisible ? (
        <div
          className="text-title"
          onClick={() => setInputColumnVisible(!inputColumnVisible)}
        >
          {columnTitle}
        </div>
      ) : (
        <input
          type="text"
          ref={inputColumnRef}
          className="input"
          value={inputColumnTitle}
          onChange={handleChange}
          onKeyDown={handleKey}
          onBlur={handleBlur}
          placeholder="Add title to list..."
        />
      )}
      <DropDownColumn
        inputColumnVisible={inputColumnVisible}
        setInputColumnVisible={setInputColumnVisible}
        inputColumnRef={inputColumnRef}
        columnID={columnID}
      />
    </>
  );
};
export default ColumnHeader;
