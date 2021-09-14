import React, { useRef, useState, useEffect } from "react";

import { addColumn } from "../../../lib";
import { useBoardData } from "../../Board/BoardDataContext";
import Plus from "../../../public/Plus.svg";

const ColumnInputButton = () => {
  const { data, setBoardData } = useBoardData();
  const [inputColumnVisible, setInputColumnVisible] = useState(false);
  const [inputColumnValue, setInputColumnValue] = useState("");
  const inputColumnRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const createColumn = () => {
    if (inputColumnValue) {
      addColumn(data, setBoardData, inputColumnValue);
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
    if (inputColumnVisible) {
      inputColumnRef.current?.focus();
    }
  }, [inputColumnVisible]);
  return (
    <div className="w-72 m-2">
      {inputColumnVisible ? (
        <input
          type="text"
          ref={inputColumnRef}
          className="input"
          value={inputColumnValue}
          onChange={handleChange}
          onKeyDown={handleKey}
          onBlur={handleBlur}
          placeholder="Add a list title..."
        />
      ) : (
        <button
          className="button-blue"
          onClick={() => {
            setInputColumnVisible(!inputColumnVisible);
          }}
        >
          <Plus className="w-6 h-6 mr-2" /> Add a list
        </button>
      )}
    </div>
  );
};

export default ColumnInputButton;
