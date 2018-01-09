import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./CoinListItem.css";

const getTotal = coin =>
  (parseFloat(coin.price_usd) * parseFloat(coin.amount)).toFixed(3);

const asCurrency = (value, currency = "USD") =>
  `$${value}`;

const getChange = (coin) => {
  const change = parseFloat(coin.percent_change_24h);
  const className = change > 0 ? "up" : "down"

  return (
    <div className={`CoinListItem--percent-${className}`}>
      {change}%
    </div>
  );
};

const CoinListItem = ({ coin }) => {
  return (
    <Link to={`/coins/${coin.symbol}`} className="CoinListItem">
      <div className="CoinListItem--image">
        <img src={coin.image} alt={coin.symbol} />
      </div>
      <div className="CoinListItem--coin">
        <div className="CoinListItem--title">{coin.name}</div>
        <div className="CoinListItem--value">
          {asCurrency(coin.price_usd)}
        </div>
      </div>
      <div className="CoinListItem--holdings">
        <div className="CoinListItem--title">
          {asCurrency(getTotal(coin))}
        </div>
        <div className="CoinListItem--value">
          {`${coin.amount} ${coin.symbol}`}
        </div>
      </div>
      <div className="CoinListItem--change">
        {getChange(coin)}
      </div>
    </Link>
  );
};

CoinListItem.propTypes = {
  coin: PropTypes.object.isRequired,
};

export default CoinListItem;
