import React from "react";

import { getPrices } from "../services/shapeshift";
import CoinListItem from "../CoinList/CoinListItem";

import "./CoinSearch.css";

const getDisplayCoins = (coins, filter) => {
  const lowerFilter = filter.toLowerCase();

  return coins.filter((coin) => {
    return (
      coin.name.toLowerCase().indexOf(lowerFilter) > -1 ||
      coin.symbol.toLowerCase().indexOf(lowerFilter) > -1
    );
  });
};

class CoinSearch extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      coins: [],
      filter: "",
    };
  }

  componentDidMount() {
    getPrices().then((coins) => {
      this.setState({ coins });
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
        <h2 className="title">Add Coins to Portfolio</h2>
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
            <CoinListItem key={coin.symbol} coin={coin} />
          ))}
        </div>
      </div>
    );
  }
}

export default CoinSearch;
