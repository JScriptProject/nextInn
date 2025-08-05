import { DatabaseBackup } from "lucide-react";
import React, { useRef, useState } from "react";

function CheckInOutInput({ text }) {
  const [date, setDate] = useState("");
  const calendarRef = useRef();
  console.log(calendarRef);

  return (
    <div className="input-subgroup">
      <label htmlFor={text}>{text}</label>
      <div
        className="input-calendar-wrapper"
        onClick={() => calendarRef.current.showPicker()}
      >
        <input
          type="date"
          value={date}
          ref={calendarRef}
          name="checkin"
          id="checkin"
          placeholder="dd-mm-yyyy"
          onChange={(e) => setDate(e.target.value)}
        />
        <span className="calendar-icon">📅</span>
      </div>
    </div>
  );
}

export default CheckInOutInput;
