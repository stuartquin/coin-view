import React from "react";
import { getCoins } from "../services/shapeshift";

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
      <div className="Coins">
        <div className="CoinFilter">
          <input
            type="search"
            value={filter}
            onChange={evt => this.handleFilterChange(evt)}
            placeholder="Search"
          />
        </div>

        {displayCoins.map(coin => (
          <div className="CoinCard--title">{coin.name}</div>
        ))}
      </div>
    );
  }
}


export default CoinSearch;
