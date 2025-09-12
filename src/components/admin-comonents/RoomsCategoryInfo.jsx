import React,{useState} from "react";
import InfoContentBlock from "./InfoContentBlock.jsx";
import CategoryInfoBlock from "./CategoryInfoBlock.jsx";


function RoomscategoryInfo({ roomsObj,setRooms }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedRooms, setUpdatedRooms] = useState({});

  const onClickEdit = ()=>{
    setIsEditing(prev=> !prev);
    if(isEditing){
      console.log("data saved", updatedRooms);
      const newRoomsData = {...roomsObj, ...updatedRooms};
      console.log(newRoomsData)
      setRooms((prev)=> prev.map((room)=> room.id === roomsObj.id ? newRoomsData : room));
      setUpdatedRooms({});
    }
  }

  console.log(roomsObj);
  console.log("Updated Data: ", updatedRooms);
  return (
    <div className="roomsCategoryInfo">
      <div className="info-block">
        <div className="info-content-row grid2-center">
          <InfoContentBlock title="ID" value={roomsObj.id} />
          <InfoContentBlock title="Category ID" value={roomsObj.categoryId} />
        </div>
      </div>
      <CategoryInfoBlock isEditing={isEditing} onClickEdit={onClickEdit} setUpdatedRooms={setUpdatedRooms} roomsObj={roomsObj} />
      
    </div>
  );
}

export default RoomscategoryInfo;
