import { Outlet, Link, useNavigation } from "react-router-dom";
import "./App.scss";
import { Search } from "./components/Search";

const App = function () {
  const navigation = useNavigation();

  return (
    <>
      <nav className="topNav">
        <Link to="/">
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
