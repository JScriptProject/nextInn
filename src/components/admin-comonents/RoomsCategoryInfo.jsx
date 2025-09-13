import React,{useState} from "react";
import InfoContentBlock from "./InfoContentBlock.jsx";
import CategoryInfoBlock from "./CategoryInfoBlock.jsx";
import CategoryCapacityBlock from "./CategoryCapacityBlock.jsx";
import CategoryAddonChargesBlock from "./CategoryAddonChargesBlock.jsx";
import CategoryAmenitiesBlock from "./CategoryAmenitiesBlock.jsx";

function RoomscategoryInfo({ roomsObj,setRooms }) {
  const [isEditing, setIsEditing] = useState(false);
 

  const onClickEdit = ()=>{
    setIsEditing(prev=> !prev);
    if(isEditing){
     
      const newRoomsData = {...roomsObj, ...updatedRooms};
      setRooms((prev)=> prev.map((room)=> room.id === roomsObj.id ? newRoomsData : room));
      setUpdatedRooms({});
    }
  }
  return (
    <div className="roomsCategoryInfo">
      <div className="info-block">
        <div className="info-content-row grid2-center">
          <InfoContentBlock title="ID" value={roomsObj.id} />
          <InfoContentBlock title="Category ID" value={roomsObj.categoryId} />
        </div>
      </div>
      <CategoryInfoBlock setIsEditing={setIsEditing} isEditing={isEditing} roomsObj={roomsObj} setRooms={setRooms} />
      <CategoryCapacityBlock setIsEditing={setIsEditing} isEditing={isEditing}  roomsObj={roomsObj} setRooms={setRooms} />
      <CategoryAddonChargesBlock setIsEditing={setIsEditing} isEditing={isEditing} roomsObj={roomsObj} setRooms={setRooms}  />
      <CategoryAmenitiesBlock setIsEditing={setIsEditing} isEditing={isEditing} roomsObj={roomsObj} setRooms={setRooms} />
    </div>
  );
}

export default RoomscategoryInfo;
