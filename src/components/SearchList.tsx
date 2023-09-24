import { Link } from "react-router-dom";
import { TSearch } from "../helpers/types";

const SearchList = function ({
  searchItems,
  focused,
}: {
  searchItems: TSearch[];
  focused: boolean;
}) {
  const listComponent = searchItems.map((item, index) => {
    return (
      <Link key={index} to={item.link} className="search-item">
        <div className="search-item-title">{item.title}</div>
        <div className="search-detail">{[item.detail.slice(0, 50)]}...</div>
      </Link>
    );
  });

  return (
    <div className={`search-results ${focused ? "visible" : ""}`}>
      {searchItems.length > 0 ? (
        listComponent
      ) : (
        <div className="search-item">No results found.</div>
      )}
    </div>
  );
};

export default SearchList;
