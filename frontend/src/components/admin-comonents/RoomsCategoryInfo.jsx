import React, { useState, useEffect, useRef } from "react";
import { saveToRoom } from "../../api/roomsapi.js";
import { deepEqual } from "../../util/arrayOperations.js";
import InfoContentBlock from "./InfoContentBlock.jsx";
import CategoryInfoBlock from "./CategoryInfoBlock.jsx";
import CategoryCapacityBlock from "./CategoryCapacityBlock.jsx";
import CategoryAddonChargesBlock from "./CategoryAddonChargesBlock.jsx";
import CategoryAmenitiesBlock from "./CategoryAmenitiesBlock.jsx";


function RoomscategoryInfo({ roomsObj, setRooms, rooms, roomCopy }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const saveTimer = useRef(null);

  //all console
  console.log("All console to check the data");
  console.log("roomsObj =>", roomsObj);
  console.log("rooms =>", rooms);
  console.log("roomCOpy =>", roomCopy);

  
  useEffect(() => {
    if (deepEqual(rooms, roomCopy)) return;
    const cancelledRef = {current: false};

    if(saveTimer.current) clearTimeout(saveTimer.current);
    
    saveTimer.current = setTimeout(() => {
      const doSave = async()=>{
        try {
          setIsSaving(true);
          const result =  await saveToRoom(rooms);
          if(!cancelledRef.current) console.log("saved", result);
        } catch (error) {
          console.error("Error saving rooms data:", error);
        } finally {
          if(!cancelledRef.current) setIsSaving(false);
        }
      };
      doSave();
    },500)

    return ()=>{
      clearTimeout(saveTimer.current);
      saveTimer.current = null;
      cancelledRef.current = true;
    }
  }, [roomCopy,rooms]);

  return (
    <div className="roomsCategoryInfo">
      <div className="info-block">
        <div className="info-content-row grid2-center">
          {/* <InfoContentBlock title="ID" value={roomsObj.id} /> */}
          <InfoContentBlock title="Category ID" value={roomsObj.categoryId} />
        </div>
      </div>
      <CategoryInfoBlock
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        roomsObj={roomsObj}
        setRooms={setRooms}
      />
      <CategoryCapacityBlock
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        roomsObj={roomsObj}
        setRooms={setRooms}
      />
      <CategoryAddonChargesBlock
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        roomsObj={roomsObj}
        setRooms={setRooms}
      />
      <CategoryAmenitiesBlock
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        roomsObj={roomsObj}
        setRooms={setRooms}
      />
    </div>
  );
}

export default RoomscategoryInfo;
