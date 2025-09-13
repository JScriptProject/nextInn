import React,{useState, useEffect} from "react";
import InfoContentBlock from "./InfoContentBlock.jsx";

function CategoryCapacityBlock({
  isEditing,
  setIsEditing,
  roomsObj,
  setRooms
}) {

  const [updatedRooms, setUpdatedRooms] = useState({});
  const [isCapacityEditing, setCapacityEditing] = useState(false);

    useEffect(()=>{
      if(isCapacityEditing){
      setIsEditing(true);
      }
      else{
        setIsEditing(false);
      }
    },[isCapacityEditing])
    
  
    function onClickEdit(){
      setCapacityEditing(prev=> !prev);   
      if(isCapacityEditing){
         const newRoomsData = {...roomsObj, ...updatedRooms};
        setRooms((prev)=> prev.map((room)=> room.id === roomsObj.id ? newRoomsData : room));
        setUpdatedRooms({});
      } 
    }

  return (
    <div className="info-block">
      <div className="room-block-header">
        <h3 className="info-block-title">Room Info</h3>
        <button
          className={
            isCapacityEditing ? "info-block-btn info-block-btn-edit" : "info-block-btn"
          }
          onClick={onClickEdit}
          disabled={isEditing === true && isCapacityEditing === false}
        >
          {isCapacityEditing ? "Save" : "Edit"}
        </button>
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Adults"
          value={roomsObj.room_capacity.adults}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
        />
        <InfoContentBlock
          title="Children"
          value={roomsObj.room_capacity.children}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
        />
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Available Rooms"
          value={roomsObj.room_capacity.available_rooms}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
        <InfoContentBlock
          title="Bed each Room"
          value={roomsObj.room_capacity.bed}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Max Extra Adults"
          value={roomsObj.room_capacity.maxExtraAdults}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
        <InfoContentBlock
          title="Extra Adult Charge"
          value={roomsObj.room_capacity.extraAdultCharges}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Max Extra Children"
          value={roomsObj.room_capacity.maxExtraChildren}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
        <InfoContentBlock
          title="Extra Children Charge"
          value={roomsObj.room_capacity.extraChildCharges}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Max Extra Bed"
          value={roomsObj.room_capacity.maxExtraBed}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />

        <InfoContentBlock
          title="Extra Bed Charge"
          value={roomsObj.room_capacity.extraBedCharge}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
      </div>
    </div>
  );
}

export default CategoryCapacityBlock;
