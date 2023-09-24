import { useState, useEffect } from "react";
import axios from "axios";
import { TTechnique } from "./types";
const APIURL: string = import.meta.env.VITE_API_URL;

export const useTechniques = function () {
  const [techniques, setTechniques] = useState<TTechnique[]>([]);

  useEffect(() => {
    const getTechniques = async function () {
      try {
        const results = await axios.get(`${APIURL}/techniques/`);
        const data: TTechnique[] = results.data;
        setTechniques(data); // Update the state with the resolved data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getTechniques();
  }, [APIURL]);

  return techniques;
};
