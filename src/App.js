import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from "./components/Menu";
import PokeList from "./components/PokeList";
import PokeInfo from "./components/PokeInfo";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <Switch>
          <Route exact path="/" component={PokeList} />
          <Route path="/pokemon/:pokemon" component={PokeInfo} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
