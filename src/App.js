import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

import "./App.css";
import CoinSearch from "./CoinSearch";
import CoinAdd from "./CoinAdd";


class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/coins">Coins</Link></li>
          </ul>

          <Route path="/coins/:symbol" component={CoinAdd} />
          <Route exact path="/coins" component={CoinSearch} />
        </div>
      </Router>
    );
  }
}

export default App;
