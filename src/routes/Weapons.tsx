import { useState } from "react";
import { useWeapons, columns } from "../helpers/useWeapons";
import { Table } from "../components/Table";
import "./Weapons.scss";
import { SearchBar } from "../components/SearchBar";
import { filterTable } from "../helpers/tableHelpers";

export const Weapons = function () {
  const [filterWord, setFilterWord] = useState<string>("");
  const weapons = useWeapons();

  // Grab the string from the event value to make typescript happy about types
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterWord = event.target.value;
    setFilterWord(newFilterWord);
  };

  return (
    <>
      <section className="weapons">
        <div className="weapons-table table-container">
          <SearchBar
            title="Filter:"
            value={filterWord}
            onChange={handleChange}
            onFocus={() => {}}
            onBlur={() => {}}
          />
          <Table
            data={
              filterWord
                ? filterTable(
                    weapons,
                    filterWord.trim().split(" "),
                    columns,
                    [
                      "sword",
                      "polearm",
                      "special",
                      "shield",
                      "blunt",
                      "bow",
                      "unarmed",
                      "axe",
                      "improvised",
                      "hand",
                    ],
                    "type"
                  )
                : weapons
            }
            columns={columns}
          />
        </div>
        <div className="weapons-note">
          All weapons have their damage and deadliness displayed in the format
          of "1h/2h"
          <br />
          <br />
          If a weapon has multiple ways of using it, the two possibilities will
          be shown as "1h/2h or 1h/2h"
          <br />
          <br />
        </div>
      </section>
    </>
  );
};
