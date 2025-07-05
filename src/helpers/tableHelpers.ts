import { TableColumn } from "./types";

/*
This function takes in an array of object (usually from the API), a string of keywords to filter by, and columns array to search in
The generic type is because the objects in the API change for different routes.

It then looks at each property in the objects that matches a table column and if there is a match for the keyword in
the object of arr, it will be included in the result array. This allows the client to filter items in the table via search.

Note: Not case sensitive because it's inconvenient for mobile users
*/

export const filterTable = <T, K extends keyof T>(
  arr: T[],
  keywords: string[],
  columns: TableColumn<T, K>[],
  strictWords?: T[K][] | undefined,
  strictKey?: K
): T[] => {
  // Early convert all keywords to lowercase
  keywords = keywords.map((word) => {
    return word.toLowerCase();
  });
  // Find first strict keyword that matches and transform to match data by capitalizing first letter
  let strictKeyword = undefined;
  if (strictWords && strictKey) {
    strictKeyword = keywords.find((word) => strictWords.includes(word as T[K]));
    if (typeof strictKeyword === "string") {
      strictKeyword = strictKeyword[0].toUpperCase() + strictKeyword.slice(1);
    }
  }
  return arr.filter((row: T) => {
    // Check if any keywords match scrictKey, remove any rows that do not match strictKeyword
    if (strictKeyword && strictKey && strictKeyword !== row[strictKey]) {
      return false;
    }
    // Check if all keywords are contained in at least one of the columns
    return keywords.every((keyword) => {
      const lcKeyword: number | string = keyword;
      const isWholeN = /^\d+$/.test(lcKeyword);
      return columns.some((column) => {
        const columnValue = row[column.key];
        // If the column's property is a string, check if it includes the keyword
        if (
          typeof columnValue === "string" &&
          !isWholeN && // If the keyword is a number, skip
          columnValue.toLowerCase().includes(lcKeyword)
        ) {
          return true;
        }
        if (
          typeof columnValue === "number" &&
          isWholeN &&
          columnValue === Number(lcKeyword)
        ) {
          return true;
        }
        return false;
      });
    });
  });
};
