import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { addCoin } from "../services/coins";
import "./CoinAdd.css";

class CoinAdd extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      amount: "",
    };
  }

  handleSave () {
    const { symbol } = this.props.match.params;
    const { amount } = this.state;

    addCoin(symbol, amount);
    this.props.history.push("/");
  }

  handleChange (evt) {
    this.setState({
      amount: evt.target.value,
    });
  }

  render () {
    const { symbol } = this.props.match.params;
    const { amount } = this.state;
    const placeholder = `Total ${symbol} to add`;

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
