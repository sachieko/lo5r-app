import { useState } from "react";
import { useOpportunities } from "../helpers/useOpportunities";
import { IOpportunity } from "../helpers/interfaces";
import { Table, TableColumn } from "../components/Table";
import "./Opportunity.scss";
import { SearchBar } from "../components/SearchBar";

export const Opportunity = function () {
  const [filterWord, setFilterWord] = useState<string>("");
  const opps = useOpportunities();

  // Define the columns we'd like for the table from the opportunity data type, header is the Column's visible title
  const columns: TableColumn<IOpportunity, keyof IOpportunity>[] = [
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
  // This filters the total data for the table locally rather than querying the API again
  const filterTable = (arr: any[], keyword: string): IOpportunity[] => {
    const result = arr.filter((opportunity) => {
      for (const element of columns) {
        if (opportunity[element.key]?.toLowerCase().includes(keyword)) {
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
        data={filterWord ? filterTable(opps, filterWord.toLowerCase()) : opps}
        columns={columns}
      />
    </div>
  );
};
