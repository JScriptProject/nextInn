import React from 'react'
import InfoChecklistBlock from './InfoChecklistBlock.jsx'

function CategoryAmenitiesBlock({isEditing, setUpdatedRooms, roomsObj, onClickEdit}) {

  return (
    <div className="info-block">
      <div className="room-block-header">
        <h3 className="info-block-title">Room Amentities</h3>
        <button
          className={
            isEditing ? "info-block-btn info-block-btn-edit" : "info-block-btn"
          }
          onClick={onClickEdit}
        >
          {isEditing ? "Save" : "Edit Amenities"}
        </button>
      </div>
       <div className="info-content-row grid2-start">
           {roomsObj.amenities.map((amenty)=>{
            return<InfoChecklistBlock 
           title={amenty.text}
           value={amenty.icon}
           isEditing={isEditing}
           setUpdatedRooms={setUpdatedRooms}
           key={amenty.text}
           />})}
       </div>
       <button>Add Amenities</button>
      </div>
  )
}

export default CategoryAmenitiesBlock