import {
  useTechniques,
  formatTechString,
  columns,
} from "../helpers/useTechniques";
import { TTechnique } from "../helpers/types";
import { Table } from "../components/Table";
import "./Technique.scss";
import { SearchBar } from "../components/SearchBar";
import { filterTable } from "../helpers/tableHelpers";
import { useSearchParams } from "react-router-dom";
import { ItemCard } from "../components/ItemCard";
import { useEffect, useState } from "react";

export const Technique = function () {
  const [searchParams, setSearchParams] = useSearchParams({
    filter: "",
    tech: "1",
  });
  const filterWords = searchParams.get("filter") || "";
  const techId = searchParams.get("tech") || "1";
  const techniques = useTechniques();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const timeoutId = setTimeout(() => {
      const newTech = params.get("tech") || "1";
      setSearchParams((prev) => {
        prev.set("tech", newTech);
        return prev;
      });
      setFadeIn(true);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchParams, setSearchParams]);

  // Make a new array if it should be filtered using the filterTable helper
  // This means whether a user filters it or not we will always correctly display the selected element
  const filteredTechniques = filterWords
    ? filterTable(techniques, filterWords.trim().split(" "), columns)
    : techniques;
  // Find the index of the technique that matches the Id in the search param
  const techIndex = techniques.findIndex((tech) => tech.id === Number(techId));
  const technique = techniques[techIndex];

  // Grab the string from the event value to make typescript happy about types
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterWord = event.target.value;
    setSearchParams(
      (prev) => {
        prev.set("filter", newFilterWord);
        return prev;
      },
      { replace: true }
    );
  };

  // If a particular row is clicked, it should set the url param to be the techniques ID so it can be found in the array later
  const handleRowClick = (row: TTechnique) => {
    const techId = row.id;
    if (techId === Number(searchParams.get("tech"))) {
      return;
    }
    setFadeIn(false); // Hide the current element
    // Set the searchParam after the current element has been hidden
    setTimeout(() => {
      setSearchParams(
        (prev) => {
          prev.set("tech", techId.toString());
          return prev;
        },
        { replace: true }
      );
    }, 300);
  };

  return (
    <>
      <div className="tech-table table-container">
        <div className="search-container">
          <SearchBar
            title="Filter:"
            value={filterWords}
            onChange={handleChange}
            onFocus={() => {}}
            onBlur={() => {}}
          />
        </div>
        <Table
          data={filteredTechniques}
          columns={columns}
          rowClick={handleRowClick}
          selected={Number(techId)}
        />
      </div>
      <div className={`tech-card fadeElement ${fadeIn ? "fade" : ""}`}>
        {technique ? (
          <ItemCard
            title={
              technique.name + ` - ${technique.type} (Rank ${technique.rank})`
            }
            desc={formatTechString(technique)}
          />
        ) : (
          <ItemCard
            title={"Select a Technique from the Table"}
            desc={
              "If the table is empty, try a less strict filter. \nOpportunity spending options are represented by 💮 in the description."
            }
          />
        )}
      </div>
    </>
  );
};
