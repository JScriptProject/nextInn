
import React, { useState, useEffect } from "react";
import { getChangedFields } from "@utils/getChangedFields.js";
import { updateRoomCategoryData } from "@api/roomsCategoryApi.js";
import {getAllRoomsCategory} from '@api/roomsCategoryApi.js';


function AddNewAmenitiesBtn({
  isEditing,
  setIsEditing,
  allAmenities,
  removedItems,
  setRemovedItems,
  addedItems,
  setAddedItems,
  iconMap,
  roomsObj,
  setSuccessMessage,
  setRooms,
}) {
  const [isAddingAmenities, setIsAddinAmenities] = useState(false);

  const roomsObjCategoryAmenitiesData = structuredClone(roomsObj.amenities);

  const onAddNewAmenities = async () => {
    setIsAddinAmenities((prev) => !prev);
    if (isAddingAmenities === true) {
      const filteredAmenities = allAmenities.filter((amenty) =>
        addedItems.includes(amenty.text)
      );

      const changes = getChangedFields(
        roomsObjCategoryAmenitiesData,
        filteredAmenities
      );
      const _id = roomsObj._id;

      if (changes) {
        try {
          const result = await updateRoomCategoryData(_id, {
            amenities: changes,
          });
          console.log("DB operation result", result);
          setSuccessMessage(result.message);
          const roomsData = await getAllRoomsCategory();
          setRooms(roomsData);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 2000);
        } catch (error) {
          console.error("An Error occured", error);
        }
      } else {
        setSuccessMessage("No Changes made !! ");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
      }
    }
  };

  function onHandleCheck(e, text) {
    if (e.target.checked === true) {
      setAddedItems((prev) => [...prev, text]);
      if (removedItems.length > 0) {
        setRemovedItems((prev) => prev.filter((item) => item !== text));
      }
    } else {
      setRemovedItems((prev) => [...prev, text]);
      if (addedItems.length > 0) {
        setAddedItems((prev) => prev.filter((item) => item !== text));
      }
    }
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
      <button
        className={
          isAddingAmenities
            ? "category-add-amenities-btn category-add-amenities-btn-edit"
            : "category-add-amenities-btn"
        }
        disabled={isEditing === true && isAddingAmenities === false}
        onClick={onAddNewAmenities}
      >
        {isAddingAmenities ? "Save New Amenities" : "Add New Amenities"}
      </button>

      {isAddingAmenities && (
        <div className="new-amenities-panel">
          <ul className="new-amenities-list">
            {allAmenities.map((amenitiesGroup, index) => {
              const Icon = iconMap[amenitiesGroup.icon];

              return (
                <li key={index} className="new-amenities-list-item">
                  <input
                    type="checkbox"
                    checked={addedItems.includes(amenitiesGroup.text)}
                    onChange={(e) => {
                      onHandleCheck(e, amenitiesGroup.text);
                    }}
                  />
                  <Icon className="all-amenities-icon" />
                  <span className="all-amenities-text">
                    {amenitiesGroup.text}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default AddNewAmenitiesBtn;
