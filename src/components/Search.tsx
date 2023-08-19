import { useState } from 'react';

export const Search = function() {
  // TO DO: Use search term to fetch results with axios
  const [, setSearchItem] = useState<string>('');

  return(
    <form onSubmit={(e) => e.preventDefault()}>
      <span>Search: </span>
        <input 
          type='search' 
          className='search' 
          onInput={(e) => setSearchItem(e.currentTarget.value)} 
          spellCheck='false'
            />
    </form>
  )
};