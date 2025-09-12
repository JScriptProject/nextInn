import React, { useEffect } from "react";

function ReserveCheckBox({ title, price, qItem, name, handleCheckBoxInput }) {
  function handleChangeCheckBox(e) {
    const checkStatus = e.target.checked;
    console.log(name);
    handleCheckBoxInput(name, checkStatus);
  }


  return (
    <div className="form-checkInput">
      <div className="checkinput-group">
        <label htmlFor={title}>
          <input type="checkbox" name={name} id={title} onChange={handleChangeCheckBox} />
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
