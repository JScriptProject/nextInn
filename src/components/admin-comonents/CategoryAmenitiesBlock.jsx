import React, { useState, useEffect } from "react";
import AddNewAmenitiesBtn from "./AddNewAmenitiesBtn.jsx";
import InfoChecklistBlock from "./InfoChecklistBlock.jsx";
import {
  Wifi,
  ShowerHead,
  Plane,
  PanelTopOpen,
  ThermometerSnowflake,
  Headphones,
  Laptop,
  Dumbbell,
  Waves,
  Car,
  Utensils,
  Coffee,
  Snowflake,
  Tv,
  BedDouble,
  Baby,
  Key,
  Camera,
  PawPrint,
  CigaretteOff,
  Leaf,
} from "lucide-react";

function CategoryAmenitiesBlock({
  setIsEditing,
  isEditing,
  roomsObj,
  setRooms,
}) {
  const [addedItems, setAddedItems] = useState(
    roomsObj.amenities?.map((items) => items.text)
  );
  const [removedItems, setRemovedItems] = useState([]);
  const [isAmenitiesEditing, setIsAmenitiesEditing] = useState(false);

  const iconMap = {
    wifi: Wifi,
    "shower-head": ShowerHead,
    plane: Plane,
    "panel-top-open": PanelTopOpen,
    fridge: ThermometerSnowflake,
    headphones: Headphones,
    laptop: Laptop,
    dumbbell: Dumbbell,
    swimming: Waves,
    parking: Car,
    restaurant: Utensils,
    coffee: Coffee,
    ac: Snowflake,
    tv: Tv,
    bed: BedDouble,
    kids: Baby,
    "room-service": Key,
    security: Camera,
    "pet-friendly": PawPrint,
    "non-smoking": CigaretteOff,
    garden: Leaf,
  };

  const allAmenities = [
    { text: "Free Wifi", icon: "wifi" },
    { text: "Balcony", icon: "panel-top-open" },
    { text: "Refrigerator", icon: "fridge" },
    { text: "Work Desk", icon: "laptop" },
    { text: "Shower", icon: "shower-head" },
    { text: "Fitness Center", icon: "dumbbell" },
    { text: "24/7 Support", icon: "headphones" },
    { text: "Swimming Pool", icon: "swimming" },
    { text: "Airport Transport", icon: "plane" },
    { text: "Parking", icon: "parking" },
    { text: "Restaurant", icon: "restaurant" },
    { text: "Coffee/Tea Maker", icon: "coffee" },
    { text: "Air Conditioning", icon: "ac" },
    { text: "Flat-Screen TV", icon: "tv" },
    { text: "King/Queen Beds", icon: "bed" },
    { text: "Child Friendly", icon: "kids" },
    { text: "Room Service", icon: "room-service" },
    { text: "CCTV Security", icon: "security" },
    { text: "Pet Friendly", icon: "pet-friendly" },
    { text: "Non-Smoking Rooms", icon: "non-smoking" },
    { text: "Garden / Outdoor Area", icon: "garden" },
  ];

 
  useEffect(() => {
    setAddedItems(roomsObj.amenities?.map((items) => items.text));
  }, [roomsObj]);

  useEffect(() => {
    if (isAmenitiesEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [isAmenitiesEditing]);

  function onClickEdit() {
    
    setIsAmenitiesEditing((prev) => !prev);

    if (isAmenitiesEditing) {
      const filteredAmenities = allAmenities.filter((amenty) =>
        addedItems.includes(amenty.text)
      );

      const newRoomsData = { ...roomsObj, amenities: filteredAmenities };
      setRooms((prev) =>
        prev.map((room) => (room.id === roomsObj.id ? newRoomsData : room))
      );
    }
  }
  function onClickAddNewAmenities() {}
  return (
    <div className="info-block">
      <div className="room-block-header">
        <h3 className="info-block-title">Room Amentities</h3>
        <button
          className={
            isAmenitiesEditing
              ? "info-block-btn info-block-btn-edit"
              : "info-block-btn"
          }
          onClick={onClickEdit}
          disabled={isEditing === true && isAmenitiesEditing === false}
        >
          {isAmenitiesEditing ? "Save" : "Edit Amenities"}
        </button>
      </div>
      {addedItems.length > 0 ? (
        <div className="info-content-row grid2-start">
          {roomsObj.amenities.map((amenty) => {
            return (
              <InfoChecklistBlock
                text={amenty.text}
                icon={amenty.icon}
                isEditing={isAmenitiesEditing}
                setAddedItems={setAddedItems}
                setRemovedItems={setRemovedItems}
                removedItems={removedItems}
                addedItems={addedItems}
                key={amenty.text}
                iconMap={iconMap}
              />
            );
          })}
        </div>
      ) : (
        <p>No Amenities Added, Please Add Amenities</p>
      )}
      <AddNewAmenitiesBtn
      
        removedItems={removedItems}
        setRemovedItems={setRemovedItems}
        addedItems={addedItems}
        setAddedItems={setAddedItems}
        onClickAddNewAmenities={onClickAddNewAmenities}
        isAmenitiesEditing={isAmenitiesEditing}
        setIsEditing={setIsEditing}
        iconMap={iconMap}
        roomsObj={roomsObj}
        setRooms={setRooms}
        allAmenities={allAmenities}
      />
    </div>
  );
}

export default CategoryAmenitiesBlock;
