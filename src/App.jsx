import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./App.scss";
import { Search } from "./components/Search";

const App = function() {

  return (
    <>
      <nav>
        <Link to="/"><p className="title">App Header</p></Link>
        <Search />
      </nav>
      <div id="view">
        <Outlet />
      </div>
    </>
  )
}

export default App
