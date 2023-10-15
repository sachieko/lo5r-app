import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ItemCard } from "../components/ItemCard";
import { useLore, columns } from "../helpers/useLore";
import { SearchBar } from "../components/SearchBar";
import { TLore } from "../helpers/types";
import { useEffect, useState } from "react";
import { Table } from "../components/Table";
import { filterTable } from "../helpers/tableHelpers";
import "./Lore.scss";

export default function Lore() {
  const lore = useLore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({
    filter: "",
  });
  const { loreId } = useParams() || 1;
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
  
    if (lore.length === 0) {
      return <div>Loading. . .</div>;
    }
  
    // Filter the table of rules if there are words to filter
    const filteredLore = filterWords
      ? filterTable(lore, filterWords.trim().split(" "), columns)
      : lore;
    // Grab the current rule using the id parameter
    const loreIndex = lore.findIndex((loreItem) => {
      return loreItem.id == Number(loreId);
    });
    const loreItem = lore[loreIndex];
  
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
    const handleRowClick = (row: TLore) => {
      if (Number(loreId) === row.id) {
        // Don't do anything if they click the same row as the url
        return;
      }
      setFadeIn(false); // Hide the current element
      setTimeout(() => {
        setFadeIn(true);
        navigate(`/lore/${row.id}`); // change to the clicked url
      }, 300);
    };
  
    const cards = loreItem?.cards.map((card) => {
      return <ItemCard key={card.id} title={card.header} desc={card.content} />;
    });
  return (
    <>
      <div className="lore-table table-container">
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
          data={filteredLore}
          columns={columns}
          rowClick={handleRowClick}
          selected={Number(loreId)}
        />
      </div>
      <div className={`detail-card fadeElement ${fadeIn ? "fade" : ""}`}>
        {loreItem ? (
          <ItemCard 
          title={loreItem.title}
          desc={loreItem.detail}
          >{cards}</ItemCard>
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
