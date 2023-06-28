import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './App.scss';

const App = function() {
  const [searchItem, setSearchItem] = useState('')


  return (
    <>
      <nav>
        <Link to='/'><p className='title'>App Header</p></Link>
        <form onSubmit={(e) => e.preventDefault()}>
          <span>Search: </span>
          <input type="text" onInput={(e) => setSearchItem(e.target.value)}></input>
        </form>
      </nav>
      <div className="card">
      </div>
      <div id="view">
        <Outlet />
      </div>
    </>
  )
}

export default App
