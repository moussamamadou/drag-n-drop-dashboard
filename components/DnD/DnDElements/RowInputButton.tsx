import React, { useRef, useState, useEffect } from "react";

import { addRow } from "../../../lib";
import { useBoardData } from "../../Board/BoardDataContext";
import { IRowInputButton } from "../../../Interface";
import Plus from "../../../public/Plus.svg";

const RowInputButton = ({ columnID }: IRowInputButton) => {
  const { data, setBoardData } = useBoardData();

  const [inputRowVisible, setInputRowVisible] = useState(false);
  const [inputRowValue, setInputRowValue] = useState("");
  const inputRowRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const createRow = (columnID: string) => {
    if (inputRowValue) {
      addRow(data, setBoardData, columnID, inputRowValue);
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
    if (inputRowVisible) {
      inputRowRef.current?.focus();
    }
  }, [inputRowVisible]);

  return (
    <>
      {inputRowVisible ? (
        <input
          type="text"
          ref={inputRowRef}
          className="input"
          value={inputRowValue}
          onChange={handleChangeNewRow}
          onKeyDown={(e) => handleKeyNewRow(e, columnID)}
          onBlur={(e) => handleBlurNewRow(e, columnID)}
          placeholder="Add a card title..."
        />
      ) : (
        <button
          className="button-blue"
          onClick={() => setInputRowVisible(!inputRowVisible)}
        >
          <Plus className="w-6 h-6 mr-2" /> Add a card
        </button>
      )}
    </>
  );
};

export default RowInputButton;
