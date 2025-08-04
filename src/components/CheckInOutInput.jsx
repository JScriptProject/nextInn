import React from "react";

function CheckInOutInput({text}) {
  return (
    <div className="input-subgroup">
      <label htmlFor= {text}>{text}</label>
      <input type="date" name="checkin" id="checkin" />
    </div>
  );
}

export default CheckInOutInput;
