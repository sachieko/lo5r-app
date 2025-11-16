import { useState, useEffect } from "react";
import axios from "axios";
import { TTechnique, TableColumn } from "./types";
const { VITE_API_URL, VITE_API_TEST, TEST_MODE } = import.meta.env;
const APIURL: string = TEST_MODE === "TRUE" ? VITE_API_TEST : VITE_API_URL;

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

// Format the description for the selected technique to be displayed
export const formatTechString = (tech: TTechnique) => {
  const { description, activation, effect, opportunities } = tech;
  let hasOpps: boolean = true;
  const opportunityStrings = opportunities.map((opp) => {
    if (opp.cost) {
      const { cost, ring, effect } = opp;
      return cost === null ? "" : `(${ring})${cost}: ${effect}`;
    }
    hasOpps = false;
    return;
  });
  const result = `${description ? description + "\n\n" : ""}${
    activation ? activation + "\n\n" : ""
  }${effect ? "Effect: " + effect + "\n\n" : ""}${
    hasOpps ? `Opportunities:\n${opportunityStrings.join("\n")}` : ""
  } `;
  return result;
};

// Define the columns we'd like for the table from the opportunity data type, header is the Column's visible title
export const columns: TableColumn<TTechnique, keyof TTechnique>[] = [
  {
    key: "name",
    header: "Technique",
  },
  {
    key: "rings",
    header: "Rings",
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
    key: "prerequisite",
    header: "Req",
  },
  {
    key: "book",
    header: "Book",
  },
  {
    key: "pg",
    header: "Pg",
  },
];
