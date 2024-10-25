import { useState, useEffect } from "react";
import axios from "axios";
import { TLore, TableColumn } from "./types";
const { VITE_API_URL, VITE_API_TEST, TEST_MODE } = import.meta.env
const APIURL: string = TEST_MODE === "TRUE" ? VITE_API_TEST : VITE_API_URL;

export const useLore = function () {
  const [lore, setLore] = useState<TLore[]>([]);
  useEffect(() => {
    const getLore = async function () {
      try {
        const results = await axios.get(`${APIURL}/lore/`);
        const data: TLore[] = results.data;
        setLore(data); // Update the state with the resolved data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getLore();
  }, [APIURL]);

  return lore;
};

export const columns: TableColumn<TLore, keyof TLore>[] = [
  {
    key: "title",
    header: "Lore",
  },
];