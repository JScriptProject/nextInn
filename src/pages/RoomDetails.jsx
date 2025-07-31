import React from 'react'
import { useLocation } from 'react-router-dom';

function RoomDetails() {
  const location = useLocation();
  const room = location.state;
  console.log(room);
  return (
    <div className="room-details-banner">
      <h2></h2>
    </div>
  )
}

export default RoomDetails