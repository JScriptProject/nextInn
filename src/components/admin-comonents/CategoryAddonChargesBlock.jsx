import React from 'react'
import InfoContentBlock from './InfoContentBlock.jsx';

function CategoryAddonChargesBlock({isEditing, setUpdatedRooms, roomsObj, onClickEdit}) {

    const serviceChargeData = new Map(Object.entries(roomsObj.addonServicesCharges));
    console.log("Its rened");
    console.log("Service charge data:", serviceChargeData);

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
     {[...serviceChargeData].length > 0 && [...serviceChargeData].map(([service_name, service_charges])=>(<InfoContentBlock
          title={service_name}
          value={service_charges}
          isEditing={isEditing}
          setUpdatedRooms={setUpdatedRooms}
        />))}
      </div>

    </div>
  )
}

export default CategoryAddonChargesBlock