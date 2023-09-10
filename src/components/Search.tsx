import axios from 'axios';
import { useEffect, useState } from 'react';
import { ISearch } from '../helpers/interfaces';
const APIURL: string = import.meta.env.VITE_API_URL;
import SearchList from './SearchList';
import './Search.scss';


export const Search = function() {
  // TO DO: Use search term to fetch results with axios
  const [searchItem, setSearchItem] = useState<string>('');
  const [searchData, setSearchData] = useState<ISearch[]>([]);
  const [searchFocused, setSearchFocused] = useState<boolean>(false);

  const search = async (query: string) => {
    setSearchData([]);
    try {
      const response = await axios.get(`${APIURL}/search?q=${query}`);
      const data: ISearch[] = response.data; // Response should match ISearch[]
      setSearchData(data); // Set data as the new search data
      setSearchFocused(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => { // Use a timeout to debounce the API call
      setSearchData([]);
      if (searchItem.trim() !== '') {
        search(searchItem); // If the search item isn't empty, make the API call
      }
      if (searchItem.trim() === '') {
        setSearchData([]); // Set to empty results if empty
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [searchItem]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchItem = event.target.value;
    setSearchFocused(false); // Hide results on new input
    setSearchItem(newSearchItem);
  };

  return (
    <div className='search-container'>
    <form onSubmit={(e) => e.preventDefault()}>
      <span>Search: </span>
        <input 
          type='search' 
          className='search' 
          onChange={(e) => handleInput(e)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setTimeout(() => {setSearchFocused(false)}, 300)} // Delay is used to allow search links to be clicked before disabling them
          value={searchItem}
          spellCheck='false'
            />
    </form>
      {searchItem ? (<SearchList searchItems={searchData} focused={searchFocused} />) : (<></>)}
    </div>
  );
};