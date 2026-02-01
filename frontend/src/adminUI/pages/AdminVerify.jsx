import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOtpVerified } from "@redux/adminSlice.js";
import React, { useState, useRef, useEffect } from "react";
import {
  adminVerifySendEmail,
  adminVerifyOTP,
} from "@api/adminAthenticationApi.js";

function AdminVerify() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpSent, setOtpSent] = useState({ message: null, status: null });
  const [resend, setResend] = useState(false);
  const otpRefs = useRef([]);
  const dataFetchedRef = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Admin verify... ");
  const handleChange = (e, index) => {
    //getting the input value
    const value = e.target.value;

    //if value is not a number then return
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    //move the next if value eneterd
    if (value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1].focus();
    }
  };

  // LOGIC 2: Handle Backspace (Backward movement)
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      // If current input is empty and we are not in the first box
      if (!otp[index] && index > 0 && otpRefs.current[index - 1]) {
        // Move focus to previous box
        otpRefs.current[index - 1].focus();
      }
    }
  };

  // Bonus: Auto-focus the first box on mount
  useEffect(() => {
    if(dataFetchedRef.current) return;

    dataFetchedRef.current= true;
    console.log("inside Useeffect");
    //write an auth function to trigger to OTP
    (async () => {
      console.log("Inside useeffect callback function");
      const result = await adminVerifySendEmail();
      console.log("Frontend Result => ", result);
      setOtpSent({ message: result.message, status: result.success });
    })();
    //keep reading for response of the API and start the clock.

    if (otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, [resend]);


  //function to verify the otp
  const verifyAdminOTP = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    const updatedOTP = Number(otp.join(""));
    const result = await adminVerifyOTP(updatedOTP);
    console.log("OTP verification result =>",result);
    if(result.success)
    {
      dispatch(setOtpVerified());
      navigate("/verify-admin/login")
    }
    else{
      setOtpSent({message:result.message, success:false})
    }
  };

 const onResend =()=>{
   setResend(true);
   setOtp(new Array(6).fill(""));
   setOtpSent({message:"Resent otp",status:true});
   dataFetchedRef.current=false;
   otpRefs.current=[];
 }

  return (
    <div className="login-container">
      <div className="login-container-wrapper">
        <h2>Verify Admin</h2>
        <form onSubmit={verifyAdminOTP}>
          <p>We have code on admin email please enter below. </p>
          <div className="otp-input-wrapper">
            {otp.map((digit, index) => (
              <input
                type="text"
                inputMode="numeric"
                maxLength={1}
                key={index}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (otpRefs.current[index] = el)}
              />
            ))}
          </div>
          <button type="submit" className="btn-login btn-fill">
            Verify
          </button>
        </form>
        <div className="top-2 relative grid grid-cols-2">
          {otpSent.message ? (
            <p
              className={`${otpSent.status ? "text-green-900" : "text-red-900"}`}
            >
              {otpSent.message}
            </p>
          ) : (
            <p className="!text-black">Sending OTP...</p>
          )}
          {(!otpSent.status && otpSent.message) && <button className=" relative cursor-pointer text-sm" onClick={onResend}>Resend OTP</button>}
        </div>
      </div>
    </div>
  );
}

export default AdminVerify;
