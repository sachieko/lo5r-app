import { useState, useEffect } from "react";
import axios from "axios";
import { Quality, TableColumn } from "./types";
const { VITE_API_URL, VITE_API_TEST, TEST_MODE } = import.meta.env
const APIURL: string = TEST_MODE === "TRUE" ? VITE_API_TEST : VITE_API_URL;

export const useQualities = function () {
  const [qualities, setQualities] = useState<Quality[]>([]);
  useEffect(() => {
    const getQualities = async function () {
      try {
        const results = await axios.get(`${APIURL}/qualities/`);
        const data: Quality[] = results.data;
        setQualities(data); // Update the state with the resolved data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getQualities();
  }, [APIURL]);

  return qualities;
};

export const columns: TableColumn<Quality, keyof Quality>[] = [
  {
    key: "title",
    header: "Quality",
  },
  {
    key: "book",
    header: "Book",
  },
  {
    key: "pg",
    header: "Page",
  },
];
