import { useState } from "react";
export const Search = function() {
  const [searchItem, setSearchItem] = useState("");
  
  return(
    <form onSubmit={(e) => e.preventDefault()}>
      <span>Search: </span>
      <div className="gradient-border">
        <input type="text" className="gradient-content" onInput={(e) => setSearchItem(e.target.value)}></input>
      </div>
    </form>
  )
};