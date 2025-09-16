import React,{useEffect, useState} from "react";

function InfoContentBlock({title,valueLable, value, extraClass,isEditing, setUpdatedRooms,inputType, inputMode}) {
    const [inputValue, setInputValue] = useState(value);
    
    const handleInputChange = (e) =>{
      e.preventDefault();
        setInputValue(e.target.value);
        setUpdatedRooms((prev)=>({...prev, [valueLable]: e.target.value}));
    }
    
    //whenevr props value change after selecting diff category, its not automatically assigning hence useEffect.
    useEffect(()=>{
      setInputValue(value);
    },[value])

  return (
    <div className={extraClass ? `${extraClass} info-content-block` : "info-content-block"}>
       <label>{title}:</label>
      {isEditing ? ( inputMode === "textarea" ? <textarea value = {inputValue} onChange={handleInputChange} /> : <input type= {inputType ? inputType : "text"} value = {inputValue} onChange={handleInputChange}  />) : <p>{inputValue}</p>}
    </div>
  );
}

export default InfoContentBlock;
