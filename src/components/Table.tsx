import { ReactNode } from "react";

// Extends key of T creates a link between obj[key] and the key which is useful for row[column.key] later in the IDE
export type TableColumn<T, K extends keyof T> = {
  key: K;
  header: string;
};

export type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<TableColumn<T, K>>;
  rowClick?: (row: T) => void;
};

type TableRowProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<TableColumn<T, K>>;
  rowClick?: (row: T) => void;
};

type TableColProps<T, K extends keyof T> = {
  columns: Array<TableColumn<T, K>>;
};

// Create headers for each column of the table
const TableHeader = <T, K extends keyof T>({
  columns,
}: TableColProps<T, K>): JSX.Element => {
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
const TableRows = <T, K extends keyof T>({
  data,
  columns,
  rowClick,
}: TableRowProps<T, K>): JSX.Element => {
  // Create rows from the data
  const rows = data.map((row, index) => {
    return (
      <div
        key={`row-${index}`}
        className={`row`}
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
              {row[column.key] as ReactNode}
            </p>
          );
        })}
      </div>
    );
  });

  return <>{rows}</>;
};

export function Table<T, K extends keyof T>({
  data,
  columns,
  rowClick
}: TableProps<T, K>): JSX.Element {
  return (
    <div className="table">
      <TableHeader columns={columns} />
      <TableRows data={data} columns={columns} rowClick={rowClick}/>
    </div>
  );
}
