import { Outlet, Link, useNavigation } from "react-router-dom";
import "./App.scss";
import { Search } from "./components/Search";
import { useEffect } from "react";
import { keywordMapStore } from "./helpers/keywordMap";

const App = function () {
  const navigation = useNavigation();
  useEffect(() => {
    keywordMapStore.fetchKeywordMap();
  }, []);

  return (
    <>
      <nav className="topNav">
        <Link to="/" className="navLink">
          <img src="/favicon.svg" alt="A flame in a pool with earth below and air above in a void" />
          <p className="title">L5RSRD</p>
        </Link>
        <Search />
      </nav>
      <div
        id="view"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
};

export default App;
