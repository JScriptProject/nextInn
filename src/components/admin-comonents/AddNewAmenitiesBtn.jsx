import { add } from 'date-fns';
import React, { useState, useEffect } from 'react'

function AddNewAmenitiesBtn({isEditing,setIsEditing, allAmenities, removedItems, setRemovedItems, addedItems, setAddedItems, iconMap, roomsObj , setRooms}) {
    const [isAddingAmenities, setIsAddinAmenities] = useState(false);
  
    const onAddNewAmenities =()=>{
        setIsAddinAmenities(prev=> !prev);
        
        const filteredAmenities =  allAmenities.filter((amenty)=> addedItems.includes(amenty.text));
        const newRoomsObj = {...roomsObj, amenities: filteredAmenities};
        setRooms((prev) => prev.map((room)=> (room.id === roomsObj.id ? newRoomsObj :room)));
    }

    function onHandleCheck(e, text){
      if(e.target.checked === true){
        setAddedItems((prev)=>[...prev, text]);
        if(removedItems.length > 0)
        {
          setRemovedItems((prev)=> prev.filter((item) => item !== text));
        }
      }
      else{
        setRemovedItems((prev)=>[...prev, text])
        if(addedItems.length > 0)
        {
        setAddedItems((prev)=> prev.filter((item) => item !== text));   
        }
      }
    }

   
 useEffect(() => {
    if (isAddingAmenities) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [isAddingAmenities]);

  return (
    <>
    <button className={isAddingAmenities?'category-add-amenities-btn category-add-amenities-btn-edit':'category-add-amenities-btn'} disabled={isEditing === true && isAddingAmenities === false} onClick={onAddNewAmenities}>{isAddingAmenities ? "Save New Amenities":"Add New Amenities"}</button>

    {isAddingAmenities && <div className='new-amenities-panel'>
         <ul className='new-amenities-list'>
         {allAmenities.map((amenitiesGroup, index)=>{
          const Icon = iconMap[amenitiesGroup.icon];

          return (<li key={index} className='new-amenities-list-item'>
            <input type="checkbox" checked={addedItems.includes(amenitiesGroup.text)} onChange={(e)=>{onHandleCheck(e, amenitiesGroup.text)}}/>
            <Icon className="all-amenities-icon" />
            <span className='all-amenities-text'>{amenitiesGroup.text}</span>
          </li>)

         })}
         </ul>
    </div>}
  </>
  )
}

export default AddNewAmenitiesBtn