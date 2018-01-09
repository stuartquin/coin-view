import React from "react";
import { Link } from "react-router-dom";

import { getCoins } from "../services/shapeshift";
import Listing from "./Listing";

import "./CoinSearch.css";

const getDisplayCoins = (coins, filter) =>
  coins.filter((coin) => {
    return (
      coin.name.toLowerCase().indexOf(filter) > -1 ||
      coin.symbol.toLowerCase().indexOf(filter) > -1
    ) && coin.status === "available";
  });

class CoinSearch extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      coins: [],
      filter: "",
    };
  }

  componentDidMount() {
    getCoins().then((coins) => {
      this.setState({ coins: Object.values(coins) });
    });
  }

  handleFilterChange (evt) {
    this.setState({
      filter: evt.target.value,
    });
  }

  render() {
    const { coins, filter } = this.state;
    const displayCoins = getDisplayCoins(coins, filter);

    return (
      <div className="CoinSearch container">
        <div className="CoinSearch--Filter">
          <input
            type="search"
            className="input"
            value={filter}
            onChange={evt => this.handleFilterChange(evt)}
            placeholder="Search"
          />
        </div>

        <div className="CoinSearch--Listings">
          {displayCoins.map(coin => (
            <Link key={coin.symbol} to={`/coins/${coin.symbol}`}>
              <Listing coin={coin} />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default CoinSearch;
