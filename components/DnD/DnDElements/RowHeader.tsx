import React, { useRef, useState, useEffect } from "react";

import DropDownRow from "./RowDropDown";
import { useBoardData } from "../../Board/BoardDataContext";
import { IRowHeader } from "../../../Interface";

const RowHeader = ({ rowID, rowTitle, columnID }: IRowHeader) => {
  const { data, setBoardData } = useBoardData();
  const inputRowRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [inputRowVisible, setInputRowVisible] = useState(false);
  const [inputRowTitle, setInputRowTitle] = useState(rowTitle);

  const updateRowTitle = () => {
    if (inputRowTitle) {
      const newData = {
        ...data,
        rows: {
          ...data.rows,
          [rowID]: {
            ...data.rows[rowID],
            content: inputRowTitle,
          },
        },
      };
      setBoardData(newData);
    } else {
      setInputRowTitle(rowTitle);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputRowTitle(e.target.value);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setInputRowVisible(!inputRowVisible);
      updateRowTitle();
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setInputRowVisible(!inputRowVisible);
    updateRowTitle();
  };

  useEffect(() => {
    if (inputRowVisible) {
      inputRowRef.current?.focus();
    }
  }, [inputRowVisible]);

  return (
    <>
      {!inputRowVisible ? (
        <div
          className="text-title"
          onClick={() => setInputRowVisible(!inputRowVisible)}
        >
          {rowTitle}
        </div>
      ) : (
        <input
          type="text"
          ref={inputRowRef}
          className="input"
          value={inputRowTitle}
          onChange={handleChange}
          onKeyDown={handleKey}
          onBlur={handleBlur}
          placeholder="Add title to card..."
        />
      )}
      <DropDownRow
        inputRowVisible={inputRowVisible}
        setInputRowVisible={setInputRowVisible}
        inputRowRef={inputRowRef}
        rowID={rowID}
        columnID={columnID}
      />
    </>
  );
};

export default RowHeader;
