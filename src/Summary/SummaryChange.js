import React from "react";
import PropTypes from "prop-types";

import { asCurrency } from "../services/currency";
import "./SummaryChange.css";

const SummaryChange = ({ summary, label }) => {
  const { diff, percentage } = summary;
  const className = diff > 0 ?
    "SummaryChange--percent-up" :
    "SummaryChange--percent-down";

  return (
    <div className={className}>
      <div>{asCurrency(diff)}</div>
      <div>({percentage}%)</div>
      <div className="SummaryChange--period">{label}</div>
    </div>
  );
};

SummaryChange.propTypes = {
  summary: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
};

export default SummaryChange;
