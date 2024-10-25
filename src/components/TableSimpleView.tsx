import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ItemCard } from "../components/ItemCard";
import { SearchBar } from "../components/SearchBar";
import { useEffect, useState } from "react";
import { Table } from "../components/Table";
import { filterTable } from "../helpers/tableHelpers";
import { TableColumn } from "../helpers/types";

type colDataType = {
  id: number;
  title: string;
  detail: string;
  book?: string;
  pg?: number;
};

type TableSimpleViewProps<T extends colDataType, K extends keyof T> = {
  columns: Array<TableColumn<T, K>>;
  data: Array<T>;
  route: string;
  tableClass: string;
};

const fadeDelay: number = 150;

// Create headers for each column of the table
export const TableSimpleView = <T extends colDataType, K extends keyof T>({
  columns,
  data,
  route,
  tableClass,
}: TableSimpleViewProps<T, K>): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({
    filter: "",
  });
  const { dataId } = useParams() || 1;
  const filterWords = searchParams.get("filter") || "";
  const [fadeIn, setFadeIn] = useState<boolean>(true);

  // UseEffect to allow fade in of UI elements
  useEffect(() => {
    setFadeIn(false);
    const timeoutId = setTimeout(() => {
      setFadeIn(true);
    }, fadeDelay);

    return () => clearTimeout(timeoutId);
  }, [setFadeIn]);

  if (data.length === 0) {
    return <div>Loading. . .</div>;
  }

  // Filter the table if there are words to filter
  const filtereddata = filterWords
    ? filterTable(data, filterWords.trim().split(" "), columns)
    : data;
  // Grab the current data item using the id parameter
  const dataIndex = data.findIndex((dataItem) => {
    return dataItem.id == Number(dataId);
  });
  const dataItem = data[dataIndex];

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

  // If a particular row is clicked, it should redirect to the url
  const handleRowClick = (row: T) => {
    if (Number(dataId) === row.id) {
      // Don't do anything if they click the same row as the url
      return;
    }
    setFadeIn(false); // Hide the current element
    setTimeout(() => {
      setFadeIn(true);
      navigate(`/${route}/${row.id}`); // change to the clicked url
    }, fadeDelay);
  };
/* TODO: Maybe take a formatting function given 1 object to display from the table.
(dataItem) => {
dataitem?.cards.map(card => {
  return <ItemCard key={card.id} title={card.header} desc={card.content} />;
});
dataItem ? (
          <ItemCard title={dataItem.title} desc={dataItem.detail}>
            {cards}
          </ItemCard>
        ) : (
          <ItemCard
            title="Loading the Table"
            desc=""
          />
        )
*/
// }
  return (
    <>
        <div className="search-container">
          <SearchBar
            title="Filter:"
            value={filterWords}
            onChange={handleChange}
            onFocus={() => {}}
            onBlur={() => {}}
          />
        </div>
      <div className={`${tableClass} table-container`}>
        <Table
          data={filtereddata}
          columns={columns}
          rowClick={handleRowClick}
          selected={Number(dataId)}
        />
      </div>
      <div className={`detail-card fadeElement ${fadeIn ? "fade" : ""}`}>
        {dataItem ? (
          <ItemCard title={dataItem.title} desc={dataItem.detail} book={dataItem.book} pg={dataItem.pg} />
        ) : (
          <ItemCard
            title="Loading the Table"
            desc=""
          />
        )}
      </div>
    </>
  );
};
