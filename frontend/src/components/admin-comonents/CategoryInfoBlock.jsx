import React, { useEffect,useState } from "react";
import InfoContentBlock from "./InfoContentBlock.jsx";
import { is } from "date-fns/locale";

function CategoryInfoBlock({ setIsEditing, isEditing, roomsObj,setRooms  }) {
   const [updatedRooms, setUpdatedRooms] = useState({});
  const [isInfoEditing, setIsInfoEditing] = useState(false);

  useEffect(()=>{
    if(isInfoEditing){
    setIsEditing(true);
    }
    else{
      setIsEditing(false);
    }
  },[isInfoEditing])
  

  function onClickEdit(){
    setIsInfoEditing(prev=> !prev);   
    if(isInfoEditing){
      console.log("Updated Rooms:", updatedRooms);
       const newRoomsData = {...roomsObj, ...updatedRooms};
       console.log(newRoomsData);
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
            isInfoEditing ? "info-block-btn info-block-btn-edit" : "info-block-btn"
          }
          onClick={onClickEdit}
          disabled={isEditing === true && isInfoEditing === false}
        >
          {(isInfoEditing) ? "Save" : "Edit"}
        </button>
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Room Name"
          valueLable = "name"
          value={roomsObj.name}
          isEditing={isInfoEditing}
          setUpdatedRooms={setUpdatedRooms}
        />
        <InfoContentBlock
          title="Location"
          valueLable = "location"
          value={roomsObj.location}
          isEditing={isInfoEditing}
          setUpdatedRooms={setUpdatedRooms}
        />
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Price"
          valueLable = "price"
          value={roomsObj.price}
          isEditing={isInfoEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
        <InfoContentBlock
          title="Info"
          valueLable = "info"
          value={roomsObj.info}
          isEditing={isInfoEditing}
          setUpdatedRooms={setUpdatedRooms}
        />
      </div>
      <div className="info-content-row grid1-full">
        <InfoContentBlock
          title="Description"
          valueLable = "description"
          value={roomsObj.description}
          extraClass="info-content-block-aligned-top"
          isEditing={isInfoEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputMode="textarea"
        />
      </div>
    </div>
  );
}

export default CategoryInfoBlock;
