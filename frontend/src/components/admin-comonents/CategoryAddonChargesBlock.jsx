import React, { useEffect, useState } from "react";
import InfoContentBlock from "./InfoContentBlock.jsx";
import { getChangedFields } from "../../util/getChangedFields.js";
import { updateRoomCategoryData } from "../../api/roomsCategoryApi.js";

function CategoryAddonChargesBlock({
  setIsEditing,
  isEditing,
  roomsObj,
  setSuccessMessage,
}) {
  const [updatedRooms, setUpdatedRooms] = useState({});
  const [isAddonChargeEditing, setIsAddonChargeEditing] = useState(false);

  const serviceChargeData = new Map(
    Object.entries(roomsObj.addonServicesCharges)
  );

  const roomsObjCategoryAddonChargesData = structuredClone(
    roomsObj.roomCapacity
  );

  useEffect(() => {
    if (isAddonChargeEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [isAddonChargeEditing]);

  async function onClickEdit(e) {
    e.preventDefault();
    setIsAddonChargeEditing((prev) => !prev);
    if (isAddonChargeEditing === true) {
      const changes = getChangedFields(
        roomsObjCategoryAddonChargesData,
        updatedRooms
      );
      const _id = roomsObj._id;
      if (Object.keys(changes).length > 0) {
        try {
          const result = await updateRoomCategoryData(_id, {
            addonServicesCharges: {
              ...roomsObj.addonServicesCharges,
              ...changes,
            },
          });
          console.log("Result.message =>", result.message);
          setSuccessMessage(result.message);

          setTimeout(() => {
            setSuccessMessage(null);
          }, 2000);
        } catch (error) {
          console.error("An error occured ");
        }
      } else {
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
        <h3 className="info-block-title">Room Addon Charges</h3>
        <button
          type="button"
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
              valueLable={service_name}
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
