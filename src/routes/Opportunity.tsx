import { useState } from "react";
import { useOpportunities, columns } from "../helpers/useOpportunities";
import { Table } from "../components/Table";
import "./Opportunity.scss";
import { SearchBar } from "../components/SearchBar";
import { filterTable } from "../helpers/tableHelpers";

export const Opportunity = function () {
  const [filterWord, setFilterWord] = useState<string>("");
  const opps = useOpportunities();

  // Grab the string from the event value to make typescript happy about types
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterWord = event.target.value;
    setFilterWord(newFilterWord);
  };

  return (
    <div className="opp-table table-container">
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
                opps,
                filterWord.trim().split(" "),
                columns,
                ["air", "water", "fire", "earth", "void", "any"],
                "ring"
              )
            : opps
        }
        columns={columns}
        linkedCol={"name"}
        linkedID={"technique_id"}
        urlStart="/techniques/"
      />
    </div>
  );
};
