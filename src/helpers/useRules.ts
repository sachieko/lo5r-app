import { useState, useEffect } from "react";
import axios from "axios";
import { TRule, TableColumn } from "./types";
const { VITE_API_URL, VITE_API_TEST, TEST_MODE } = import.meta.env
const APIURL: string = TEST_MODE === "TRUE" ? VITE_API_TEST : VITE_API_URL;

export const useRules = function () {
  const [rules, setRules] = useState<TRule[]>([]);
  useEffect(() => {
    const getRules = async function () {
      try {
        const results = await axios.get(`${APIURL}/rules/`);
        const data: TRule[] = results.data;
        setRules(data); // Update the state with the resolved data
      } catch (error) {
        console.error("Error fetching data:", JSON.stringify(error));
      }
    };
    getRules();
  }, [APIURL]);

  return rules;
};

export const columns: TableColumn<TRule, keyof TRule>[] = [
  {
    key: "title",
    header: "Rules",
  },
];
