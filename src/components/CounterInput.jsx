import React, { useState, useContext, useEffect } from "react";
import { BookingContext } from "../assets/context/BookingContext";

function CounterInput({
  text,
  availableRooms,
  maxCount,
  maxExtraCount,
  extraCharge,
  name,
  setFormModal,
}) {
  // states declairation
  const { bookingData, setBookingData } = useContext(BookingContext);
  const [inputValue, setInputValue] = useState(bookingData[name]);

  

  //variable declairations
  const totalCount = maxCount + maxExtraCount;

  const resetModal=()=>{
   setTimeout(()=>{
        setFormModal({isModalOpen:false, message:"", isError:false});
      }, 3000);
  }

  useEffect(()=>{
  setBookingData((prevData)=>({...prevData, [name]:inputValue}));
  },[inputValue]);
  console.log(bookingData);
  //handle Increament function
  function handleIncreament(e) {
    e.preventDefault();
    console.log("I am pressed");
    console.log("max count", maxCount);
    console.log("max exatra count", maxExtraCount);
    console.log("total count", totalCount);

    const nextValue = inputValue + 1;
    if (nextValue > totalCount) {
      const errorMessage = `Maximum limit of ${text} reached`;
      setFormModal({ isModalOpen: true, message: errorMessage, isError: true });
      resetModal();
      return;
    }
    if (nextValue <= maxCount) {
      setInputValue(inputValue + 1);
    }
    if (nextValue > maxCount && nextValue <= totalCount) {
      const highLightMessage = `Added Extra ${text}. Price per ${text} = ₹ ${extraCharge}.`;
      setFormModal({
        isModalOpen: true,
        message: highLightMessage,
        isError: false,
      });
      resetModal();
      setInputValue(inputValue + 1);
    }

    //add available rooms

    if(nextValue <= availableRooms)
    {
      setInputValue(inputValue + 1);
    }

    if(nextValue > availableRooms)
    {
      setFormModal({isModalOpen:true, message:"Maximum rooms limit reached.", isError:false});
      resetModal();
      return;
    }
  }

  //handle decreament function
  function handleDecreament(e) {
    e.preventDefault();

    if(name ==="adults" || name === "rooms")
    {
      if(inputValue>1)
      {
        setInputValue(inputValue - 1);
      }
      else{
         setFormModal({isModalOpen:true, message:`${text} cannot be less than 1.`, isError:true});
         resetModal();
         return;
      }
    }
    else{
       if(inputValue>0)
      {
        setInputValue(inputValue - 1);
      }
      else{
         setFormModal({isModalOpen:true, message:`${text} cannot be less than 0.`, isError:true});
         resetModal();
         return;
      }
    }
 
   }

  return (
    <div className="input-subgroup">
      <label htmlFor={text}>{text}</label>
      <div className="input-container-counter">
        <button onClick={handleIncreament}>+</button>
        <input
          type="text"
          size="3"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          name={name}
          id={name}
            
        />
        <button onClick={handleDecreament}>-</button>
      </div>
      {text === "Rooms" && (
        <span className="available-rooms-span">
          Available Rooms : {availableRooms}
        </span>
      )}
    </div>
  );
}

export default CounterInput;
