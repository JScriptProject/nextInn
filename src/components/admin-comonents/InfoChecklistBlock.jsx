import React,{useEffect, useState} from 'react'

function InfoChecklistBlock({title, value, extraClass,isEditing, setUpdatedRooms,inputType, inputMode}) {
      
    //   const handleInputChange = (e) =>{
    //       setInputValue(e.target.value);
    //       setUpdatedRooms((prev)=>({...prev, [title]: e.target.value}));
    //   }
  
      //whenevr props value change after selecting diff category, its not automatically assigning hence useEffect.
    //   useEffect(()=>{
    //     setInputValue(value);
    //   },[value])
  
    return (
      <div className={extraClass ? `${extraClass} info-content-block` : "info-content-block"}>
         <label>{title}:</label>
        {isEditing ? ( inputMode === "textarea" ? <textarea value = {value} /> : <input type= {inputType ? inputType : "text"} value = {inputValue} onChange={handleInputChange}  />) : <p>{value}</p>}
      </div>
    );
}

export default InfoChecklistBlock