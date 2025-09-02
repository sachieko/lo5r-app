import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ItemCard } from "../components/ItemCard";
import { SearchBar } from "../components/SearchBar";
import { useEffect, useState } from "react";
import { Table } from "../components/Table";
import { filterTable } from "../helpers/tableHelpers";
import { TableColumn } from "../helpers/types";
import { Helmet } from "react-helmet-async";

type dataType = {
  id: number;
  title: string;
  detail: string;
  cards: {
    id: number;
    header: string;
    content: string;
  }[];
  book?: string;
  pg?: number;
};

type TableCardViewProps<T extends dataType, K extends keyof T> = {
  columns: Array<TableColumn<T, K>>;
  data: Array<T>;
  route: string;
  tableClass: string;
};

const fadeDelay: number = 150;

// Create headers for each column of the table
export const TableCardView = <T extends dataType, K extends keyof T>({
  columns,
  data,
  route,
  tableClass,
}: TableCardViewProps<T, K>): JSX.Element => {
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
      navigate(`/${route}/${row.id}`, { replace: true}); // change to the clicked url
    }, fadeDelay);
  };

  const cards = dataItem?.cards.map((card, index) => {
    return <ItemCard key={index} title={card.header} desc={card.content} />;
  });

  const ogDescription = `${dataItem.title} - ${
    dataItem.book ? dataItem.book + " page " + dataItem.pg?.toString() : ""
  }: ${dataItem.detail.slice(0, 20)}...`;
  return (
    <>
      <Helmet>
        <meta property="og:description" content={ogDescription} />
      </Helmet>
      <div className={`${tableClass} table-container`}>
        <SearchBar
          title="Filter:"
          value={filterWords}
          onChange={handleChange}
          onFocus={() => {}}
          onBlur={() => {}}
        />
        <Table
          data={filtereddata}
          columns={columns}
          rowClick={handleRowClick}
          selected={Number(dataId)}
        />
      </div>
      <div className={`detail-card fadeElement ${fadeIn ? "fade" : ""}`}>
        {dataItem ? (
          <ItemCard
            title={dataItem.title}
            desc={dataItem.detail}
            book={dataItem.book}
            pg={dataItem.pg}
          >
            {cards}
          </ItemCard>
        ) : (
          <ItemCard title="Loading the Table" desc="" />
        )}
      </div>
    </>
  );
};
