import { useState } from "react";
import { useOpportunities, columns } from "../helpers/useOpportunities";
import { Table } from "../components/Table";
import "./Opportunity.scss";
import { SearchBar } from "../components/SearchBar";
import { filterTable } from "../helpers/tableHelpers";
import { Helmet } from "react-helmet-async";

export const Opportunity = function () {
  const [filterWord, setFilterWord] = useState<string>("");
  const opps = useOpportunities();

  // Grab the string from the event value to make typescript happy about types
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterWord = event.target.value;
    setFilterWord(newFilterWord);
  };
  const ogDescription = `This page contains a list of examples you can spend opportunity, use them as is or for inspiration to come up with your own.`;

  return (
    <>
      <Helmet>
        <meta property="og:description" content={ogDescription} />
      </Helmet>
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
        />
      </div>
    </>
  );
};
