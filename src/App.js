import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import "./App.css";
import CoinSearch from "./CoinSearch";
import CoinAdd from "./CoinAdd";
import Summary from "./Summary";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Summary} />
        <Route path="/coins/:symbol" component={CoinAdd} />
        <Route exact path="/coins" component={CoinSearch} />
      </div>
    </Router>
  );
};

export default App;
