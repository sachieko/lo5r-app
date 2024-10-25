import { useState, useEffect } from "react";
import axios from "axios";
import { TCondition, TableColumn } from "./types";
const { VITE_API_URL, VITE_API_TEST, TEST_MODE } = import.meta.env
const APIURL: string = TEST_MODE === "TRUE" ? VITE_API_TEST : VITE_API_URL;

export const useConditions = function () {
  const [conditions, setConditions] = useState<TCondition[]>([]);
  useEffect(() => {
    const getConditions = async function () {
      try {
        const results = await axios.get(`${APIURL}/conditions/`);
        const data: TCondition[] = results.data;
        setConditions(data); // Update the state with the resolved data
      } catch (error) {
        console.error("Error fetching conditions data:", error);
      }
    };
    getConditions();
  }, [APIURL]);

  return conditions;
};

export const columns: TableColumn<TCondition, keyof TCondition>[] = [
  {
    key: "title",
    header: "Conditions",
  },
  {
    key: "book",
    header: "Source",
  },
  {
    key: "pg",
    header: "Page",
  },
];
