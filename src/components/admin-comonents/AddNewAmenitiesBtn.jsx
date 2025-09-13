import React, { useState, useEffect } from 'react'

function AddNewAmenitiesBtn({isEditing, isAmenitiesEditing, setIsEditing, iconMap}) {
    const [isAddingAmenities, setIsAddinAmenities] = useState(false);
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
    const onAddNewAmenities =()=>{
        setIsAddinAmenities(prev=> !prev);
    }

 useEffect(() => {
    if (isAddingAmenities) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [isAddingAmenities]);

  return (
    <>
    <button className={isAddingAmenities?'category-add-amenities-btn category-add-amenities-btn-edit':'category-add-amenities-btn'} disabled={isEditing === true && isAddingAmenities === false} onClick={onAddNewAmenities}>{isAddingAmenities ? "Save New Amenities":"Add New Amenities"}</button>

    {isAddingAmenities && <div className='new-amenities-panel'>
         <ul>
         {allAmenities.map((amenitiesGroup, index)=>{
          const Icon = iconMap[amenitiesGroup.icon];

          return (<li key={index}>
            <Icon className="all-amenities-icon" />
            <span>{amenitiesGroup.text}</span>
          </li>)

         })}
         </ul>
    </div>}
  </>
  )
}

export default AddNewAmenitiesBtn