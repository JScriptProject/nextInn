import React, {useState } from "react";
import RoomsCategoryTitle from "@admin/components/RoomsCategoryTitle.jsx";
import RoomsCategoryInfo from "@admin/components/RoomsCategoryInfo.jsx";

function CategoryManagement({ rooms, setRooms }) {
 
  const [selectedCategory, setSelectedCategory] = useState(
    "Premium Deluxe Room"
  );
  const [localErrors, setLocalErrors] = useState(null);
  const roomsObj = rooms.find((room) => room.name === selectedCategory);
  

  return (
    <div>
      <h3 className="page-internal-title">Rooms Category management</h3>
      {rooms.length !== 0 ? (
        <div className="roomsCategoryBlock">
          <RoomsCategoryTitle
            roomTitle={rooms.map((room) => {
              return room.name;
            })}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          <RoomsCategoryInfo roomsObj={roomsObj} setRooms={setRooms} />
        </div>
      ) : localErrors === null ? (
        <p>Data is loading....</p>
      ) : (
        <p>Error fetching data from backend server</p>
      )}
    </div>
  );
}

export default CategoryManagement;
