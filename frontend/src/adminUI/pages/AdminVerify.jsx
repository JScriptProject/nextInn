import React, { useState, useRef } from "react";

function AdminVerify() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const otpRefs = useRef([]);

  const handleChange = (target, index) => {
    console.log("Target=>", target);
    console.log("Target.value=>", target.value);
    console.log("Index=>", index);
  };

  return (
    <div className="login-container">
      <div className="login-container-wrapper">
        <h2>Verify Admin</h2>
        <form>
          <p>We have code on admin email please enter below. </p>
          <div className="otp-input-wrapper">
            {otp.map((otpBox, index) => (
              <input
                type="text"
                inputMode="numeric"
                maxLength={1}
                key={index}
                onChange={(e) => handleChange(e.target, index)}
              />
            ))}
          </div>
          <button type="submit" className="btn-login btn-fill">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminVerify;
