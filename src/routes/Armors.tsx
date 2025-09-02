import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useArmors, columns } from "../helpers/useArmors";
import { Table } from "../components/Table";
import "./Armors.scss";
import { SearchBar } from "../components/SearchBar";
import { filterTable } from "../helpers/tableHelpers";
import { Armor } from "../helpers/types";
import { Helmet } from "react-helmet-async";

export const Armors = function () {
  const [filterWord, setFilterWord] = useState<string>("");
  const { dataId } = useParams() || 1;
  const navigate = useNavigate();
  const armors = useArmors();
  // Grab the string from the event value to make typescript happy about types
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterWord = event.target.value;
    setFilterWord(newFilterWord);
  };

  const handleRowClick = (row: Armor) => {
    const armorId = row.id;
    if (armorId === Number(dataId)) {
      return;
    }
    navigate(`/armors/${armorId}`, { replace: true });
  };

  const dataIndex = armors.findIndex((armor) => {
    return armor.id === Number(dataId);
  });
  const armor = armors[dataIndex];
  const ogDescription = armor
    ? `${armor.title}: Phys. ${armor.physical_resistance}, Supernat. ${
        armor.supernatural_resistance
      } ${armor.book + " pg." + armor.pg}`
    : "";

  return (
    <>
      <Helmet>
        <meta property="og:description" content={ogDescription} />
        <meta property="og:url" content="/armors" />
      </Helmet>
      <section className="armors">
        <div className="armors-table table-container">
          <SearchBar
            title="🔎"
            value={filterWord}
            onChange={handleChange}
            onFocus={() => {}}
            onBlur={() => {}}
          />
          <Table
            data={
              filterWord
                ? filterTable(armors, filterWord.trim().split(" "), columns)
                : armors
            }
            columns={columns}
            selected={Number(dataId)}
            rowClick={handleRowClick}
          />
        </div>
        <div className="armors-note">
          For details on a piece of armor please see the page in the reference
          book it is from, as sometimes there is helpful narrative information
          or other features that may not fit in the table.
        </div>
      </section>
    </>
  );
};
