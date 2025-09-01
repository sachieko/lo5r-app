import React, { ReactNode, useEffect, useRef } from "react"
import { TableColumn, TableProps } from "../helpers/types";
import LinkParsedText from "../helpers/LinkParser";

type TableData = {
  id: number;
};

type TableRowProps<T extends TableData, K extends keyof T> = {
  data: Array<T>;
  columns: Array<TableColumn<T, K>>;
  rowClick?: (row: T) => void;
  selected?: number | null;
};

type TableColProps<T, K extends keyof T> = {
  columns: Array<TableColumn<T, K>>;
};

// Create headers for each column of the table
const TableHeader = <T, K extends keyof T>({
  columns,
}: TableColProps<T, K>): React.JSX.Element => {
  const headers = columns.map((column, index) => {
    return (
      <div key={`headCell-${index}`} className={`col-${index}`}>
        {column.header}
      </div>
    );
  });

  return <div className="column-container">{headers}</div>;
};

// Create rows for each row of the table
const TableRows = <T extends TableData, K extends keyof T>({
  data,
  columns,
  rowClick,
  selected,
}: TableRowProps<T, K>): JSX.Element => {
  // Create rows from the data
  const tableRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (tableRef.current) {
        tableRef.current.scrollIntoView({ block: "center", behavior: "smooth", inline: "nearest"});
      }
    }, 500)
  }, []);
  const rows = data.map((row, index) => {
    return (
      <div
        key={`row-${index}`}
        className={`row ${row.id === selected ? "focusRow" : ""}`}
        ref={row.id === selected ? tableRef : null}
        onClick={
          rowClick
            ? () => {
                rowClick(row);
              }
            : () => {}
        }
      >
        {columns.map((column, index2) => {
          // For each row, we want to loop over the columns and only use the keys for the
          // columns we wish to add to our table in order to find the value in that cell
          return (
            <div key={`cell-${index2}`} className={`row-${index2}`}>
              {(typeof row[column.key] == "string" &&
              row[column.key])
                ? (<LinkParsedText text={row[column.key] as string}></LinkParsedText>)
                : (row[column.key] as ReactNode)}
            </div>
          );
        })}
      </div>
    );
  });

  return <>{rows}</>;
};

export function Table<T extends TableData, K extends keyof T>({
  data,
  columns,
  rowClick,
  selected,
}: TableProps<T, K>): JSX.Element {
  return (
    <>
      <TableHeader columns={columns} />
      <div className="table">
        <TableRows
          data={data}
          columns={columns}
          rowClick={rowClick}
          selected={selected}
        />
      </div>
    </>
  );
}
