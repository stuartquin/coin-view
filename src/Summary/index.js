import React from "react";

import "./Summary.css";
import CoinList from "../CoinList";
import { getCoins, getSummary } from "../services/coins";
import { getPrices } from "../services/shapeshift";
import { asCurrency } from "../services/currency";

class Summary extends React.Component {
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
    const { total, diff, percentage } = getSummary(coins);
    const className = diff > 0 ?
      "Summary--percent-up" :
      "Summary--percent-down";

    return (
      <div className="Summary">
        <div className="Summary--Total">
          <div className="Summary--Total-amount">
            {asCurrency(total)}
          </div>
          <div className={className}>
            {asCurrency(diff)} ({percentage}%)
          </div>
        </div>
        <CoinList coins={this.state.coins} />
      </div>
    );
  }
}

export default Summary;
