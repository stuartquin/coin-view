import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

import "./App.css";
import CoinSearch from "./CoinSearch";
import CoinAdd from "./CoinAdd";
import CoinList from "./CoinList";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={CoinList} />
          <Route path="/coins/:symbol" component={CoinAdd} />
          <Route exact path="/coins" component={CoinSearch} />
        </div>
      </Router>
    );
  }
}

export default App;
