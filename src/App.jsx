import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './App.css';

const App = function() {
  const [label, setLabel] = useState('')

  return (
    <>
      <Link to='/'><h1>App Header</h1></Link>
      <div>
        {label}
      </div>
      <div className="card">
        <form>
          <input type="text" onInput={(e) => setLabel(e.target.value)}></input>
        </form>
      </div>
      <div id="view">
        <Outlet />
      </div>
    </>
  )
}

export default App
