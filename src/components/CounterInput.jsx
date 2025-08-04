import React from 'react'

function CounterInput({text}) {
  return (
     <div className="input-subgroup">
        <label htmlFor= {text}>{text}</label>
        <div className="input-container-counter">
            <button>+</button>
            <input type="number" name= {text} id= {text} />
            <button>-</button>
        </div>
     </div>
  )
}

export default CounterInput