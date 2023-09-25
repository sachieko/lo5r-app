import { useState, useEffect } from "react";
import axios from "axios";
import { TOpportunity, TableColumn } from "./types";
const APIURL: string = import.meta.env.VITE_API_URL;

export const useOpportunities = function () {
  const [opportunities, setOpportunities] = useState<TOpportunity[]>([]);
  useEffect(() => {
    const getOpps = async function () {
      try {
        const results = await axios.get(`${APIURL}/opp/`);
        const data: TOpportunity[] = results.data; // Assuming the API response is an array of IOpportunity
        setOpportunities(data); // Update the state with the resolved data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getOpps();
  }, [APIURL]);
  return opportunities;
};

  // Define the columns we'd like for the table from the opportunity data type, header is the Column's visible title
  export const columns: TableColumn<TOpportunity, keyof TOpportunity>[] = [
    {
      key: "ring",
      header: "Ring",
    },
    {
      key: "category",
      header: "Category",
    },
    {
      key: "cost",
      header: "Cost",
    },
    {
      key: "effect",
      header: "Effect",
    },
    {
      key: "name",
      header: "Technique",
    },
  ];