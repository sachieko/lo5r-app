import { useTechniques } from "../helpers/useTechniques";
import { ITechnique } from "../helpers/interfaces";
import { Table, TableColumn } from "../components/Table";
import "./Technique.scss";
import { SearchBar } from "../components/SearchBar";
import { filterTable } from "../helpers/tableHelpers";
import { useSearchParams } from "react-router-dom";

export const Technique = function () {
  // const [filterWord, setFilterWord] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams({ filter: "" });
  const filterWords = searchParams.get("filter") || "";
  const techniques = useTechniques();

  // Define the columns we'd like for the table from the opportunity data type, header is the Column's visible title
  const columns: TableColumn<ITechnique, keyof ITechnique>[] = [
    {
      key: "name",
      header: "Technique",
    },
    {
      key: "rank",
      header: "Rank",
    },
    {
      key: "type",
      header: "Type",
    },
    {
      key: "description",
      header: "Description",
    },
    {
      key: "prerequisite",
      header: "Req",
    },
  ];

  // Grab the string from the event value to make typescript happy about types
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterWord = event.target.value;
    setSearchParams((prev) => {
      prev.set("filter", newFilterWord);
      return prev;
    });
  };

  return (
    <div className="tech-table">
      <SearchBar
        title="Filter:"
        value={filterWords}
        onChange={handleChange}
        onFocus={() => {}}
        onBlur={() => {}}
      />
      <Table
        data={
          filterWords
            ? filterTable(techniques, filterWords.trim().split(" "), columns)
            : techniques
        }
        columns={columns}
      />
    </div>
  );
};
