import { useState, useEffect } from "react";
import axios from "axios";
import { TTerrain, TableColumn } from "./types";
const { VITE_API_URL, VITE_API_TEST, TEST_MODE } = import.meta.env
const APIURL: string = TEST_MODE === "TRUE" ? VITE_API_TEST : VITE_API_URL;

export const useTerrains = function () {
  const [terrains, setTerrains] = useState<TTerrain[]>([]);
  useEffect(() => {
    const getTerrains = async function () {
      try {
        const results = await axios.get(`${APIURL}/terrains/`);
        const data: TTerrain[] = results.data;
        setTerrains(data); // Update the state with the resolved data
      } catch (error) {
        console.error("Error fetching conditions data:", error);
      }
    };
    getTerrains();
  }, [APIURL]);

  return terrains;
};

export const columns: TableColumn<TTerrain, keyof TTerrain>[] = [
  {
    key: "title",
    header: "Terrain",
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
