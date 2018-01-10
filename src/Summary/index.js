import React from "react";

import "./Summary.css";
import CoinList from "../CoinList";
import Spinner from "../Spinner";
import { getCoins, getSummary } from "../services/coins";
import { getPrices } from "../services/shapeshift";
import { asCurrency } from "../services/currency";

const FETCH_WAIT = 1 * 60 * 1000;

class Summary extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      coins: [],
      loading: true,
    };
  }

  componentDidMount () {
    this.fetchPrices();
    setInterval(() => this.fetchPrices(), FETCH_WAIT);
  }

  fetchPrices () {
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
        coins: selectedCoins,
        loading: false,
      });
    });
  }

  render () {
    const { loading, coins } = this.state;
    const { total, diff, percentage } = getSummary(coins);
    const className = diff > 0 ?
      "Summary--percent-up" :
      "Summary--percent-down";

    if (loading) {
      return <Spinner />;
    }

    if (!loading && coins.length === 0) {
      this.props.history.push("/coins");
    }

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
