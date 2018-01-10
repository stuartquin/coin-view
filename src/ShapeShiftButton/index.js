import React from "react";
import PropTypes from "prop-types";

import "./ShapeShiftButton.css";

const SHAPESHIFT_KEY = "276d46e3458c1664c60782fa28e5eddcd29cdfb775c20f73666161d3ee996f1b2ad41bfe257ba5f59412fe65f2ff9a7e76fea6a3cc77f62034d9be3682798d14";

const ShapeShiftButton = ({ symbol }) => {
  const shiftLink = `https://shapeshift.io/shifty.html?destination=&output=${symbol}&apiKey=${SHAPESHIFT_KEY}`;

  return (
    <a href={shiftLink} className="button ShapeShiftButton">
      Buy with ShapeShift.io
    </a>
  );
};


ShapeShiftButton.propTypes = {
  symbol: PropTypes.string.isRequired
};

export default ShapeShiftButton;
