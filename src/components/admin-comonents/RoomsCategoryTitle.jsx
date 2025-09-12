import React from "react";

function RoomsCategoryTitle({ roomTitle, setSelectedCategory, selectedCategory }) {
  console.log(roomTitle);
  console.log(selectedCategory);
  console.log(roomTitle[1])
  console.log(roomTitle[0]===selectedCategory);
  
  return (
    <div className="roomsCategoryTitle">
      <ul>
        {roomTitle.length !== 0 &&
          roomTitle.map((room) => <li key={room} className={selectedCategory===room ? "room-active":""} onClick={()=>setSelectedCategory(room)}>{room}</li>)}
      </ul>
    </div>
  );
}

export default RoomsCategoryTitle;
