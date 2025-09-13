import React,{useEffect, useState} from "react";
import InfoContentBlock from "./InfoContentBlock.jsx";

function CategoryAddonChargesBlock({
  setIsEditing,
  isEditing,
  roomsObj,
  setRooms,
}) {
  const [updatedRooms, setUpdatedRooms] = useState({});
  const [isAddonChargeEditing, setIsAddonChargeEditing] = useState(false);

  const serviceChargeData = new Map(
    Object.entries(roomsObj.addonServicesCharges)
  );

  useEffect(() => {
    if (isAddonChargeEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [isAddonChargeEditing]);

  function onClickEdit() {
    setIsAddonChargeEditing((prev) => !prev);
    if (isAddonChargeEditing) {
      const newRoomsData = { ...roomsObj, ...updatedRooms };
      setRooms((prev) =>
        prev.map((room) => (room.id === roomsObj.id ? newRoomsData : room))
      );
      setUpdatedRooms({});
    }
  }

  return (
    <div className="info-block">
      <div className="room-block-header">
        <h3 className="info-block-title">Room Info</h3>
        <button
          className={
            isAddonChargeEditing
              ? "info-block-btn info-block-btn-edit"
              : "info-block-btn"
          }
          onClick={onClickEdit}
          disabled={isEditing === true && isAddonChargeEditing === false}
        >
          {isAddonChargeEditing ? "Save" : "Edit"}
        </button>
      </div>
      <div className="info-content-row grid2-start">
        {[...serviceChargeData].length > 0 &&
          [...serviceChargeData].map(([service_name, service_charges]) => (
            <InfoContentBlock
              title={service_name}
              value={service_charges}
              isEditing={isAddonChargeEditing}
              setUpdatedRooms={setUpdatedRooms}
              key={service_name}
            />
          ))}
      </div>
    </div>
  );
}

export default CategoryAddonChargesBlock;
