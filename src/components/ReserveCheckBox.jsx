import React from "react";

function ReserveCheckBox({ title, price, qItem }) {
  return (
    <div className="form-checkInput">
      <div className="checkinput-group">
        <input type="checkbox" name={title} id={title} />
        <label htmlFor={title}>{title}</label>
      </div>
      <div className="checkinput-group">
        <span>
          ${price} / {qItem}
        </span>
      </div>
    </div>
  );
}

export default ReserveCheckBox;
