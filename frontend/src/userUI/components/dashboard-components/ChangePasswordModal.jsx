import React, { useState } from "react";
import { X } from "lucide-react";
import { updatePassoword } from "@api/authenticationApi.js";
import RedirectToLogin from "./RedirectToLogin";

function ChangePasswordModal({ onClose }) {
  const [isPasswordUpdated, setIsPasswordUpdated]= useState(false);
  const [errorMessage, setErrorMessage] = useState({visible:false, message:null})
  const [inputValue, setInputValue]= useState({curr_pass:"",new_pass:"", new_pass_conf:""});
  
  const onHandlePasswordUpdate = (e) =>{
     const name = e.target.name;
     const value = e.target.value;
     setInputValue({...inputValue, [name]:value});

  }
  const onHandleBlur = (e) => {
     console.log("Blur on the", e.target.name)
     if (e.target.name === "new_pass") {
      const password = e.target.value;
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        setErrorMessage({
          visible: true,
          message:
            "Password must be at least 8 characters long and include at least one letter, one number, and one special character.",
        });
      } else {
        setErrorMessage({ visible: false, message: null });
      }
    }
    if (e.target.name === "new_pass_conf") {
      if (inputValue.new_pass !== inputValue.new_pass_conf) {
        setErrorMessage({
          visible: true,
          message: "Passwords do not match.",
        });
      } else {
        setErrorMessage({ visible: false, message: null });
      }
    }
  };

  const onSubmit =async(e)=>{
    e.preventDefault();
    const result = await updatePassoword(inputValue);
    console.log("result of password update =>", result);
    if(result.success)
    {
      setIsPasswordUpdated(true);
    }
  }
  console.log("The Input VALUE =>", inputValue);
  if(isPasswordUpdated){
    return(<>
    <RedirectToLogin />
    </>)
  }
  return (
    <div className="modal-overlay">
      {isPasswordUpdated ? (
        <RedirectToLogin />
      ) : (
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>
            <X />
          </button>
          <h2>Update Password</h2>
          <form className="modal-form">
            <div className="input-group-vertical">
              <label>Current Password</label>
              <input
                name="curr_pass"
                type="password"
                value={inputValue.curr_pass}
                placeholder="Enter current password"
                onChange={(e) => onHandlePasswordUpdate(e)}
              />
            </div>
            <div className="input-group-vertical">
              <label>New Password</label>
              <input
                name="new_pass"
                type="password"
                placeholder="Min 8 characters"
                value={inputValue.new_pass}
                onChange={(e) => onHandlePasswordUpdate(e)}
                onBlur={(e) => onHandleBlur(e)}
              />
            </div>
            <div className="input-group-vertical">
              <label>Confirm New Password</label>
              <input
                name="new_pass_conf"
                type="password"
                placeholder="Repeat new password"
                value={inputValue.new_pass_conf}
                onChange={(e) => onHandlePasswordUpdate(e)}
                onBlur={(e) => onHandleBlur(e)}
              />
            </div>
            {errorMessage.visible && (
              <p className="error-message">{errorMessage.message}</p>
            )}
            <button
              onClick={onSubmit}
              type="submit"
              className="btn btn-fill w-full mt-4 !py-2.5"
              disabled={errorMessage.visible}
            >
              Update Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChangePasswordModal;
