import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./CoinList.css";
import CoinListItem from "./CoinListItem";

const CoinList = ({ coins }) => {
  return (
    <div className="CoinList">
      {coins.map(coin => (
        <CoinListItem key={coin.symbol} coin={coin} />
      ))}
      <Link to="/coins" className="circle-button" />
    </div>
  );
};

CoinList.propTypes = {
  coins: PropTypes.array.isRequired,
};

export default CoinList;
