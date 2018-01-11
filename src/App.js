import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import "./App.css";
import CoinSearch from "./CoinSearch";
import CoinAdd from "./CoinAdd";
import Spinner from "./Spinner";
import Summary from "./Summary";
import { fetchCurrencyRates } from "./services/currency";

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount () {
    fetchCurrencyRates().then(() => {
      this.setState({
        loading: false
      });
    });
  }

  render () {
    if (this.state.loading) {
      return <Spinner />
    }

    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Summary} />
          <Route path="/coins/:symbol" component={CoinAdd} />
          <Route exact path="/coins" component={CoinSearch} />
        </div>
      </Router>
    );
  }
}

export default App;
