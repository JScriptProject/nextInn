import React, { useState, useEffect } from "react";
import InfoContentBlock from "./InfoContentBlock.jsx";
import { getChangedFields } from "../../util/getChangedFields.js";
import { updateRoomCategoryData } from "../../api/roomsCategoryApi.js";

function CategoryCapacityBlock({
  isEditing,
  setIsEditing,
  roomsObj,
  setSuccessMessage,
}) {
  const [updatedRooms, setUpdatedRooms] = useState({});
  const [isCapacityEditing, setCapacityEditing] = useState(false);

  const roomsObjCategoryCapacityData = structuredClone(roomsObj.roomCapacity);
  useEffect(() => {
    if (isCapacityEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [isCapacityEditing]);

  async function onClickEdit() {
    setCapacityEditing((prev) => !prev);
    if (isCapacityEditing === true) {
      const changes = getChangedFields(
        roomsObjCategoryCapacityData,
        updatedRooms
      );
      const _id = roomsObj._id;
    
      if(Object.keys(changes).length > 0)
      {
 try {
        const result = await updateRoomCategoryData(_id, {
          roomCapacity: { ...roomsObj.roomCapacity, ...changes },
        });
        console.log("DB operation result", result);
        setSuccessMessage(result.message);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
      } catch (error) {
        console.error("An error occured,", error);
      }
      }
      else{
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
        <h3 className="info-block-title">Room Capacity Info</h3>
        <button
          className={
            isCapacityEditing
              ? "info-block-btn info-block-btn-edit"
              : "info-block-btn"
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
          valueLable="adults"
          value={roomsObj?.roomCapacity?.adults}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
        />
        <InfoContentBlock
          title="Children"
          valueLable="children"
          value={roomsObj?.roomCapacity?.children}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
        />
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Available Rooms"
          valueLable="available_rooms"
          value={roomsObj?.roomCapacity?.available_rooms}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
        <InfoContentBlock
          title="Bed each Room"
          valueLable="bed"
          value={roomsObj?.roomCapacity?.bed}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Max Extra Adults"
          valueLable="maxExtraAdults"
          value={roomsObj?.roomCapacity?.maxExtraAdults}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
        <InfoContentBlock
          title="Extra Adult Charge"
          valueLable="extraAdultCharges"
          value={roomsObj?.roomCapacity?.extraAdultCharges}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Max Extra Children"
          valueLable="maxExtraChildren"
          value={roomsObj?.roomCapacity?.maxExtraChildren}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
        <InfoContentBlock
          title="Extra Children Charge"
          valueLable="extraChildCharges"
          value={roomsObj?.roomCapacity?.extraChildCharges}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Max Extra Bed"
          valueLable="maxExtraBed"
          value={roomsObj?.roomCapacity?.maxExtraBed}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />

        <InfoContentBlock
          title="Extra Bed Charge"
          valueLable="extraBedCharge"
          value={roomsObj?.roomCapacity?.extraBedCharge}
          isEditing={isCapacityEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
      </div>
    </div>
  );
}

export default CategoryCapacityBlock;
