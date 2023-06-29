import { useState } from "react";
export const Search = function() {
  const [searchItem, setSearchItem] = useState("");

  return(
    <form onSubmit={(e) => e.preventDefault()}>
      <span>Search: </span>
        <input 
          type="search" 
          className="search" 
          onInput={(e) => setSearchItem(e.target.value)} 
          spellCheck="false"
            />
    </form>
  )
};