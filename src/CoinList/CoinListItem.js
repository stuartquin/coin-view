import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./CoinListItem.css";
import { asCurrency } from "../services/currency";

const getTotal = coin =>
  (parseFloat(coin.price_usd) * parseFloat(coin.amount)).toFixed(3);


const getChange = (coin, time, label) => {
  const period = `percent_change_${time}`;
  const change = parseFloat(coin[period]);
  const className = change > 0 ? "up" : "down";

  return (
    <div className={`CoinListItem--percent-${className}`}>
      <div className="CoinListItem--percent-label">{label}</div>
      {change.toFixed(1)}%
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
        <div className="CoinListItem--title">{coin.symbol}</div>
        <div className="CoinListItem--value">
          {asCurrency(coin.price_usd)}
        </div>
      </div>
      <div className="CoinListItem--holdings">
        {coin.amount ? (
          <React.Fragment>
            <div className="CoinListItem--title">
              {coin.amount}
            </div>
            <div className="CoinListItem--value">
              {asCurrency(getTotal(coin))}
            </div>
          </React.Fragment>
        ) : null}
      </div>
      <div className="CoinListItem--change">
        {getChange(coin, "24h", "day")}
        {getChange(coin, "7d", "week")}
      </div>
    </Link>
  );
};

CoinListItem.propTypes = {
  coin: PropTypes.object.isRequired,
};

export default CoinListItem;
