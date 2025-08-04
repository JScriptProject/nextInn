
import React,{useState} from 'react'
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function AvailabilityCalendar() {
    const [range, setRange] = useState([{startDate: new Date(),
        endDate:addDays(new Date(),1),
        key:"selection",
    }])
  return (
    <div className="avialability-calendar">
        <DateRange edittableDataInputs={true} 
        onChange={(item)=> setRange([item.selection])}
        ranges={range}
        moveRangeOnFirstSelection={false}
        direction="horizontal"
        months={2}
        />
        <div className="calendar-control">
            <button className='calendar-btn-apply btn'>Apply</button>
            <button className='calendar-btn-cancel btn'>Cancel</button>
        </div>
    </div>
  )
}

export default AvailabilityCalendar