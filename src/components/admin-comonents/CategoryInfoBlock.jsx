import React from "react";
import InfoContentBlock from "./InfoContentBlock.jsx";

function CategoryInfoBlock({isEditing, setUpdatedRooms, roomsObj,onClickEdit  }) {
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
          title="Room Name"
          value={roomsObj.name}
          isEditing={isEditing}
          setUpdatedRooms={setUpdatedRooms}
        />
        <InfoContentBlock
          title="Location"
          value={roomsObj.location}
          isEditing={isEditing}
          setUpdatedRooms={setUpdatedRooms}
        />
      </div>
      <div className="info-content-row grid2-start">
        <InfoContentBlock
          title="Price"
          value={roomsObj.price}
          isEditing={isEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputType="number"
        />
        <InfoContentBlock
          title="Info"
          value={roomsObj.info}
          isEditing={isEditing}
          setUpdatedRooms={setUpdatedRooms}
        />
      </div>
      <div className="info-content-row grid1-full">
        <InfoContentBlock
          title="Description"
          value={roomsObj.description}
          extraClass="info-content-block-aligned-top"
          isEditing={isEditing}
          setUpdatedRooms={setUpdatedRooms}
          inputMode="textarea"
        />
      </div>
    </div>
  );
}

export default CategoryInfoBlock;
