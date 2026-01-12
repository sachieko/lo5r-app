import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWeapons, columns } from "../helpers/useWeapons";
import { Table } from "../components/Table";
import "./Weapons.scss";
import { SearchBar } from "../components/SearchBar";
import { filterTable } from "../helpers/tableHelpers";
import { Weapon } from "../helpers/types";

export const Weapons = function () {
  const [filterWord, setFilterWord] = useState<string>("");
  const { dataId } = useParams() || 1;
  const navigate = useNavigate();
  const weapons = useWeapons();
  // Grab the string from the event value to make typescript happy about types
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterWord = event.target.value;
    setFilterWord(newFilterWord);
  };

  const handleRowClick = (row: Weapon) => {
      const weaponId = row.id;
      if (weaponId === Number(dataId)) {
        return;
      }
      navigate(`/weapons/${weaponId}`, { replace: true });
    };

  return (
    <>
      <section className="weapons">
        <div className="weapons-table table-container">
          <SearchBar
            title="🔎"
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
            selected={Number(dataId)}
            rowClick={handleRowClick}
          />
        </div>
        <div className="weapons-note">
          All weapons have their damage and deadliness displayed in the format
          of "1h/2h"
          <br />
          <br />
          If a weapon has multiple ways of using it, the two possibilities will
          be shown as "1h/2h or 1h/2h" where 1h/2h is replaced by the damage or deadliness in that grip.
          <br />
          <br />
          Weapons with different ranges will use a "/" to divide the range types based on how it's being used.
        </div>
      </section>
    </>
  );
};
