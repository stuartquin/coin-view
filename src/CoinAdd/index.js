import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./CoinAdd.css";

const CoinAdd = ({ match }) => {
  const { symbol } = match.params;
  const placeholder = `Total ${symbol} to add`;

  return (
    <div className="CoinAdd container">
      <h3>Add {symbol}</h3>
      <input
        className="input"
        type="number"
        placeholder={placeholder}
      />
      <button className="button button--success">Save</button>
      <Link to="/coins" className="button">Cancel</Link>
    </div>
  );
};

CoinAdd.propTypes = {
  match: PropTypes.object.isRequired,
};

export default CoinAdd;
