import React from "react";

function ReserveCheckBox({ title, price, qItem }) {
  return (
    <div className="form-checkInput">
      <div className="checkinput-group">
        <label htmlFor={title}>
          <input type="checkbox" name={title} id={title} />
          <span className="checkbox-box"></span>
          <span className="checkbox-label">{title}</span>
        </label>
      </div>
      <div className="checkinput-group checkinput-group-pricing ">
        <span style={{fontFamily:"Roboto"}}>
          <span>₹</span>{price} / {qItem}
        </span>
      </div>
    </div>
  );
}

export default ReserveCheckBox;
