import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ItemCard } from "../components/ItemCard";
import FetchedParagraphs from "../helpers/LinkParser";
import { useState, useEffect } from "react";
import { useRules, columns } from "../helpers/useRules";
import { Table } from "../components/Table";
import { TRule } from "../helpers/types";
import { SearchBar } from "../components/SearchBar";
import { filterTable } from "../helpers/tableHelpers";
import "./Rule.scss";

export default function Rule() {
  const rules = useRules();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({
    filter: "",
  });
  const { ruleId } = useParams() || 1;
  const filterWords = searchParams.get("filter") || "";
  const [fadeIn, setFadeIn] = useState<boolean>(true);

  // UseEffect to allow fade in of UI elements
  useEffect(() => {
    setFadeIn(false);
    const timeoutId = setTimeout(() => {
      setFadeIn(true);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [setFadeIn]);

  if (rules.length === 0) {
    return <div>Loading. . .</div>;
  }

  // Filter the table of rules if there are words to filter
  const filteredRules = filterWords
    ? filterTable(rules, filterWords.trim().split(" "), columns)
    : rules;
  // Grab the current rule using the id parameter
  const ruleIndex = rules.findIndex((rule) => {
    return rule.id == Number(ruleId);
  });
  const rule = rules[ruleIndex];

  // Handle table filter change
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

  // If a particular row is clicked, it should redirect to the rule url
  const handleRowClick = (row: TRule) => {
    if (Number(ruleId) === row.id) {
      // Don't do anything if they click the same row as the url
      return;
    }
    setFadeIn(false); // Hide the current element
    setTimeout(() => {
      setFadeIn(true);
      navigate(`/rules/${row.id}`); // change to the clicked url
    }, 300);
  };

  const cards = rule?.cards.map((card) => {
    return <ItemCard key={card.id} title={card.header} desc={card.content} />;
  });

  return (
    <>
      <div className="rule-table table-container">
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
          data={filteredRules}
          columns={columns}
          rowClick={handleRowClick}
          selected={Number(ruleId)}
        />
      </div>
      <div className={`detail-card fadeElement ${fadeIn ? "fade" : ""}`}>
        {rule ? (
          <div className="card outer-card">
            <div className="title">
              {rule.title}
              {rule.image ? <img src={rule.image} /> : null}
            </div>
            <div className="desc">
              {FetchedParagraphs([rule.detail])}
              {cards}
            </div>
          </div>
        ) : (
          <ItemCard
            title="Loading the Table"
            desc="Choose an element from the table"
          />
        )}
      </div>
    </>
  );
}
