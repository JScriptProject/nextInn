import React, { useEffect, useState } from "react";
import InfoContentBlock from "@admin/components/InfoContentBlock.jsx";
import { updateRoomCategoryData } from "@api/roomsCategoryApi.js";
import { getChangedFields } from "@utils/getChangedFields.js";

function CategoryInfoBlock({
  setIsEditing,
  isEditing,
  roomsObj,
  setSuccessMessage,
}) {
  const [updatedRooms, setUpdatedRooms] = useState({});
  const [isInfoEditing, setIsInfoEditing] = useState(false);

  const roomsObjCategoryInfoData = {
    name: roomsObj.name,
    location: roomsObj.location,
    price: roomsObj.price,
    info: roomsObj.info,
    description: roomsObj.description,
  };
  //What next to do is, I have to compare the above created object with the updatedRoooms object data. if inside data entry has been changed then only perform the DB operation

  useEffect(() => {
    if (isInfoEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [isInfoEditing]);

  async function onClickEdit() {
    setIsInfoEditing((prev) => !prev);
    if (isInfoEditing === true) {
      //below mentioned fucntion to complare if there any changes happend in property name or not
      //check if value changed or not
      const changes = getChangedFields(roomsObjCategoryInfoData, updatedRooms);
      const _id = roomsObj._id;
      console.log("Before the operation:..");
  
      console.log("chnages =>", changes);
      if (Object.keys(changes).length > 0) {
        try {
          const result = await updateRoomCategoryData(_id, changes);
          console.log("DB operation result", result);
          setSuccessMessage(result.message);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 2000);
          
        } catch (error) {
          console.error("An error occured");
        }
      } 
      else {
        setSuccessMessage("No Changes made !! ");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
      }
    }
  }

  return (
    <div className="info-block">
      <div className="room-block-header">
        <h3 className="info-block-title">Room Info</h3>
        <button
          className={
            isInfoEditing
              ? "info-block-btn info-block-btn-edit"
              : "info-block-btn"
          }
          onClick={onClickEdit}
          disabled={isEditing === true && isInfoEditing === false}
        >
          {isInfoEditing ? "Save" : "Edit"}
        </button>
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Room Name"
          valueLable="name"
          value={roomsObj.name}
          isEditing={isInfoEditing}
          setUpdatedRooms={setUpdatedRooms}
        />
        <InfoContentBlock
          title="Location"
          valueLable="location"
          value={roomsObj.location}
          isEditing={isInfoEditing}
          setUpdatedRooms={setUpdatedRooms}
        />
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Price"
          valueLable="price"
          value={roomsObj.price}
          isEditing={isInfoEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
        <InfoContentBlock
          title="Info"
          valueLable="info"
          value={roomsObj.info}
          isEditing={isInfoEditing}
          setUpdatedRooms={setUpdatedRooms}
        />
      </div>
      <div className="info-content-row grid1-full">
        <InfoContentBlock
          title="Description"
          valueLable="description"
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
