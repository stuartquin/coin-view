import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getCoins } from "../services/shapeshift";
import { addCoin } from "../services/coins";
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

    getCoins().then((res) => {
      this.setState({
        coin: Object.values(res).find(r => r.symbol === symbol)
      });
    });
  }

  handleSave () {
    const { coin, amount } = this.state;

    addCoin(coin, amount);
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

    return (
      <div className="CoinAdd container">
        <h3>Update {symbol}</h3>
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
        <Link to="/coins" className="button">Cancel</Link>
      </div>
    );
  }
}

CoinAdd.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default CoinAdd;
