import { useState, useEffect } from "react";
import axios from "axios";
import { Quality, TableColumn } from "./types";
const APIURL: string = import.meta.env.VITE_API_URL;

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
