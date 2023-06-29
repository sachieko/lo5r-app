import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./App.scss";

const App = function() {
  const [searchItem, setSearchItem] = useState("")


  return (
    <>
      <nav>
        <Link to="/"><p className="title">App Header</p></Link>
        <form onSubmit={(e) => e.preventDefault()}>
          <span>Search: </span>
          <div className="gradient-border">
            <input type="text" className="gradient-content" onInput={(e) => setSearchItem(e.target.value)}></input>
          </div>
        </form>
      </nav>
      <div id="view">
        <Outlet />
      </div>
    </>
  )
}

export default App
