import React from "react";
import PropTypes from "prop-types";

import "./Listing.css";

const Listing = (props) => {
  const { coin, isSelected } = props;

  const className = isSelected ?
    "CoinSearch--Listing selected" :
    "CoinSearch--Listing";

  return (
    <div className={className}>
      <div className="CoinSearch--Listing--icon">
        <img src={coin.image} alt={coin.symbol} />
      </div>
      <div className="CoinSearch--Listing--title">
        {coin.name}
      </div>
    </div>
  );
};

Listing.propTypes = {
  coin: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default Listing;
