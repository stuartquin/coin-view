import React from "react";
import PropTypes from "prop-types";

import "./Summary.css";
import CoinList from "../CoinList";
import Spinner from "../Spinner";
import SummaryChange from "./SummaryChange";
import { getCoins, getSummary } from "../services/coins";
import { getPrices } from "../services/shapeshift";
import { asCurrency, setCurrency, getCurrency } from "../services/currency";

const FETCH_WAIT = 3 * 60 * 1000;

class Summary extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      coins: [],
      loading: true,
      currency: getCurrency()
    };
  }

  componentDidMount () {
    this.fetchPrices();
    setInterval(() => this.fetchPrices(), FETCH_WAIT);
  }

  handleChangeCurrency (evt) {
    const currency = evt.target.value;

    this.setState({
      currency
    });

    setCurrency(currency);
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
    const { total } = getSummary(coins, "24h");

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
            <select
              className="Summary--currency"
              value={this.state.currency}
              onChange={evt => this.handleChangeCurrency(evt)}
            >
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div className="SummaryChange">
            <SummaryChange
              summary={getSummary(coins, '24h')}
              label="24 hours"
            />
            <SummaryChange
              summary={getSummary(coins, '7d')}
              label="7 days"
            />
          </div>
        </div>
        <CoinList coins={this.state.coins} />
      </div>
    );
  }
}

Summary.propTypes = {
  history: PropTypes.object.isRequired
};

export default Summary;
