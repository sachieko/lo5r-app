import axios from "axios";
import { useEffect, useState } from "react";
import { TSearch } from "../helpers/types";
const { VITE_API_URL, VITE_API_TEST, TEST_MODE } = import.meta.env
const APIURL: string = TEST_MODE === "TRUE" ? VITE_API_TEST : VITE_API_URL;
import SearchList from "./SearchList";
import "./Search.scss";
import { SearchBar } from "./SearchBar";

export const Search = function () {
  // Todo: use single state object
  const [searchItem, setSearchItem] = useState<string>("");
  const [searchData, setSearchData] = useState<TSearch[]>([]);
  const [searchFocused, setSearchFocused] = useState<boolean>(false);

  const search = async (query: string) => {
    setSearchData([]);
    try {
      const response = await axios.get(`${APIURL}/search?q=${query}`);
      const data: TSearch[] = response.data; // Response should match ISearch[]
      setSearchData(data); // Set data as the new search data
      setSearchFocused(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // Use a timeout to debounce the API call
      setSearchData([]);
      const newSearchItem = searchItem.trim();
      if (newSearchItem !== "") {
        search(newSearchItem); // If the search item isn't empty, make the API call
      }
      if (newSearchItem === "") {
        setSearchData([]); // Set to empty results if empty
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchItem]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchItem = event.target.value;
    setSearchFocused(false); // Hide results on new input
    setSearchItem(newSearchItem);
  };

  return (
    <div className="search-container">
      <SearchBar
        title="🔎"
        onChange={handleInput}
        onFocus={() => setSearchFocused(true)}
        onBlur={() =>
          setTimeout(() => {
            setSearchFocused(false);
          }, 300)
        }
        value={searchItem}
      />
      {searchItem ? (
        <SearchList searchItems={searchData} focused={searchFocused} />
      ) : (
        <></>
      )}
    </div>
  );
};
