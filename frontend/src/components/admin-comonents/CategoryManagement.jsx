import React, { useEffect, useState } from "react";
import { getAllRoomsCategory } from "../../api/roomsCategoryApi.js";
import RoomsCategoryTitle from "./RoomsCategoryTitle.jsx";
import RoomsCategoryInfo from "./RoomsCategoryInfo.jsx";

function CategoryManagement({ setErrors, errors }) {
  const [rooms, setRooms] = useState([]);
  const [roomCopy, setRoomCopy] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    "Premium Deluxe Room"
  );
  const [localErrors, setLocalErrors] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        
        const roomsData = await getAllRoomsCategory();
       
        setRoomCopy(roomsData);
        setRooms(roomsData);
      } catch (error) {
        console.error("failed to fetch rooms:", error);
        setErrors(error.message);
        setLocalErrors(error.message);
      }
    })();
  }, []);


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
          <RoomsCategoryInfo
            roomsObj={rooms.find((room) => room.name === selectedCategory)}
            setRooms={setRooms}
            rooms={rooms}
            roomCopy={roomCopy}
          />
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
