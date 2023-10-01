import { useState, useEffect } from "react";
import axios from "axios";
import { TRule, TableColumn } from "./types";
const APIURL: string = import.meta.env.VITE_API_URL;

export const useRules = function () {
  const [rules, setRules] = useState<TRule[]>([]);
  useEffect(() => {
    const getRules = async function () {
      try {
        const results = await axios.get(`${APIURL}/rules/`);
        const data: TRule[] = results.data;
        setRules(data); // Update the state with the resolved data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getRules();
  }, [APIURL]);

  return rules;
};

export const columns: TableColumn<TRule, keyof TRule>[] = [
  {
    key: "title",
    header: "Rule",
  },
];
