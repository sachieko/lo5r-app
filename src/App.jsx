import { Outlet, Link, useNavigation } from "react-router-dom";
import "./App.scss";
import { Search } from "./components/Search";

const App = function() {
  const navigation = useNavigation();

  return (
    <>
      <nav>
        <Link to="/"><p className="title">App Header</p></Link>
        <Search />
      </nav>
      <div 
        id="view"
        className={navigation.state === "loading" ? "loading" : ""}>
        <Outlet />
      </div>
    </>
  )
}

export default App
