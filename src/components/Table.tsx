import React, { ReactNode, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TableColumn, TableProps } from "../helpers/types";

type TableData = {
  id: number;
};

type TableRowProps<T extends TableData, K extends keyof T> = {
  data: Array<T>;
  columns: Array<TableColumn<T, K>>;
  rowClick?: (row: T) => void;
  selected?: number | null;
  linkedCol?: keyof T;
  linkedID?: keyof T;
  urlStart?: string;
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
      <p key={`headCell-${index}`} className={`col-${index}`}>
        {column.header}
      </p>
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
  linkedCol,
  linkedID,
  urlStart,
}: TableRowProps<T, K>): JSX.Element => {
  // Create rows from the data
  const tableRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    console.log("Running useEffect:\n")
    if (tableRef.current) {
      console.log("Running use effect, tableRef:", JSON.stringify(tableRef));
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [tableRef.current]);
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
            <p key={`cell-${index2}`} className={`row-${index2}`}>
              {linkedCol == column.key &&
              linkedID &&
              urlStart &&
              row[column.key]
                ? ((
                    <Link
                      to={`${urlStart}${row[linkedID]}`}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      {row[column.key] as ReactNode}
                    </Link>
                  ) as ReactNode)
                : (row[column.key] as ReactNode)}
            </p>
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
  linkedCol,
  linkedID,
  urlStart,
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
          linkedCol={linkedCol}
          linkedID={linkedID}
          urlStart={urlStart}
        />
      </div>
    </>
  );
}
