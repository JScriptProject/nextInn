import React from "react";
import { Users, Ruler, Link, BedDouble } from "lucide-react";
function RoomFeaturesIcon({ features }) {
  const iconMap = {
    users: Users,
    ruler: Ruler,
    link: Link,
    "bed-double": BedDouble,
  };
 
  return (
    <div className="room-features-icons">
      <ul>
        {features.map((feature) => {
          const Icon = iconMap[feature.icon];
         
          return (
            <li key={feature.icon}>
              <Icon className="feature-icon" />
              <span className="feature-text">{feature.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RoomFeaturesIcon;
