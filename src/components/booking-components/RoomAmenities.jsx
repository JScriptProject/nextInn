import React from 'react'
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
} from "lucide-react";

function RoomAmenities({amenities}) {
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
};
  return (
    <div className="room-amenities-container">
        {amenities.map((amenitiesGroup, index)=> {
            return(<ul className="room-amenities-group" key={index}>
                {amenitiesGroup.map((amenity) =>{ 
                    const Icon = iconMap[amenity.icon];
                    return(<li key={amenity.icon}><Icon className="amenity-icon" /> <span className="amenity-text">{amenity.text}</span></li>)}
                   )}
        </ul>)
        }) }
        
    </div>
  )
}

export default RoomAmenities