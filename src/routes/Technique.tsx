import { useTechniques } from "../helpers/useTechniques";
import { TTechnique } from "../helpers/types";
import { Table, TableColumn } from "../components/Table";
import "./Technique.scss";
import { SearchBar } from "../components/SearchBar";
import { filterTable } from "../helpers/tableHelpers";
import { useSearchParams } from "react-router-dom";
import { ItemCard } from "../components/ItemCard";

export const Technique = function () {
  // const [filterWord, setFilterWord] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams({
    filter: "",
    tech: "1",
  });
  const filterWords = searchParams.get("filter") || "";
  const techId = searchParams.get("tech") || "1";
  const techniques = useTechniques();
  const technique = techniques.find((tech) => tech.id === Number(techId));
  // Define the columns we'd like for the table from the opportunity data type, header is the Column's visible title
  const columns: TableColumn<TTechnique, keyof TTechnique>[] = [
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
    setSearchParams(
      (prev) => {
        prev.set("filter", newFilterWord);
        return prev;
      },
      { replace: true }
    );
  };

  // If a particular row is clicked, it should set the url param to be the techniques ID so it can be found in the array later
  const handleRowclick = (row: TTechnique) => {
    const techId = row.id;
    setSearchParams(
      (prev) => {
        prev.set("tech", techId.toString());
        return prev;
      },
      { replace: true }
    );
  };

  const formatTechString = (tech: TTechnique) => {
    const { description, activation, effect } = tech;
    const opportunityStrings = tech.opportunities.map((opp) => {
      const { cost, effect } = opp;
      return `${cost} ${effect}`;
    });
    const result = `${description}\n${activation}\n${effect}\nOpportunities:\n${opportunityStrings.join(
      "\n"
    )}`;
    return result;
  };

  return (
    <>
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
          rowClick={handleRowclick}
        />
      </div>
      {technique ? (
        <ItemCard
          title={technique.name + ` - ${technique.type} (Rank ${technique.rank})`}
          desc={formatTechString(technique)}
        />
      ) : null}
    </>
  );
};
