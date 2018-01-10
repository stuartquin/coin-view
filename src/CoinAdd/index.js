import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getPrices } from "../services/shapeshift";
import { asCurrency } from "../services/currency";
import {
  addCoin, getCoins, getOpeningPrice, deleteCoin
} from "../services/coins";
import "./CoinAdd.css";

class CoinAdd extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      amount: "",
      coin: null
    };
  }

  componentDidMount () {
    const { symbol } = this.props.match.params;
    const coins = getCoins();

    getPrices().then((res) => {
      const coin = res.find(r => r.symbol === symbol);
      const holding = coins.find(r => r.symbol === symbol) || {};

      this.setState({
        coin,
        amount: holding ? holding.amount : ""
      });
    });
  }

  handleSave () {
    const { coin, amount } = this.state;

    addCoin(coin, amount);
    this.props.history.push("/");
  }

  handleDelete () {
    deleteCoin(this.state.coin);
    this.props.history.push("/");
  }

  handleChange (evt) {
    this.setState({
      amount: evt.target.value,
    });
  }

  render () {
    const { symbol } = this.props.match.params;
    const { amount, coin } = this.state;
    const placeholder = `Total ${symbol} to add`;

    if (!coin) {
      return <h3>Loading...</h3>;
    }

    const diff = parseFloat(coin.price_usd) - getOpeningPrice(coin);
    const className = diff > 0 ?
      "Summary--percent-up" :
      "Summary--percent-down";

    return (
      <div>
        <h2 className="title">{symbol}</h2>
        <div className="Summary">
          <div className="Summary--Total">
            <div className="Summary--Total-amount">
              {asCurrency(coin.price_usd)}
            </div>
            <div className={className}>
              {asCurrency(diff)} ({coin.percent_change_24h}%)
            </div>
          </div>
        </div>
        <div className="CoinAdd container">
          <input
            className="input"
            type="number"
            value={amount}
            onChange={evt => this.handleChange(evt)}
            placeholder={placeholder}
          />
          <button
            onClick={() => this.handleSave()}
            className="button button--success"
          >
            Save
          </button>
          <button
            onClick={() => this.handleDelete()}
            className="button button--cancel"
          >
            Delete
          </button>
          <Link to="/" className="button">Cancel</Link>
        </div>
      </div>
    );
  }
}

CoinAdd.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default CoinAdd;
