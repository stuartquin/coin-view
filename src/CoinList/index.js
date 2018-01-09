import React from "react";
import { Link } from "react-router-dom";

import CoinListItem from "./CoinListItem";
import { getCoins } from "../services/coins";
import { getPrices } from "../services/shapeshift";

class CoinList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      coins: [],
    };
  }

  componentDidMount () {
    const coins = getCoins();
    const symbols = coins.map(coin => coin.symbol);

    getPrices().then((res) => {
      const selectedCoins = res.filter(
        coin => symbols.indexOf(coin.symbol) > -1
      ).map((coin) => {
        return {
          ...coin,
          amount: coins[symbols.indexOf(coin.symbol)].amount,
          image: coins[symbols.indexOf(coin.symbol)].image,
        };
      });

      this.setState({
        coins: selectedCoins
      });
    });
  }

  render () {
    const { coins } = this.state;

    return (
      <div className="CoinList">
        {coins.map(coin => (
          <CoinListItem key={coin.symbol} coin={coin} />
        ))}
        <Link to="/coins" className="button button--success">
          Add Coin
        </Link>
      </div>
    );
  }
}

export default CoinList;
