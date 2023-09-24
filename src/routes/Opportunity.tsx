import { useState } from "react";
import { useOpportunities } from "../helpers/useOpportunities";
import { TOpportunity } from "../helpers/types";
import { Table, TableColumn } from "../components/Table";
import "./Opportunity.scss";
import { SearchBar } from "../components/SearchBar";
import { filterTable } from "../helpers/tableHelpers";

export const Opportunity = function () {
  const [filterWord, setFilterWord] = useState<string>("");
  const opps = useOpportunities();

  // Define the columns we'd like for the table from the opportunity data type, header is the Column's visible title
  const columns: TableColumn<TOpportunity, keyof TOpportunity>[] = [
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

  // Grab the string from the event value to make typescript happy about types
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterWord = event.target.value;
    setFilterWord(newFilterWord);
  };

  return (
    <div className="opp-table">
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
            ? filterTable(opps, filterWord.trim().split(" "), columns)
            : opps
        }
        columns={columns}
      />
    </div>
  );
};
