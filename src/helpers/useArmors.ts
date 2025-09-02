import { useState, useEffect } from "react";
import axios from "axios";
import { Armor, TableColumn } from "./types";
const { VITE_API_URL, VITE_API_TEST, TEST_MODE } = import.meta.env
const APIURL: string = TEST_MODE === "TRUE" ? VITE_API_TEST : VITE_API_URL;

export const useArmors = function () {
  const [armors, setArmors] = useState<Armor[]>([]);
  useEffect(() => {
    const getArmors = async function () {
      try {
        const results = await axios.get(`${APIURL}/armors/`);
        const data: Armor[] = results.data;
        setArmors(data); // Update the state with the resolved data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getArmors();
  }, [APIURL]);

  return armors;
};

export const columns: TableColumn<Armor, keyof Armor>[] = [
  {
    key: "title",
    header: "Armor",
  },
  {
    key: "physical_resistance",
    header: "Phys. Resist",
  },
  {
    key: "supernatural_resistance",
    header: "Supernat. Resist",
  },
  {
    key: "rarity",
    header: "Rarity",
  },
  {
    key: "cost",
    header: "Cost",
  },
  {
    key: "qualities",
    header: "Qualities",
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
