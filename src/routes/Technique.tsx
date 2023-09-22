import { useState } from "react";
import { useTechniques } from "../helpers/useTechniques";
import { ITechnique } from "../helpers/interfaces";
import { Table, TableColumn } from "../components/Table";
import "./Opportunity.scss";
import { SearchBar } from "../components/SearchBar";

export const Opportunity = function () {
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
  // This filters the total data for the table locally rather than querying the API again
  const filterTable = (arr: any[], keyword: string): ITechnique[] => {
    const result = arr.filter((opportunity) => {
      for (const element of columns) {
        if (opportunity[element.key]?.toLowerCase().includes(` ${keyword}`)) {
          return true;
        }
      }
      return false;
    });
    return result;
  };
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
            ? filterTable(techniques, filterWord.toLowerCase())
            : techniques
        }
        columns={columns}
      />
    </div>
  );
};
