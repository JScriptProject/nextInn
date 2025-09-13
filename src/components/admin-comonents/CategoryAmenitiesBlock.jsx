import React,{useState, useEffect} from 'react'
import AddNewAmenitiesBtn from './AddNewAmenitiesBtn.jsx';
import InfoChecklistBlock from './InfoChecklistBlock.jsx'
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

function CategoryAmenitiesBlock({setIsEditing, isEditing, roomsObj}) {
const [addedItems, setAddedItems] = useState([]);
const [removedItems, setRemovedItems] = useState([]);
const [updatedRooms, setUpdatedRooms] = useState({});
const [isAmenitiesEditing, setIsAmenitiesEditing] = useState(false);
console.log("Added Items:", addedItems);
console.log("Removed Items:", removedItems);

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
        <h3 className="info-block-title">Room Amentities</h3>
        <button
          className={
            isAmenitiesEditing ? "info-block-btn info-block-btn-edit" : "info-block-btn"
          }
          onClick={onClickEdit}
          disabled={isEditing === true && isAmenitiesEditing === false}
        >
          {isAmenitiesEditing ? "Save" : "Edit Amenities"}
        </button>
      </div>
       <div className="info-content-row grid2-start">
           {roomsObj.amenities.map((amenty)=>{
            return<InfoChecklistBlock 
           text={amenty.text}
           icon={amenty.icon}
           isEditing={isAmenitiesEditing}
           setAddedItems={setAddedItems}
           setRemovedItems={setRemovedItems}
           removedItems={removedItems}
           addedItems={addedItems}
           key={amenty.text}
           iconMap={iconMap}
           />})}
       </div>
       <AddNewAmenitiesBtn isAmenitiesEditing={isAmenitiesEditing} isEditing={isEditing} setIsEditing= {setIsEditing} iconMap={iconMap} />
       
      </div>
  )
}

export default CategoryAmenitiesBlock