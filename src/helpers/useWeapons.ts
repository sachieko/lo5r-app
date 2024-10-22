import { useState, useEffect } from "react";
import axios from "axios";
import { Weapon, TableColumn } from "./types";
const APIURL: string = import.meta.env.VITE_API_URL;

export const useWeapons = function () {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  useEffect(() => {
    const getWeapons = async function () {
      try {
        const results = await axios.get(`${APIURL}/weapons/`);
        const data: Weapon[] = results.data;
        setWeapons(data); // Update the state with the resolved data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getWeapons();
  }, [APIURL]);

  return weapons;
};

export const columns: TableColumn<Weapon, keyof Weapon>[] = [
  {
    key: "title",
    header: "Weapon",
  },
  {
    key: "type",
    header: "Type",
  },
  {
    key: "skill",
    header: "Skill",
  },
  {
    key: "range",
    header: "Range",
  },
  {
    key: "damage",
    header: "Damage 1h/2h",
  },
  {
    key: "deadliness",
    header: "Deadliness 1h/2h",
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
