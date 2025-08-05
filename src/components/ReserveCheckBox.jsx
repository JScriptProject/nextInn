import React from "react";

function ReserveCheckBox({ title, price, qItem }) {
  return (
    <div className="form-checkInput">
      <div className="checkinput-group">
        <label htmlFor={title}>
          <input type="checkbox" name={title} id={title} />
          <span class="checkbox-box"></span>
          <span class="checkbox-label">{title}</span>
        </label>
      </div>
      <div className="checkinput-group checkinput-group-pricing ">
        <span>
          ${price} / {qItem}
        </span>
      </div>
    </div>
  );
}

export default ReserveCheckBox;
