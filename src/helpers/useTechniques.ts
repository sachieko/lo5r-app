import { useState, useEffect } from "react";
import axios from "axios";
import { TTechnique, TableColumn } from "./types";
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

//Format the description for the selected technique to be displayed
export const formatTechString = (tech: TTechnique) => {
  const { description, activation, effect } = tech;
  const opportunityStrings = tech.opportunities.map((opp) => {
    const { cost, ring, effect } = opp;
    return cost == null ? '' : `(${ring})${cost}: ${effect}`;
  });
  const result = `${description}\n${activation}\n${effect}\nOpportunities:\n${opportunityStrings.join(
    "\n"
  )}`;
  return result;
};

// Define the columns we'd like for the table from the opportunity data type, header is the Column's visible title
export const columns: TableColumn<TTechnique, keyof TTechnique>[] = [
  {
    key: "name",
    header: "Technique",
  },
  {
    key: "rank",
    header: "Rank",
  },
  {
    key: "type",
    header: "Type",
  },
  {
    key: "book",
    header: "Book",
  },
  {
    key: "pg",
    header: "Pg",
  },
  {
    key: "prerequisite",
    header: "Req",
  },
];
