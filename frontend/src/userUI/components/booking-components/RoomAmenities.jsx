import React from "react";
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

function RoomAmenities({ amenities }) {
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
  return (
    <div className="room-amenities-container">
      <ul>
        {amenities.map((amenitiesGroup, index) => {
          const Icon = iconMap[amenitiesGroup.icon];
          return(<li key={index}>
            <Icon className="amenity-icon" />{" "}
            <span className="amenity-text">{amenitiesGroup.text}</span>
          </li>)
        })}
      </ul>
    </div>
  );
}

export default RoomAmenities;
