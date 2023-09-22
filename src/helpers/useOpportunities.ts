import { useState, useEffect } from "react";
import axios from "axios";
import { IOpportunity } from "./interfaces";
const APIURL: string = import.meta.env.VITE_API_URL;

export const useOpportunities = function () {
  const [opportunities, setOpportunities] = useState<IOpportunity[]>([]);
  useEffect(() => {
    const getOpps = async function () {
      try {
        const results = await axios.get(`${APIURL}/opp/`);
        const data: IOpportunity[] = results.data; // Assuming the API response is an array of IOpportunity
        setOpportunities(data); // Update the state with the resolved data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getOpps();
  }, [APIURL]);
  return opportunities;
};