import React from "react";
import InfoContentBlock from "./InfoContentBlock.jsx";

function CategoryCapacityBlock({
  isEditing,
  setUpdatedRooms,
  roomsObj,
  onClickEdit,
}) {
  return (
    <div className="info-block">
      <div className="room-block-header">
        <h3 className="info-block-title">Room Info</h3>
        <button
          className={
            isEditing ? "info-block-btn info-block-btn-edit" : "info-block-btn"
          }
          onClick={onClickEdit}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Adults"
          value={roomsObj.room_capacity.adults}
          isEditing={isEditing}
          setUpdatedRooms={setUpdatedRooms}
        />
        <InfoContentBlock
          title="Children"
          value={roomsObj.room_capacity.children}
          isEditing={isEditing}
          setUpdatedRooms={setUpdatedRooms}
        />
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Available Rooms"
          value={roomsObj.room_capacity.available_rooms}
          isEditing={isEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
        <InfoContentBlock
          title="Bed each Room"
          value={roomsObj.room_capacity.bed}
          isEditing={isEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Max Extra Adults"
          value={roomsObj.room_capacity.maxExtraAdults}
          isEditing={isEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
        <InfoContentBlock
          title="Extra Adult Charge"
          value={roomsObj.room_capacity.extraAdultCharges}
          isEditing={isEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Max Extra Children"
          value={roomsObj.room_capacity.maxExtraChildren}
          isEditing={isEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
        <InfoContentBlock
          title="Extra Children Charge"
          value={roomsObj.room_capacity.extraChildCharges}
          isEditing={isEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Max Extra Bed"
          value={roomsObj.room_capacity.maxExtraBed}
          isEditing={isEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />

        <InfoContentBlock
          title="Extra Bed Charge"
          value={roomsObj.room_capacity.extraBedCharge}
          isEditing={isEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
      </div>
    </div>
  );
}

export default CategoryCapacityBlock;
