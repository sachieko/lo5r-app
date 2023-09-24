import { useState, useEffect } from "react";
import axios from "axios";
import { TOpportunity } from "./types";
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
