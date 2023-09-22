import { TableColumn } from "../components/Table";

/*
This function takes in an array of object (usually from the API), a keyword to filter by, and columns array to search in
The generic type is because the objects in the API change for different routes.

It then looks at each property in the objects that matches a table column and if there is a match for the keyword in
the object of arr, it will be included in the result array. This allows the client to filter items in the table via search.

Note: It is case sensitive because smart users will be able to use it more effectively and I want to reward them over naive users.
*/
export const filterTable = <T, K extends keyof T>(arr: T[], keyword: string, columns: TableColumn<T, K>[]): T[] => {
  const result = arr.filter((tableRow) => {
    for (const property of columns) {
      if (tableRow[property.key]?.toString().includes(keyword)) {
        return true;
      }
    }
    return false;
  });
  return result;
};