import React, { useState, useEffect, useRef } from "react";
import { createPortal } from 'react-dom';
import InfoContentBlock from "@admin/components/InfoContentBlock.jsx";
import CategoryInfoBlock from "@admin/components/CategoryInfoBlock.jsx";
import CategoryCapacityBlock from "@admin/components/CategoryCapacityBlock.jsx";
import CategoryAddonChargesBlock from "@admin/components/CategoryAddonChargesBlock.jsx";
import CategoryAmenitiesBlock from "@admin/components/CategoryAmenitiesBlock.jsx";


function RoomscategoryInfo({ roomsObj,setRooms  }) {
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

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
        setSuccessMessage={setSuccessMessage}
        
      />
      <CategoryCapacityBlock
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        roomsObj={roomsObj}
        setSuccessMessage={setSuccessMessage}
      />
      <CategoryAddonChargesBlock
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        roomsObj={roomsObj}
        setSuccessMessage={setSuccessMessage}
      />
      <CategoryAmenitiesBlock
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        roomsObj={roomsObj}
        setSuccessMessage={setSuccessMessage}
        setRooms={setRooms}
      />
      {successMessage !==null && createPortal(<p className="successModal">{successMessage}</p>, document.getElementById("portal"))}
    </div>
  );
}

export default RoomscategoryInfo;
