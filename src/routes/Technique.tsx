import { useState } from "react";
import { useTechniques } from "../helpers/useTechniques";
import { ITechnique } from "../helpers/interfaces";
import { Table, TableColumn } from "../components/Table";
import "./Opportunity.scss";
import { SearchBar } from "../components/SearchBar";
import { filterTable } from "../helpers/tableHelpers";

export const Technique = function () {
  const [filterWord, setFilterWord] = useState<string>("");
  const techniques = useTechniques();

  // Define the columns we'd like for the table from the opportunity data type, header is the Column's visible title
  const columns: TableColumn<ITechnique, keyof ITechnique>[] = [
    {
      key: "name",
      header: "Technique",
    },
    {
      key: "prerequisite",
      header: "Req",
    },
    {
      key: "rank",
      header: "Rank",
    },
    {
      key: "effect",
      header: "Effect",
    },
  ];

  // Grab the string from the event value to make typescript happy about types
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterWord = event.target.value;
    setFilterWord(newFilterWord);
  };

  return (
    <div className="table-container">
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
            ? filterTable(techniques, filterWord.trim().split(" "), columns)
            : techniques
        }
        columns={columns}
      />
    </div>
  );
};
