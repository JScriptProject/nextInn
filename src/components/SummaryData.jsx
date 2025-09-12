import React from "react";

function SummaryData({summaryTitle,summaryValue}) {
  return (
    <li>
      <h6>{summaryTitle}</h6> <p>{summaryValue}</p>
    </li>
  );
}

export default SummaryData;
