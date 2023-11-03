import React from "react";

const CommSelection = ({ selection, center }) => {
  function processArrayToColumns(selection) {
    const columns = [];
    let currentColumn = [];

    for (let i = 0; i < selection.length; i++) {
      if (i === 0 || selection[i] === selection[i - 1]) {
        currentColumn.push(selection[i]);
      } else {
        columns.push(currentColumn);
        currentColumn = [selection[i]];
      }
    }

    columns.push(currentColumn);
    return columns;
  }
  const columns = processArrayToColumns(selection);
  return (
    <>
      <div className={`${center ? "justify-center" : ""} mt-5 flex text-lg`}>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="mr-3">
            {column.map((element, elementIndex) => (
              <div key={elementIndex}>{element}</div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default CommSelection;
