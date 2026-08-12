import { useState } from "react";
import { useOpportunities, columns } from "../helpers/useOpportunities";
import { Table } from "../components/Table";
import "./Opportunity.scss";
import { SearchBar } from "../components/SearchBar";
import { filterTable } from "../helpers/tableHelpers";
import { Link } from "react-router-dom";
const url = "techniques/63" // This is the technique at the top of the table when sorted.

export const Opportunity = function () {
  const [filterWord, setFilterWord] = useState<string>("");
  const opps = useOpportunities();

  // Grab the string from the event value to make typescript happy about types
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterWord = event.target.value;
    setFilterWord(newFilterWord);
  };

  return (
    <>
      <div className="opp-table table-container">
        <div className="opp-note">
          <span>
            These opportunities are suggestions from the rulebooks, and it's
            recommended to suggest your own to the GM.<br/> Opportunities attached to
            techniques are listed on the 
          </span>
          <Link to={url} className="link" target={"_blank"}
            rel={"noopener noreferrer"}> Techniques </Link>
          <span>page.</span>
        </div>
        <SearchBar
          title=""
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
                  "ring",
                )
              : opps
          }
          columns={columns}
        />
      </div>
    </>
  );
};
