import React, { useEffect, useState } from "react";

function InfoChecklistBlock({
  text,
  icon,
  isEditing,
  setAddedItems,
  setRemovedItems,
  removedItems,
  addedItems,
  iconMap
}) {
 
  const Icon = iconMap[icon];

  const handleCheckboxChange = (e, text) => {
    console.log(e.target.checked);
    console.log(text);
    if (e.target.checked === true) {
      setAddedItems((prev) => [...prev, text]);
      if (removedItems.length > 0) {
        setRemovedItems((prev) => prev.filter((item) => item !== text));
      }
    }
    else{
      setRemovedItems((prev)=>[...prev, text]);
      if(addedItems.length >0){
        setAddedItems((prev)=> prev.filter((item)=> item !== text));
      }
    }
  };
  
  return (
    <div className="info-checklist-block">
      <input
        type="checkbox"
        disabled={!isEditing}
        onChange={(e) => handleCheckboxChange(e, text)}
      />
      <label htmlFor="checkbox">
       <Icon className="checkedLit-icon" />{" "}
        <span className="checkedList-text">{text}</span>
      </label>
    </div>
  );
}

export default InfoChecklistBlock;
