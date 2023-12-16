import { TableColumn } from "./types";

/*
This function takes in an array of object (usually from the API), a string of keywords to filter by, and columns array to search in
The generic type is because the objects in the API change for different routes.

It then looks at each property in the objects that matches a table column and if there is a match for the keyword in
the object of arr, it will be included in the result array. This allows the client to filter items in the table via search.

Note: Not case sensitive because it's inconvenient for mobile users
*/

const keyRings = ["air", "water", "earth", "fire", "void"];

export const filterTable = <T, K extends keyof T>(
  arr: T[],
  keywords: string[],
  columns: TableColumn<T, K>[]
): T[] => {
  // For each row
  return arr.filter((row) => {
    // Check if all keywords are contained in at least one of the columns
    return keywords.every((keyword) => {
      const lcWord = keyword.toLowerCase();
        return columns.some((column) => {
          const columnValue = row[column.key];
          // If the column's property is a string, check if it includes the keyword
          if (
            typeof columnValue === "string" &&
            columnValue.toLowerCase().includes(keyword.toLowerCase())
          ) {
            return true;
          }
          return false;
        });
    });
  });
};
