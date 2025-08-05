import React, { useState } from 'react'

function CounterInput({text}) {
   const [inputValue, setInputValue] = useState(1)

   function handleIncreament(e){
      e.preventDefault();
      setInputValue(inputValue+1);
   }
   function handleDecreament(e){
      e.preventDefault();
      if(inputValue>0) setInputValue(inputValue-1)
   }
  return (
     <div className="input-subgroup">
        <label htmlFor= {text}>{text}</label>
        <div className="input-container-counter">
            <button onClick={handleIncreament}>+</button>
            <input type="text" size="3" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} name= {text} id= {text} />
            <button onClick={handleDecreament}>-</button>
        </div>
        {text ==="Rooms" && <span className="available-rooms-span">Available Rooms : 15</span>}
     </div>
  )
}

export default CounterInput